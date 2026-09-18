import Link from "next/link";
import { ArrowLeft, CheckCircle2, Database, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { notFound } from "next/navigation";
import { DecisionWorkbench } from "../../../components/decision-workbench";
import { SectionObjectDepth } from "../../../components/section-object-depth";
import { V2Chrome } from "../../../components/v2-chrome";
import { getOperationalObject, getOperationalObjectParams } from "../../../object-data";
import { sectionData } from "../../../section-data";
import styles from "../../../object-detail.module.css";

export function generateStaticParams() {
  return getOperationalObjectParams();
}

export default async function OperationalObjectPage({
  params,
}: {
  params: Promise<{ section: string; item: string }>;
}) {
  const { section, item } = await params;
  const object = getOperationalObject(section, item);
  const sectionLabel = sectionData[section]?.title ?? section;

  if (!object) notFound();

  return (
    <V2Chrome active={section} title={`${sectionLabel} · Detalle`}>
      <div className={styles.wrap}>
        <Link href={`/v2/${section}`} className={styles.back}>
          <ArrowLeft size={14} /> Volver a {sectionLabel}
        </Link>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>{object.kind} · OBJETO OPERATIVO</span>
            <h1>{object.title}</h1>
            <p>{object.summary}</p>
            <div className={styles.badges}>
              <span>{object.status}</span>
              <span>Prioridad {object.priority}</span>
              {object.client && <span>{object.client}</span>}
              <span>{object.source}</span>
            </div>
          </div>
          <div className={styles.heroSide}>
            <span className={styles.eyebrow}>CONFIANZA</span>
            <strong>{object.confidence}</strong>
            <small>Indicador demostrativo; no reemplaza validación.</small>
          </div>
        </section>

        <section className={styles.grid}>
          <div>
            <article className={styles.panel}>
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>EXPLICACIÓN Y DECISIÓN</span>
                  <h2>Qué está viendo Avans</h2>
                </div>
                <Sparkles size={18} />
              </div>
              <div className={styles.explainGrid}>
                <div className={styles.explainBox}>
                  <span>Por qué requiere atención</span>
                  <strong>{object.why}</strong>
                </div>
                <div className={styles.explainBox}>
                  <span>Avans recomienda</span>
                  <strong>{object.recommendation}</strong>
                </div>
              </div>

              <div className={styles.evidence}>
                {object.evidence.map((item) => (
                  <div key={item}>
                    <CheckCircle2 size={15} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className={styles.guardrail}>
                <ShieldCheck size={17} />
                <div>
                  <strong>Guardrail activo</strong>
                  <small>{object.guardrail}</small>
                </div>
              </div>
            </article>

            <article className={styles.panel} style={{ marginTop: 14 }}>
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>FLUJO DEL OBJETO</span>
                  <h2>De señal a resultado</h2>
                </div>
                <Workflow size={18} />
              </div>
              <div className={styles.flow}>
                {object.flow.map((step, index) => (
                  <div className={styles.flowStep} key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </article>

            <DecisionWorkbench
              title={object.title}
              initialStatus={object.status}
              actions={object.actions}
              reversible={object.reversible}
            />
          </div>

          <aside>
            <article className={styles.panel}>
              <div className={styles.panelHead}>
                <div>
                  <span className={styles.eyebrow}>CONTEXTO DEL OBJETO</span>
                  <h2>Metadatos</h2>
                </div>
                <Database size={17} />
              </div>
              <div className={styles.metaList}>
                <div><span>Responsable</span><strong>{object.owner}</strong></div>
                <div><span>Fuente</span><strong>{object.source}</strong></div>
                <div><span>Estado</span><strong>{object.status}</strong></div>
                <div><span>Vencimiento</span><strong>{object.due}</strong></div>
                <div><span>Rollback</span><strong>{object.reversible ? "Disponible" : "No aplica"}</strong></div>
              </div>
            </article>

            <article className={styles.panel} style={{ marginTop: 14 }}>
              <span className={styles.eyebrow}>HISTORIAL</span>
              <h2>Trazabilidad</h2>
              <div className={styles.timeline}>
                {object.timeline.map((event) => (
                  <div className={styles.timelineRow} key={event.time + event.title}>
                    <time>{event.time}</time>
                    <span className={styles.timelineDot} />
                    <div>
                      <strong>{event.title}</strong>
                      <small>{event.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <SectionObjectDepth section={section} title={object.title} client={object.client} />
      </div>
    </V2Chrome>
  );
}
