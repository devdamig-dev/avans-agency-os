import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CalendarCheck2,
  CheckCircle2,
  CircleAlert,
  Database,
  FileChartColumn,
  FolderKanban,
  Layers3,
  Megaphone,
  MessagesSquare,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { notFound } from "next/navigation";
import { V2Chrome } from "../../components/v2-chrome";
import { avansClients } from "../../agency-client-data";
import { clientHubData } from "../../client-hub-data";
import styles from "./client-profile.module.css";

export function generateStaticParams() {
  return avansClients.map((client) => ({ client: client.slug }));
}

export default async function ClientProfilePage({ params }: { params: Promise<{ client: string }> }) {
  const { client: clientSlug } = await params;
  const client = avansClients.find((item) => item.slug === clientSlug);
  const hub = clientHubData[clientSlug];
  if (!client || !hub) notFound();

  const pendingCount = hub.signals.filter((signal) => signal.tone === "attention").length;
  const activeProcesses = hub.processes.filter((process) => process.state !== "Bloqueado").length;

  return (
    <V2Chrome active="clientes" title={client.name}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>CLIENT INTELLIGENCE HUB</span>
            <h1>{client.name}</h1>
            <p>
              Una única vista para entender qué sabe Avans, qué está ejecutando, qué requiere atención
              y qué aprendió de la cuenta antes de que cualquier agente o automatización actúe.
            </p>
            <div className={styles.meta}>
              <span>{client.health}</span>
              <span>{client.context}% contexto disponible</span>
              <span>{pendingCount} señales prioritarias</span>
              <span>{hub.accountOwner}</span>
              <span>Datos simulados</span>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href={`/v2/clientes/${client.slug}/contenido`}>Trabajar cuenta <ArrowRight size={13} /></Link>
            {client.slug === "aca" && <Link href="/v2/casos/aca-seguimiento">Ver circuito conectado <ArrowRight size={13} /></Link>}
            <Link href="/v2/clientes">Cambiar cliente</Link>
          </div>
        </section>

        <nav className={styles.tabs} aria-label="Ficha del cliente">
          <a href="#resumen">Resumen</a>
          <a href="#atencion">Atención</a>
          <a href="#contexto">Contexto</a>
          <a href="#servicios">Servicios</a>
          <a href="#procesos">Procesos</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#reuniones">Reuniones</a>
          <a href="#decisiones">Decisiones</a>
          <a href="#aprendizajes">Aprendizajes</a>
          <a href="#auditoria">Auditoría</a>
        </nav>

        <section className={styles.summaryGrid} id="resumen">
          <article className={styles.summaryCard}>
            <span>Salud de cuenta</span>
            <strong>{client.health === "Atención" ? "72" : "86"}</strong>
            <small>/100 · señal compuesta demo</small>
          </article>
          <article className={styles.summaryCard}>
            <span>Contexto útil</span>
            <strong>{client.context}%</strong>
            <small>validado + disponible</small>
          </article>
          <article className={styles.summaryCard}>
            <span>Procesos activos</span>
            <strong>{activeProcesses}</strong>
            <small>{hub.processes.length} configurados</small>
          </article>
          <article className={styles.summaryCard}>
            <span>Atención humana</span>
            <strong>{pendingCount}</strong>
            <small>señales prioritarias</small>
          </article>
          <article className={styles.summaryCard}>
            <span>Autonomía</span>
            <strong>{clientSlug === "lider-energy" ? "39%" : clientSlug === "aca" ? "52%" : "61%"}</strong>
            <small>dentro de reglas</small>
          </article>
        </section>

        <section className={styles.accountGrid}>
          <main>
            <article className={styles.panel} id="atencion">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>ATTENTION LAYER</span>
                  <h2>Qué necesita atención ahora</h2>
                </div>
                <Radar size={18} />
              </div>
              <div className={styles.signalGrid}>
                {hub.signals.map((signal) => (
                  <div className={`${styles.signal} ${styles[signal.tone]}`} key={signal.title}>
                    {signal.tone === "attention" ? <CircleAlert size={16} /> : signal.tone === "ok" ? <CheckCircle2 size={16} /> : <Activity size={16} />}
                    <div>
                      <strong>{signal.title}</strong>
                      <small>{signal.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="contexto">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>CONTEXT & MEMORY</span>
                  <h2>Qué sabe Avans de {client.name}</h2>
                </div>
                <BrainCircuit size={18} />
              </div>
              <div className={styles.contextLayout}>
                <div className={styles.contextBlock}>
                  <span>Contexto estratégico</span>
                  <strong>Negocio, objetivos, públicos, posicionamiento, restricciones y prioridades.</strong>
                  <small>Fuente: Discovery + reuniones + validaciones.</small>
                </div>
                <div className={styles.contextBlock}>
                  <span>Brand & communication brain</span>
                  <strong>Tono, referencias, claims, piezas aprobadas y criterios de comunicación.</strong>
                  <small>Fuente: contenidos + feedback + aprobaciones.</small>
                </div>
                <div className={styles.contextBlock}>
                  <span>Decision memory</span>
                  <strong>Qué se decidió, por qué, quién lo aprobó y qué resultado tuvo.</strong>
                  <small>Fuente: decisiones + guardrails + auditoría.</small>
                </div>
                <div className={styles.contextBlock}>
                  <span>Operational memory</span>
                  <strong>Procesos, excepciones, compromisos y aprendizajes de operación.</strong>
                  <small>Fuente: workflows + reuniones + resultados.</small>
                </div>
              </div>

              <div className={styles.sourceTable}>
                <div className={styles.tableHead}><span>Fuente</span><span>Tipo</span><span>Frescura</span><span>Estado</span></div>
                {hub.sources.map((source) => (
                  <div className={styles.tableRow} key={source.name}>
                    <strong>{source.name}</strong><span>{source.type}</span><span>{source.freshness}</span><em>{source.state}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="servicios">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>SERVICES & CAPABILITIES</span>
                  <h2>Servicios activos sobre la cuenta</h2>
                </div>
                <Layers3 size={18} />
              </div>
              <div className={styles.serviceGrid}>
                {hub.services.map((service) => (
                  <article className={styles.serviceCard} key={service.name}>
                    <span>{service.type}</span>
                    <strong>{service.name}</strong>
                    <div><small>Estado</small><em>{service.state}</em></div>
                    <div><small>Cadencia</small><em>{service.cadence}</em></div>
                    <div><small>Siguiente</small><em>{service.next}</em></div>
                  </article>
                ))}
              </div>
              <div className={styles.quickLinks}>
                <Link href={`/v2/clientes/${client.slug}/contenido`}><BookOpenCheck size={15}/> Contenido <ArrowRight size={14}/></Link>
                <Link href={`/v2/clientes/${client.slug}/campanas`}><Megaphone size={15}/> Campañas <ArrowRight size={14}/></Link>
                <Link href={`/v2/clientes/${client.slug}/reportes`}><FileChartColumn size={15}/> Reportes <ArrowRight size={14}/></Link>
              </div>
            </article>

            <article className={styles.panel} id="procesos">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>PROCESS PORTFOLIO</span>
                  <h2>Procesos activos y nivel de autonomía</h2>
                </div>
                <Workflow size={18} />
              </div>
              <div className={styles.processTable}>
                <div className={styles.tableHeadProcess}><span>Proceso</span><span>Owner</span><span>Estado</span><span>Autonomía</span><span>Próximo paso</span></div>
                {hub.processes.map((process) => (
                  <div className={styles.processRow} key={process.name}>
                    <strong>{process.name}</strong>
                    <span>{process.owner}</span>
                    <em>{process.state}</em>
                    <div className={styles.automation}><i style={{ width: process.automation }} /><small>{process.automation}</small></div>
                    <span>{process.next}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="proyectos">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>PROJECT LAYER</span>
                  <h2>Proyectos e implementación</h2>
                </div>
                <FolderKanban size={18} />
              </div>
              <div className={styles.projectGrid}>
                {hub.projects.map((project) => (
                  <article className={styles.projectCard} key={project.name}>
                    <div><strong>{project.name}</strong><em>Riesgo {project.risk}</em></div>
                    <div className={styles.progress}><i style={{ width: `${project.progress}%` }} /></div>
                    <footer><span>{project.progress}% completado</span><small>Próximo: {project.nextMilestone}</small></footer>
                  </article>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="reuniones">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>MEETING INTELLIGENCE</span>
                  <h2>Reuniones convertidas en operación</h2>
                </div>
                <MessagesSquare size={18} />
              </div>
              <div className={styles.meetingGrid}>
                {hub.meetings.map((meeting) => (
                  <article className={styles.meetingCard} key={meeting.title}>
                    <div><CalendarCheck2 size={15}/><span>{meeting.when}</span></div>
                    <strong>{meeting.title}</strong>
                    <footer><span>{meeting.commitments} compromisos</span><em>{meeting.state}</em></footer>
                  </article>
                ))}
              </div>
            </article>
          </main>

          <aside>
            <article className={styles.panel} id="decisiones">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>DECISION MEMORY</span>
                  <h2>Decisiones recientes</h2>
                </div>
                <ShieldCheck size={17} />
              </div>
              <div className={styles.decisionList}>
                {hub.decisions.map((decision) => (
                  <div className={styles.decision} key={decision.title}>
                    <time>{decision.time}</time>
                    <strong>{decision.title}</strong>
                    <small>{decision.source}</small>
                    <em>{decision.state}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="aprendizajes">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>LEARNING ENGINE</span>
                  <h2>Memoria que puede mejorar</h2>
                </div>
                <Sparkles size={17} />
              </div>
              <div className={styles.learningList}>
                {hub.learnings.map((learning) => (
                  <div key={learning.title}>
                    <strong>{learning.title}</strong>
                    <small>{learning.source}</small>
                    <em>{learning.state}</em>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.panel} id="auditoria">
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>AUDIT TRAIL</span>
                  <h2>Actividad reciente</h2>
                </div>
                <Database size={17} />
              </div>
              <div className={styles.auditList}>
                {hub.activity.map((event) => (
                  <div key={event.time + event.action}>
                    <time>{event.time}</time>
                    <div><strong>{event.actor}</strong><small>{event.action}</small></div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.accountMap}>
              <span className={styles.eyebrow}>ACCOUNT MAP</span>
              <h2>Cómo se conecta la cuenta</h2>
              <div className={styles.mapFlow}>
                <span>Contexto</span><ArrowRight size={13}/><span>Procesos</span><ArrowRight size={13}/><span>Decisiones</span>
                <span>Fuentes</span><ArrowRight size={13}/><span>Insights</span><ArrowRight size={13}/><span>Aprendizaje</span>
              </div>
              <p>La ficha no es un CRM duplicado: es la capa que da contexto a workflows, agentes y decisiones.</p>
            </article>
          </aside>
        </section>
      </div>
    </V2Chrome>
  );
}
