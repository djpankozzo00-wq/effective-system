import Link from "next/link";

export default function HomePage() {
  return <><header className="top"><div className="brand">helix<span>.</span></div><span className="pill">Área do participante</span></header>
    <section className="hero"><span className="tag">MISSÕES DISPONÍVEIS</span><h1>Transforme suas tarefas em recompensas.</h1><p className="muted">Complete missões, acompanhe seu saldo e participe da comunidade.</p><Link className="btn primary" href="/wallet">Ver minha carteira</Link></section>
    <div className="grid"><article className="card"><h3>📍 Avaliações</h3><p className="muted">Encontre missões de avaliação disponíveis.</p><span className="tag">Em breve: catálogo conectado</span></article><article className="card"><h3>💳 Carteira</h3><p className="muted">Consulte saldo, depósitos e movimentações.</p><Link href="/wallet" className="btn">Abrir carteira</Link></article><article className="card"><h3>👥 Comunidade</h3><p className="muted">Veja novidades e publicações.</p><Link href="/community" className="btn">Acessar</Link></article><article className="card"><h3>🙋 Perfil</h3><p className="muted">Informações da sua conta.</p><Link href="/profile" className="btn">Meu perfil</Link></article></div>
  </>;
}