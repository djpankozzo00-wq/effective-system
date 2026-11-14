import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";

export async function POST(req:NextRequest,{params}:{params:Promise<{secret:string}>}){
  const {secret}=await params;const expected=process.env.SYNCPAY_WEBHOOK_SECRET??"";
  const a=Buffer.from(secret);const b=Buffer.from(expected);
  if(!expected||a.length!==b.length||!timingSafeEqual(a,b))return NextResponse.json({ok:false},{status:401});
  const body=await req.json().catch(()=>null);const event=body?.event??body?.type;const ref=body?.externalreference??body?.externalReference;
  if(event!=="CashIn"||!ref)return NextResponse.json({ok:true,ignored:true});
  const deposit=await prisma.deposit.findUnique({where:{identifier:String(ref)}});
  if(!deposit||deposit.status==="paid")return NextResponse.json({ok:true,dup:true});
  const paidCts=Math.round(Number(body.amount??0)*100);
  if(!Number.isFinite(paidCts)||paidCts<deposit.amountCts)return NextResponse.json({ok:true,mismatch:true});
  const result=await prisma.$transaction(async tx=>{
    const changed=await tx.deposit.updateMany({where:{id:deposit.id,status:"pending"},data:{status:"paid",paidAt:new Date()}});
    if(changed.count!==1)return false;
    await tx.user.update({where:{id:deposit.userId},data:{balanceCts:{increment:paidCts}}});
    await tx.walletMovement.create({data:{userId:deposit.userId,type:"credit",amountCts:paidCts,note:`PIX ${ref}`}});
    return true;
  });
  return NextResponse.json({ok:true,credited:result});
}
