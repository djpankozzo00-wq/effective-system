import { prisma } from "@/lib/db";
export default async function SettingsPage(){const rows=await prisma.setting.findMany({orderBy:{key:"asc"}});return <><h1>Configurações</h1><div className="stack">{rows.map(s=><div className="card" key={s.key}><b>{s.key}</b><p className="muted small">{s.value}</p></div>)}{!rows.length&&<div className="card muted">Nenhuma configuração cadastrada.</div>}</div></>}
