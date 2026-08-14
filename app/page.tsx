const stats = [
  ["Leads nuevos", "24", "+8 esta semana"],
  ["Aprobaciones pendientes", "13", "contenido, reportes y propuestas"],
  ["Clientes activos", "18", "6 con procesos automatizados"],
  ["Agentes configurados", "9", "todos con revisión humana"]
];

const navItems = ["Dashboard", "Leads", "Clientes", "Discovery", "Propuestas", "Onboarding", "Contenido", "Reportes", "Aprobaciones", "Agentes"];

const pipeline = [
  { title: "Nuevo lead", count: 8, items: ["Clínica dental · WhatsApp", "Inmobiliaria · Instagram", "Ecommerce muebles · Formulario"] },
  { title: "IA clasificó", count: 6, items: ["Necesita CRM", "Quiere automatizar reportes", "Solicita pauta + web"] },
  { title: "Humano revisa", count: 5, items: ["Definir prioridad", "Validar presupuesto", "Agendar discovery"] },
  { title: "Propuesta", count: 3, items: ["Automation Start", "Agency OS interno", "Reporting mensual"] }
];

const modules = [
  ["Comercial", "Entrada de leads desde redes, WhatsApp, formularios y email. Clasificación, scoring, resumen y próximo paso sugerido."],
  ["Discovery", "La IA ordena respuestas, detecta dolores, genera brief interno y sugiere preguntas pendientes."],
  ["Propuestas", "Generación de estructura base, alcance, etapas, entregables, exclusiones y próximos pasos."],
  ["Alta de cliente", "Datos fiscales, contrato, facturación, accesos, carpeta Drive, kickoff y checklist operativo."],
  ["Contenido", "Ideas, copies, prompts de imagen, guiones de video y revisión según criterio del content manager."],
  ["Reportes", "Carga de métricas o capturas, interpretación IA, resumen ejecutivo e insights para el cliente."],
  ["Aprobaciones", "Todo lo que produce IA queda en borrador: ningún mensaje, reporte o propuesta sale sin check humano."],
  ["Project Manager", "Derivación de piezas aprobadas, tareas, bloqueos, responsables y actividad reciente por cliente."]
];

const approvals = [
  ["Reporte mensual · Clínica Norte", "Report Analyst Agent", "PM", "Pendiente"],
  ["Copy campaña · Marzo Pumps", "Copywriter Agent", "Content", "Revisión"],
  ["Propuesta Automation Start", "Proposal Agent", "CEO", "Ajustar alcance"],
  ["Checklist alta · Cliente nuevo", "Onboarding Agent", "Administración", "Pendiente"]
];

const agents = [
  ["Lead Classifier", "Clasifica origen, necesidad, urgencia y servicio sugerido."],
  ["Discovery Brief", "Convierte respuestas desordenadas en brief accionable."],
  ["Proposal Draft", "Arma borradores de propuesta sin definir precio final."],
  ["Onboarding Assistant", "Detecta datos, accesos y documentos faltantes."],
  ["Content Strategist", "Propone ideas según marca, objetivo y calendario."],
  ["Report Analyst", "Interpreta métricas y redacta insights entendibles."]
];

function AvansLogo() {
  return (
    <div className="brand-logo" aria-label="Avans">
      <span>Avans</span>
      <svg viewBox="0 0 84 84" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="avansGradient" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0%" stopColor="#ff2a99" />
            <stop offset="48%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="#8d55ff" />
          </linearGradient>
        </defs>
        <path d="M16 14h54v54H54V42.5L25.5 71 13 58.5 41.5 30H16V14z" fill="url(#avansGradient)" />
      </svg>
    </div>
  );
}

function StatusBadge({ children, tone = "neutral" }: { children: string; tone?: "neutral" | "ok" | "warn" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export default function Home() {
  return (
    <main className="system-shell">
      <aside className="sidebar">
        <div className="logo-card"><AvansLogo /><small>Agency OS</small></div>
        <nav>
          {navItems.map((item, index) => <a className={index === 0 ? "active" : ""} href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
        </nav>
        <div className="side-panel">
          <p>Modo demo</p>
          <strong>Operación con IA supervisada</strong>
          <span>Todos los outputs quedan como borrador hasta aprobación humana.</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Avans Automation · MVP operativo</p>
            <h1>Sistema para automatizar la operación completa de una agencia.</h1>
          </div>
          <div className="top-actions">
            <button>Crear lead</button>
            <button className="primary">Ejecutar agente</button>
          </div>
        </header>

        <section className="stats-grid">
          {stats.map(([label, value, caption]) => (
            <article className="stat-card" key={label}>
              <p>{label}</p>
              <strong>{value}</strong>
              <span>{caption}</span>
            </article>
          ))}
        </section>

        <section className="main-grid">
          <article className="panel large" id="dashboard">
            <div className="panel-head">
              <div><p className="eyebrow">Comercial</p><h2>Pipeline de captación, seguimiento y cierre</h2></div>
              <StatusBadge tone="ok">IA activa</StatusBadge>
            </div>
            <div className="pipeline-grid">
              {pipeline.map((column) => (
                <div className="pipeline-column" key={column.title}>
                  <div className="column-head"><strong>{column.title}</strong><span>{column.count}</span></div>
                  {column.items.map((item) => <div className="mini-card" key={item}>{item}</div>)}
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-head compact"><h2>Lead seleccionado</h2><StatusBadge tone="warn">Revisión humana</StatusBadge></div>
            <div className="lead-box">
              <strong>Clínica dental · WhatsApp</strong>
              <p>Quiere ordenar consultas, seguimiento y agendamiento. La IA sugiere módulo Comercial + Atención + Reportes.</p>
              <div className="ai-output">
                <span>Respuesta sugerida</span>
                <p>“Gracias por escribirnos. Para entender el flujo actual, necesitamos saber volumen de consultas, canales y herramienta de agenda.”</p>
              </div>
              <div className="button-row"><button>Aprobar</button><button>Editar</button><button>Rechazar</button></div>
            </div>
          </article>
        </section>

        <section className="module-grid" id="clientes">
          {modules.map(([title, description]) => (
            <article className="module-card" key={title}>
              <span className="module-dot" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </section>

        <section className="main-grid two">
          <article className="panel" id="contenido">
            <div className="panel-head"><div><p className="eyebrow">Contenido</p><h2>Fábrica de contenidos con criterio humano</h2></div></div>
            <div className="form-demo">
              <label>Cliente <input value="Avans Agency" readOnly /></label>
              <label>Objetivo <input value="Lanzar Avans Automation" readOnly /></label>
              <label>Pedido <textarea value="Generar ideas, copies, prompts de imagen y guion de reel para presentar el sistema de agentes IA." readOnly /></label>
              <button className="primary full">Generar borrador IA</button>
            </div>
          </article>

          <article className="panel" id="reportes">
            <div className="panel-head"><div><p className="eyebrow">Reportes</p><h2>Reporte personalizado para cliente</h2></div><StatusBadge>Sin APIs todavía</StatusBadge></div>
            <div className="report-preview">
              <div><span>Inversión Meta Ads</span><strong>$480.000</strong></div>
              <div><span>Leads generados</span><strong>186</strong></div>
              <div><span>CPL estimado</span><strong>$2.580</strong></div>
            </div>
            <div className="ai-output"><span>Insight generado</span><p>La campaña mejora volumen, pero debe optimizarse segmentación y calidad de formularios antes de escalar presupuesto.</p></div>
          </article>
        </section>

        <section className="main-grid two">
          <article className="panel" id="aprobaciones">
            <div className="panel-head"><div><p className="eyebrow">Bandeja transversal</p><h2>Aprobaciones pendientes</h2></div></div>
            <table>
              <thead><tr><th>Elemento</th><th>Agente</th><th>Responsable</th><th>Estado</th></tr></thead>
              <tbody>{approvals.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
            </table>
          </article>

          <article className="panel" id="agentes">
            <div className="panel-head"><div><p className="eyebrow">Motores IA</p><h2>Agentes por módulo</h2></div><StatusBadge tone="ok">9 activos</StatusBadge></div>
            <div className="agent-list">
              {agents.map(([name, description]) => <div className="agent" key={name}><strong>{name}</strong><p>{description}</p></div>)}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
