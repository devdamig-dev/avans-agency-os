import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { V2Chrome } from "../../components/v2-chrome";
import { avansClients } from "../../agency-client-data";
import styles from "./client-profile.module.css";

export function generateStaticParams() {
  return avansClients.map((client) => ({ client: client.slug }));
}

export default async function ClientProfilePage({ params }: { params: Promise<{ client: string }> }) {
  const { client: clientSlug } = await params;
  const client = avansClients.find((item) => item.slug === clientSlug);
  if (!client) notFound();

  return (
    <V2Chrome active="clientes" title={client.name}>
      <div className={styles.wrap}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>CLIENT INTELLIGENCE HUB</span>
            <h1>{client.name}</h1>
            <p>Ficha central de la cuenta: contexto, servicios, proyectos, reuniones, decisiones, performance y aprendizajes conectados antes de que cualquier agente o automatización actúe.</p>
            <div className={styles.meta}>
              <span>{client.health}</span>
              <span>{client.context}% contexto disponible</span>
              <span>{client.attention}</span>
              <span>Datos demo</span>
            </div>
          </div>
          <div className={styles.actions}>
            <Link href={`/v2/clientes/${client.slug}/contenido`}>Trabajar cuenta <ArrowRight size={13} /></Link>
            <Link href="/v2/clientes">Cambiar cliente</Link>
          </div>
        </section>

        <nav className={styles.tabs} aria-label="Ficha del cliente">
          <Link href={`/v2/clientes/${client.slug}`}>Resumen</Link>
          <a href="#contexto">Contexto</a>
          <a href="#operacion">Operación</a>
          <a href="#decisiones">Decisiones</a>
          <Link href={`/v2/clientes/${client.slug}/contenido`}>Contenido</Link>
          <Link href={`/v2/clientes/${client.slug}/campanas`}>Campañas</Link>
          <Link href={`/v2/clientes/${client.slug}/reportes`}>Reportes</Link>
        </nav>

        <section className={styles.grid}>
          <div>
            <article className={styles.panel}>
              <span className={styles.eyebrow}>RESUMEN OPERATIVO</span>
              <h2>Estado de la cuenta</h2>
              <div className={styles.kpis}>
                <div className={styles.kpi}><span>Salud</span><strong>86</strong><small>/100</small></div>
                <div className={styles.kpi}><span>Contexto</span><strong>{client.context}%</strong><small>validado + disponible</small></div>
                <div className={styles.kpi}><span>Pendientes</span><strong>{client.health === "Atención" ? "3" : "1"}</strong><small>requieren intervención</small></div>
                <div className={styles.kpi}><span>Autonomía</span><strong>58%</strong><small>acciones dentro de reglas</small></div>
              </div>
            </article>

            <article className={styles.panel} id="contexto" style={{ marginTop: 14 }}>
              <span className={styles.eyebrow}>CONTEXTO Y MEMORIA</span>
              <h2>Qué sabe Avans de {client.name}</h2>
              <div className={styles.sections}>
                <div className={styles.section}><div><strong>Contexto estratégico</strong><small>Negocio, propuesta de valor, objetivos, públicos, posicionamiento y restricciones.</small></div><em>Validado</em></div>
                <div className={styles.section}><div><strong>Brand & communication brain</strong><small>Tono, estilo, claims, referencias, piezas aprobadas y criterios de comunicación.</small></div><em>Activo</em></div>
                <div className={styles.section}><div><strong>Fuentes y documentos</strong><small>Reuniones, brief, documentos, historial de decisiones y datos operativos de la cuenta.</small></div><em>Conectado</em></div>
                <div className={styles.section}><div><strong>Aprendizajes</strong><small>Patrones validados que pueden condicionar futuras recomendaciones y ejecuciones.</small></div><em>4 activos</em></div>
              </div>
            </article>

            <article className={styles.panel} id="operacion" style={{ marginTop: 14 }}>
              <span className={styles.eyebrow}>OPERACIÓN DE CUENTA</span>
              <h2>Procesos y servicios activos</h2>
              <div className={styles.sections}>
                <div className={styles.section}><div><strong>Producción y contenido</strong><small>Planificación, producción, revisión, aprobación y aprendizaje dentro del contexto del cliente.</small></div><em>En curso</em></div>
                <div className={styles.section}><div><strong>Campañas</strong><small>Monitoreo por excepción, recomendaciones asistidas, aprobaciones y medición posterior.</small></div><em>Activo</em></div>
                <div className={styles.section}><div><strong>Reporting</strong><small>Datos normalizados, insights, narrativa ejecutiva y próximos pasos.</small></div><em>Mensual</em></div>
                <div className={styles.section}><div><strong>Meeting Intelligence</strong><small>Compromisos, decisiones y cambios de contexto transformados en acciones trazables.</small></div><em>Activo</em></div>
              </div>
            </article>
          </div>

          <aside>
            <article className={styles.panel} id="decisiones">
              <span className={styles.eyebrow}>DECISION MEMORY</span>
              <h2>Últimas decisiones</h2>
              <div className={styles.timeline}>
                <div className={styles.event}><time>Hoy</time><div><strong>Recomendación derivada a revisión</strong><small>La IA detectó una excepción y no ejecutó por superar el umbral de autonomía.</small></div></div>
                <div className={styles.event}><time>Ayer</time><div><strong>Feedback validado</strong><small>Una corrección recurrente quedó incorporada como criterio de cuenta.</small></div></div>
                <div className={styles.event}><time>3 días</time><div><strong>Compromiso de reunión cerrado</strong><small>La tarea quedó vinculada al acta y al responsable que la confirmó.</small></div></div>
              </div>
            </article>

            <article className={styles.panel} style={{ marginTop: 14 }}>
              <span className={styles.eyebrow}>FUENTES DE CONOCIMIENTO</span>
              <h2>Procedencia del contexto</h2>
              <div className={styles.memory}>
                <div><span>Confirmado</span><strong>Información validada</strong><small>Datos aprobados por equipo o cliente.</small></div>
                <div><span>Importado</span><strong>Sistemas conectados</strong><small>Datos provenientes de herramientas externas y documentos.</small></div>
                <div><span>Inferido</span><strong>Hipótesis IA</strong><small>No modifica memoria crítica hasta ser validado.</small></div>
                <div><span>Aprendido</span><strong>Patrones validados</strong><small>Feedback y resultados que ya mejoran futuras ejecuciones.</small></div>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </V2Chrome>
  );
}
