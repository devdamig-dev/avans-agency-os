import Link from "next/link";
import { ArrowRight, CircleAlert, Database, Network, ShieldCheck } from "lucide-react";
import { dashboardAreas } from "./architecture-data";
import { V2Chrome } from "./components/v2-chrome";
import { attentionItems, automaticActivity, stats } from "./data";
import styles from "./architecture.module.css";

const preservedCapabilities = [
  "Leads",
  "Discovery",
  "Propuestas",
  "Procesos",
  "Proyectos",
  "Reuniones",
  "Contenido",
  "Campañas",
  "Insights",
  "Reportes",
  "Aprendizajes",
  "Agentes",
  "Workflows",
  "Auditoría",
];

export default function V2Page() {
  return (
    <V2Chrome active="command-center" title="Command Center">
      <div className={styles.page}>
        <section className={styles.commandHero}>
          <div className={styles.commandHeroCopy}>
            <span className={styles.kicker}>AVANS OS · SISTEMA OPERATIVO INTERNO</span>
            <h1>Todo Avans, en un solo sistema.</h1>
            <p>
              Clientes, operaciones, ventas, finanzas, RRHH y gerencia conectados sobre una misma fuente de información,
              con procesos diseñados alrededor de cómo trabaja la agencia.
            </p>
          </div>
          <Link href="/v2/clientes" className={styles.heroAction}>
            <div>
              <span>NÚCLEO TRANSVERSAL</span>
              <strong>Ver cómo se centraliza el conocimiento de cada cliente.</strong>
            </div>
            <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>ARQUITECTURA FUNCIONAL</span>
              <h2>Áreas del sistema</h2>
            </div>
            <p>
              Las capacidades que ya existen no desaparecen: se ordenan dentro del área a la que aportan para que el sistema tenga una lógica empresarial clara.
            </p>
          </div>
          <div className={styles.areaGrid}>
            {dashboardAreas.map((area) => (
              <Link href={area.href} className={styles.areaCard} key={area.label}>
                <span className={styles.areaNumber}>{area.number}</span>
                <h3>{area.label}</h3>
                <p>{area.summary}</p>
                <div className={styles.areaCardFoot}>
                  <span>Explorar área</span>
                  <ArrowRight size={18} aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>CENTRALIZACIÓN DE OPERACIONES</span>
              <h2>Lo que necesita atención, sin revisar herramienta por herramienta.</h2>
            </div>
          </div>
          <div className={styles.centralGrid}>
            <article className={styles.attentionPanel}>
              <div className={styles.sectionHead}>
                <div>
                  <span className={styles.kicker}>BANDEJA TRANSVERSAL</span>
                  <h2>Atención requerida</h2>
                </div>
                <CircleAlert size={22} aria-hidden="true" />
              </div>
              <div className={styles.attentionList}>
                {attentionItems.map((item) => (
                  <div className={styles.attentionRow} key={item.id}>
                    <span className={styles.attentionPriority}>{item.priority}</span>
                    <div className={styles.attentionBody}>
                      <span>{item.context}</span>
                      <h3>{item.title}</h3>
                      <p>{item.reason}</p>
                    </div>
                    <div className={styles.attentionSide}>
                      <strong>{item.owner}</strong>
                      <span>{item.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <aside className={styles.signalPanel}>
              <div className={styles.signalLead}>
                <span>UNA FUENTE DE VERDAD</span>
                <strong>Conocimiento y operación conectados.</strong>
              </div>
              <div className={styles.signalBlocks}>
                <div className={styles.signalBlock}>
                  <span>Clientes</span>
                  <strong>Contexto 360°</strong>
                </div>
                <div className={styles.signalBlock}>
                  <span>Procesos</span>
                  <strong>A medida de Avans</strong>
                </div>
                <div className={styles.signalBlock}>
                  <span>Indicadores</span>
                  <strong>Con origen trazable</strong>
                </div>
                <div className={styles.signalBlock}>
                  <span>Control</span>
                  <strong>Roles y aprobación</strong>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>REPORTES E INDICADORES</span>
              <h2>La actividad se convierte en información para decidir.</h2>
            </div>
            <p>Gerencia no necesita recorrer módulos: recibe una lectura consolidada de operación, riesgo, avance y oportunidades.</p>
          </div>
          <div className={styles.indicatorGrid}>
            {stats.map((stat) => (
              <article className={styles.indicatorCard} key={stat.label}>
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
                <small>{stat.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.kicker}>ACTIVIDAD DEL SISTEMA</span>
              <h2>Qué ocurrió y de dónde provino.</h2>
            </div>
          </div>
          <div className={styles.activityList}>
            {automaticActivity.map(([time, area, text, status]) => (
              <article className={styles.activityRow} key={`${time}-${text}`}>
                <time>{time}</time>
                <span>{area}</span>
                <strong>{status}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.footerBand}>
          <div>
            <span className={styles.kicker}>REORDENAR, NO DESCARTAR</span>
            <h2>La nueva arquitectura organiza lo construido alrededor del funcionamiento real de Avans.</h2>
            <p>
              Los módulos actuales pasan a ser capacidades internas de Clientes, Operaciones, Ventas, Finanzas, RRHH, Gerencia o Plataforma.
            </p>
          </div>
          <div className={styles.footerModules} aria-label="Capacidades preservadas">
            {preservedCapabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
        </section>

        <section className={styles.footerBand}>
          <div>
            <span className={styles.kicker}>PLATAFORMA</span>
            <h2>Acceso, seguridad, backups y salud forman parte del producto.</h2>
            <p>La arquitectura técnica acompaña al sistema desde el inicio, no como una capa agregada al final.</p>
          </div>
          <div className={styles.footerModules}>
            <span><ShieldCheck size={13} /> Seguridad</span>
            <span><Database size={13} /> Backups</span>
            <span><Network size={13} /> Integraciones</span>
          </div>
        </section>
      </div>
    </V2Chrome>
  );
}
