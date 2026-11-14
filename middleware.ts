import { NextRequest, NextResponse } from "next/server";
import { readAdmin } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/api/webhooks/")) return NextResponse.next();

  const admin = await readAdmin(req.cookies.get("admin_sess")?.value);
  if (!admin) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };