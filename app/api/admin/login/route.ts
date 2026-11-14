import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { scryptSync, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/db";
import { signAdmin } from "@/lib/auth";

const schema=z.object({username:z.string().min(1).max(100),password:z.string().min(1).max(200)});
function verifyPassword(password:string, stored:string){const [salt,hash]=stored.split(":");if(!salt||!hash)return false;const actual=scryptSync(password,salt,64);const expected=Buffer.from(hash,"hex");return expected.length===actual.length&&timingSafeEqual(actual,expected);}
export async function POST(req:NextRequest){try{const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Dados inválidos."},{status:400});const admin=await prisma.admin.findUnique({where:{username:parsed.data.username}});if(!admin||!verifyPassword(parsed.data.password,admin.passHash))return NextResponse.json({error:"Usuário ou senha incorretos."},{status:401});const token=await signAdmin(admin.id);const res=NextResponse.json({ok:true});res.cookies.set("admin_sess",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:8*60*60});return res;}catch{return NextResponse.json({error:"Não foi possível entrar. Verifique a configuração do servidor."},{status:500});}}
