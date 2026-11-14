import { NextResponse } from "next/server";
export async function GET(){const res=NextResponse.redirect(new URL("/admin",process.env.APP_URL??"http://localhost:3000"));res.cookies.set("admin_sess","",{httpOnly:true,path:"/",maxAge:0});return res;}
