import Link from "next/link";
import { Activity, ArrowRight, BellRing, BriefcaseBusiness, CircleAlert, Gauge, HeartPulse, Layers3, Network, ShieldCheck, Users } from "lucide-react";
import { attentionItems } from "../data";
import styles from "../command-inbox-hub.module.css";

const areas=[
 {label:"Clientes",value:"5",detail:"2 requieren atención",href:"/v2/clientes",icon:Users},
 {label:"Operaciones",value:"12",detail:"2 bloqueos activos",href:"/v2/operaciones",icon:Layers3},
 {label:"Ventas",value:"18",detail:"6 propuestas",href:"/v2/ventas",icon:BriefcaseBusiness},
 {label:"Gerencia",value:"7",detail:"decisiones abiertas",href:"/v2/gerencia",icon:Gauge},
];

const system=[
 {label:"Integraciones",state:"Parcial",detail:"Health checks por conexión pendientes",href:"/v2/integraciones"},
 {label:"Automatizaciones e IA",state:"Operativo demo",detail:"Runs y guardrails modelados",href:"/v2/automatizaciones"},
 {label:"Seguridad",state:"En evolución",detail:"RLS y Google Auth pendientes",href:"/v2/seguridad"},
 {label:"Salud del sistema",state:"Atención",detail:"Restore todavía no probado",href:"/v2/salud-sistema"},
];

const signals=[
 ["Epsa","Benchmark","Nueva señal competitiva de impacto alto","Revisar en Estrategia","/v2/clientes/epsa/benchmark"],
 ["ACA","Operación","Precondición pendiente mantiene un proceso bloqueado","Resolver dependencia","/v2/operaciones"],
 ["Grupo Portland","Ventas","Propuesta lista para validación de alcance e inversión","Decisión comercial","/v2/ventas"],
];

export function CommandCenterHub(){
 return <div className={styles.page}>
  <section className={styles.hero}><div><span className={styles.kickerLight}>AVANS OS · COMMAND CENTER</span><h1>Qué necesita atención hoy.</h1><p>La portada deja de resumir módulos y pasa a coordinar trabajo real: prioridades, decisiones, clientes, capacidad, señales y estado técnico en una sola lectura.</p></div><aside><span>LECTURA OPERATIVA</span><strong>Primero excepciones. Después actividad.</strong><p>Lo que está funcionando dentro de regla no necesita ocupar el mismo espacio que una decisión pendiente o un bloqueo.</p></aside></section>

  <section className={styles.metrics}>
   <a href="/v2/inbox"><span>Atención requerida</span><strong>7</strong><small>3 de alta prioridad</small></a>
   <a href="/v2/operaciones"><span>Bloqueos</span><strong>2</strong><small>Impactan operación</small></a>
   <a href="/v2/ventas"><span>Decisiones comerciales</span><strong>2</strong><small>Esperan validación</small></a>
   <a href="/v2/salud-sistema"><span>Salud técnica</span><strong>1 alerta</strong><small>Restore pendiente</small></a>
  </section>

  <section className={styles.block}><header><div><span className={styles.kicker}>PRIORIDAD DEL DÍA</span><h2>Atención transversal</h2></div><Link href="/v2/inbox">Abrir bandeja completa <ArrowRight size={15}/></Link></header>
   <div className={styles.priorityLayout}>
    <article className={styles.panel}><div className={styles.panelTitle}><div><span className={styles.kicker}>EXCEPCIONES</span><h3>Lo que requiere una persona</h3></div><BellRing size={20}/></div><div className={styles.attentionList}>{attentionItems.map((item)=><Link href={`/v2/objetos/inbox/${item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"")}`} className={styles.attentionRow} key={item.id}><span className={item.priority==="Crítica"?styles.badgeDanger:item.priority==="Alta"?styles.badgeWarn:styles.badgeNeutral}>{item.priority}</span><div><small>{item.context}</small><strong>{item.title}</strong><p>{item.reason}</p></div><div><span>{item.owner}</span><small>{item.due}</small><ArrowRight size={14}/></div></Link>)}</div></article>
    <aside className={styles.panel}><div className={styles.panelTitle}><div><span className={styles.kicker}>RADAR OPERATIVO</span><h3>Áreas principales</h3></div><Gauge size={20}/></div><div className={styles.areaList}>{areas.map(a=>{const Icon=a.icon;return <Link href={a.href} key={a.label}><Icon size={17}/><div><span>{a.label}</span><strong>{a.value}</strong><small>{a.detail}</small></div><ArrowRight size={14}/></Link>})}</div></aside>
   </div>
  </section>

  <section className={styles.block}><header><div><span className={styles.kicker}>SEÑALES</span><h2>Cambios que podrían convertirse en acciones</h2></div><p>Una señal no entra a la bandeja por existir: entra cuando supera relevancia, riesgo o urgencia.</p></header><div className={styles.signalGrid}>{signals.map(([client,type,title,next,href])=><Link href={href} key={title}><span>{type}</span><h3>{client}</h3><p>{title}</p><div><strong>{next}</strong><ArrowRight size={14}/></div></Link>)}</div></section>

  <section className={styles.block}><header><div><span className={styles.kicker}>PLATAFORMA</span><h2>Estado de la infraestructura que sostiene la operación</h2></div><p>El Command Center muestra sólo estados materiales. El detalle técnico vive en cada módulo.</p></header><div className={styles.systemGrid}>{system.map(s=><Link href={s.href} key={s.label}><div><span>{s.label}</span><strong>{s.state}</strong></div><p>{s.detail}</p><ArrowRight size={15}/></Link>)}</div></section>

  <section className={styles.darkBand}><div><span className={styles.kickerLight}>LÓGICA DEL COMMAND CENTER</span><h2>Excepción → decisión → ejecución → evidencia.</h2><p>La pantalla principal coordina. Clientes conserva contexto, Operaciones ejecuta, Gerencia prioriza y Plataforma garantiza que todo ocurra con control y trazabilidad.</p></div><div className={styles.darkSteps}><div><CircleAlert size={18}/><strong>Detectar</strong></div><div><Gauge size={18}/><strong>Priorizar</strong></div><div><Activity size={18}/><strong>Resolver</strong></div><div><ShieldCheck size={18}/><strong>Registrar</strong></div></div></section>
 </div>
}