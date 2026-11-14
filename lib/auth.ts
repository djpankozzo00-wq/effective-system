import { SignJWT, jwtVerify } from "jose";

function getKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error("JWT_SECRET precisa ter pelo menos 32 caracteres.");
  return new TextEncoder().encode(secret);
}

export async function signAdmin(adminId: string) {
  return new SignJWT({ sub: adminId, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getKey());
}

export async function readAdmin(token?: string) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getKey());
    return typeof payload.sub === "string" && payload.role === "admin" ? payload.sub : null;
  } catch {
    return null;
  }
}