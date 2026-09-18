import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { V2Chrome } from "./components/v2-chrome";
import { attentionItems, automaticActivity, intelligenceLoop, learningSignals, stats } from "./data";
import styles from "./v2.module.css";

const kindLabel: Record<string, string> = {
  decision: "Decisión",
  blocker: "Bloqueo",
  alert: "Alerta",
  approval: "Aprobación",
  learning: "Aprendizaje",
};

export default function V2Page() {
  return (
    <V2Chrome active="command-center" title="Command Center">
      <div className={styles.content}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>AVANS INTELLIGENCE CORE · HOY</span>
            <h1>Lo que necesita tu atención.<br />El resto, Avans lo sigue.</h1>
            <p>Una vista para entender la operación, resolver excepciones y aprobar decisiones sensibles sin revisar herramienta por herramienta.</p>
          </div>
          <Link href="/v2/inbox" className={styles.heroSignal}>
            <Sparkles size={18} />
            <div>
              <span>Siguiente mejor acción</span>
              <strong>Resolver la excepción operativa de ACA antes de que impacte el próximo hito.</strong>
            </div>
            <ArrowRight size={18} />
          </Link>
        </section>

        <section className={styles.stats}>
          {stats.map((stat) => (
            <article key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </section>

        <section className={styles.gridMain}>
          <article className={styles.panelLarge}>
            <div className={styles.panelHead}>
              <div>
                <span className={styles.eyebrow}>INTELLIGENT INBOX</span>
                <h2>Atención requerida</h2>
              </div>
              <Link href="/v2/inbox">Ver inbox completo <ArrowRight size={14} /></Link>
            </div>
            <div className={styles.attentionList}>
              {attentionItems.map((item) => (
                <div className={styles.attentionItem} key={item.id}>
                  <div className={styles.itemIcon}>
                    {item.kind === "alert" || item.kind === "blocker" ? (
                      <CircleAlert size={17} />
                    ) : item.kind === "learning" ? (
                      <BrainCircuit size={17} />
                    ) : (
                      <ShieldCheck size={17} />
                    )}
                  </div>
                  <div className={styles.itemBody}>
                    <div className={styles.itemMeta}>
                      <span className={`${styles.priority} ${styles[item.priority.toLowerCase().replace("í", "i")]}`}>{item.priority}</span>
                      <span>{kindLabel[item.kind]}</span>
                      <span>{item.context}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.reason}</p>
                    <div className={styles.recommendation}>
                      <Sparkles size={14} />
                      <span><strong>Avans recomienda:</strong> {item.recommendation}</span>
                    </div>
                  </div>
                  <div className={styles.itemSide}>
                    <span>{item.owner}</span>
                    <small>{item.due}</small>
                    <Link href="/v2/inbox">Resolver <ArrowRight size={13} /></Link>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className={styles.panelSide}>
            <div className={styles.panelHead}>
              <div><span className={styles.eyebrow}>PROCESS HEALTH</span><h2>Operación</h2></div>
            </div>
            <div className={styles.healthScore}>
              <Activity size={22} />
              <div><strong>86</strong><span>/100</span><small>Salud operativa</small></div>
            </div>
            <div className={styles.healthRows}>
              <div><span>Procesos saludables</span><strong>14</strong></div>
              <div><span>Con atención</span><strong>2</strong></div>
              <div><span>Bloqueados</span><strong>2</strong></div>
              <div><span>Errores de ejecución</span><strong>0</strong></div>
            </div>
            <div className={styles.autonomy}>
              <span>Autonomy Score</span>
              <strong>62%</strong>
              <div><i /></div>
              <small>+7 pts vs. período anterior</small>
            </div>
          </aside>
        </section>

        <section className={styles.gridSecondary}>
          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div><span className={styles.eyebrow}>EXECUTION ENGINE</span><h2>Avans resolvió hoy</h2></div>
              <Bot size={18} />
            </div>
            <div className={styles.activityList}>
              {automaticActivity.map(([time, area, text, status]) => (
                <div key={time + text}>
                  <time>{time}</time>
                  <span><strong>{area}</strong><small>{text}</small></span>
                  <em className={status === "Completado" ? styles.ok : styles.derived}>
                    {status === "Completado" ? <CheckCircle2 size={13} /> : <ArrowRight size={13} />} {status}
                  </em>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHead}>
              <div><span className={styles.eyebrow}>LEARNING ENGINE</span><h2>Qué está aprendiendo</h2></div>
              <Lightbulb size={18} />
            </div>
            <div className={styles.learningList}>
              {learningSignals.map((item) => (
                <div key={item.client}>
                  <span><strong>{item.client}</strong><small>{item.signal}</small></span>
                  <em>{item.status}</em>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className={styles.loopPanel}>
          <div>
            <span className={styles.eyebrow}>EL MOTOR DEL PRODUCTO</span>
            <h2>Avans Intelligence Loop</h2>
            <p>Cada proceso observa, detecta y entiende antes de recomendar o actuar. Toda decisión sensible conserva control humano y trazabilidad.</p>
          </div>
          <div className={styles.loop}>
            {intelligenceLoop.map((step, index) => (
              <div key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < intelligenceLoop.length - 1 && <ArrowRight size={14} />}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.architecture}>
          <div><Workflow size={18} /><span><strong>Process Engine</strong><small>Eventos · reglas · workflows</small></span></div>
          <ArrowRight size={15} />
          <div><BrainCircuit size={18} /><span><strong>Intelligence</strong><small>Contexto · agentes · recomendaciones</small></span></div>
          <ArrowRight size={15} />
          <div><ShieldCheck size={18} /><span><strong>Decision & Execution</strong><small>Aprobaciones · límites · trazabilidad</small></span></div>
        </section>
      </div>
    </V2Chrome>
  );
}
