import { ArrowRight, CheckCircle2, Database, FileCheck2, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import type { AgencyModuleSlug } from "../agency-client-data";
import styles from "./agency-object-depth.module.css";

export function AgencyObjectDepth({
  module,
  clientName,
  title,
}: {
  module: AgencyModuleSlug;
  clientName: string;
  title: string;
}) {
  if (module === "contenido") return <ContentDepth clientName={clientName} />;
  if (module === "campanas") return <CampaignDepth clientName={clientName} />;
  return <ReportDepth clientName={clientName} />;
}

function ContentDepth({ clientName }: { clientName: string }) {
  return (
    <section className={styles.wrap}>
      <header className={styles.head}>
        <div><span>CONTENT OPERATING SYSTEM</span><h2>De brief a pieza publicada</h2></div>
        <em>{clientName}</em>
      </header>

      <div className={styles.stageGrid}>
        {[
          ["01","Brief","Objetivo, audiencia, canal y restricción"],
          ["02","Investigación","Contexto + memoria + señales externas"],
          ["03","Variantes","Ángulo, copy, formato y referencia visual"],
          ["04","Revisión","Interna + cliente + motivo de cambios"],
          ["05","Publicación","Versión aprobada + canal + fecha"],
          ["06","Aprendizaje","Performance + corrección + memoria"],
        ].map(([n,label,detail])=>(
          <div key={n}><span>{n}</span><strong>{label}</strong><small>{detail}</small></div>
        ))}
      </div>

      <div className={styles.twoGrid}>
        <article className={styles.card}>
          <span className={styles.label}><Sparkles size={13}/> VARIANTES EN EVALUACIÓN</span>
          <div className={styles.variants}>
            <div><strong>V1 · Educativo</strong><small>Explica problema + solución</small><em>84% fit</em></div>
            <div><strong>V2 · Caso / evidencia</strong><small>Usa prueba social y resultado</small><em>91% fit</em></div>
            <div><strong>V3 · Directo comercial</strong><small>CTA más agresivo</small><em>68% fit</em></div>
          </div>
        </article>
        <article className={styles.card}>
          <span className={styles.label}><FileCheck2 size={13}/> REVISIÓN Y VERSIONADO</span>
          <div className={styles.timeline}>
            <div><span>v0.1</span><strong>Generada por IA</strong><small>10:12</small></div>
            <div><span>v0.2</span><strong>Ajuste interno</strong><small>10:24</small></div>
            <div><span>v0.3</span><strong>Feedback cliente</strong><small>12:08</small></div>
            <div><span>v1.0</span><strong>Aprobada</strong><small>Pendiente</small></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function CampaignDepth({ clientName }: { clientName: string }) {
  return (
    <section className={styles.wrap}>
      <header className={styles.head}>
        <div><span>CAMPAIGN INTELLIGENCE</span><h2>Detectar → decidir → ejecutar → medir</h2></div>
        <em>{clientName}</em>
      </header>

      <div className={styles.campaignStrip}>
        <div><span>CPL baseline</span><strong>$12.4</strong></div>
        <ArrowRight size={16}/>
        <div><span>CPL actual</span><strong>$16.1</strong></div>
        <div className={styles.alert}><span>Desvío</span><strong>+29.8%</strong></div>
        <div><span>Confianza</span><strong>82%</strong></div>
      </div>

      <div className={styles.twoGrid}>
        <article className={styles.card}>
          <span className={styles.label}><Database size={13}/> EVIDENCIA DE LA RECOMENDACIÓN</span>
          <ul>
            <li><CheckCircle2 size={14}/>7 días vs período equivalente</li>
            <li><CheckCircle2 size={14}/>Mismo objetivo y ventana de atribución</li>
            <li><CheckCircle2 size={14}/>Frecuencia +18%, CTR −11%</li>
            <li><CheckCircle2 size={14}/>Sin cambio relevante de presupuesto</li>
          </ul>
        </article>
        <article className={styles.card}>
          <span className={styles.label}><ShieldCheck size={13}/> EXECUTION GUARDRAIL</span>
          <div className={styles.guardrailGrid}>
            <div><span>Acción</span><strong>Ajustar presupuesto</strong></div>
            <div><span>Límite</span><strong>±10%</strong></div>
            <div><span>Aprobación</span><strong>Especialista</strong></div>
            <div><span>Rollback</span><strong>Disponible</strong></div>
          </div>
        </article>
      </div>

      <article className={styles.measure}>
        <div><span className={styles.label}><Gauge size={13}/> SEGUIMIENTO POSTERIOR</span><h3>La recomendación no termina cuando se ejecuta.</h3></div>
        <div className={styles.measureItems}>
          <div><span>Ventana</span><strong>72 horas</strong></div>
          <div><span>Métrica primaria</span><strong>CPL</strong></div>
          <div><span>Éxito</span><strong>−12% o mejor</strong></div>
          <div><span>Resultado</span><strong>Pendiente</strong></div>
        </div>
      </article>
    </section>
  );
}

function ReportDepth({ clientName }: { clientName: string }) {
  return (
    <section className={styles.wrap}>
      <header className={styles.head}>
        <div><span>REPORTING PIPELINE</span><h2>De datos a decisiones explicables</h2></div>
        <em>{clientName}</em>
      </header>

      <div className={styles.sourceGrid}>
        {[
          ["Meta Ads","Listo","100%"],
          ["Google Ads","Listo","100%"],
          ["CRM","Listo","98%"],
          ["Incidencias","Listo","100%"],
          ["Decisiones","Listo","100%"],
        ].map(([name,status,value])=>(
          <article key={name}><span>{name}</span><strong>{status}</strong><small>{value} cobertura</small></article>
        ))}
      </div>

      <div className={styles.twoGrid}>
        <article className={styles.card}>
          <span className={styles.label}><Sparkles size={13}/> INSIGHTS PROPUESTOS</span>
          <div className={styles.insightRows}>
            <div><strong>Performance estable con mayor costo</strong><small>Evidencia: CPL +14%, conversiones +2%</small><em>Revisar</em></div>
            <div><strong>Mejora de calidad comercial</strong><small>Evidencia: SQL / lead +9%</small><em>Validado</em></div>
            <div><strong>Próximo foco recomendado</strong><small>Reducir pérdida entre formulario y contacto</small><em>Revisar</em></div>
          </div>
        </article>
        <article className={styles.card}>
          <span className={styles.label}><FileCheck2 size={13}/> VERSIONES</span>
          <div className={styles.timeline}>
            <div><span>Datos</span><strong>Cierre confirmado</strong><small>09:20</small></div>
            <div><span>Interna</span><strong>Borrador IA</strong><small>09:34</small></div>
            <div><span>Revisión</span><strong>Especialista</strong><small>10:05</small></div>
            <div><span>Cliente</span><strong>Versión final</strong><small>Pendiente</small></div>
          </div>
        </article>
      </div>
    </section>
  );
}
