import Link from "next/link";
export default function AdminLayout({children}:{children:React.ReactNode}){
  return <main className="shell"><header className="top"><Link className="brand" href="/admin/gateway">helix<span>.</span> admin</Link><a className="btn" href="/api/admin/logout">Sair</a></header><nav className="nav">{[["gateway","PIX / SyncPay"],["stores","Lojas"],["users","Usuários"],["withdrawals","Saques"],["categories","Categorias"],["remarketing","Remarketing"],["pushcut","Push"],["community","Comunidade"],["settings","Configurações"]].map(([p,l])=><Link key={p} href={`/admin/${p}`}>{l}</Link>)}</nav>{children}</main>;
}
