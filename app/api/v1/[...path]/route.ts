import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"helix-clone",version:"v1",message:"API inicializada"});}
export async function POST(){return NextResponse.json({error:"Endpoint ainda não implementado."},{status:501});}
