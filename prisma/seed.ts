import { PrismaClient } from "@prisma/client";
import { randomBytes,scryptSync } from "node:crypto";
const prisma=new PrismaClient();
async function main(){const username=process.env.ADMIN_USERNAME;const password=process.env.ADMIN_PASSWORD;if(!username||!password||password.length<12)throw new Error("Defina ADMIN_USERNAME e ADMIN_PASSWORD (mínimo 12 caracteres).");const salt=randomBytes(16).toString("hex");const passHash=`${salt}:${scryptSync(password,salt,64).toString("hex")}`;await prisma.admin.upsert({where:{username},update:{passHash},create:{username,passHash,name:"Administrador"}});console.log("Administrador configurado.");}
main().finally(()=>prisma.$disconnect());