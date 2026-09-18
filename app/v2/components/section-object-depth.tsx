import {
  Activity,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Database,
  GitBranch,
  ListChecks,
  MessageSquareText,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import styles from "./section-object-depth.module.css";

type Props = {
  section: string;
  title: string;
  client?: string | null;
};

const clientLabel = (client?: string | null) => client ?? "Cuenta asociada";

export function SectionObjectDepth({ section, title, client }: Props) {
  if (section === "procesos") return <ProcessDepth title={title} client={client} />;
  if (section === "proyectos") return <ProjectDepth title={title} client={client} />;
  if (section === "reuniones") return <MeetingDepth title={title} client={client} />;
  if (section === "insights") return <InsightDepth title={title} client={client} />;
  if (section === "oportunidades") return <OpportunityDepth title={title} client={client} />;
  return null;
}

function ProcessDepth({ title, client }: Omit<Props, "section">) {
  const steps = [
    ["Trigger", title.includes("Alta") ? "Propuesta aceptada" : "Evento de negocio detectado", "Automático"],
    ["Precondiciones", "Datos mínimos + permisos + responsable", "Validación"],
    ["Ejecución", "Crear estructura, asignar tareas y sincronizar sistemas", "Automático"],
    ["Human gate", "Resolver excepción o confirmar dato sensible", "Humano"],
    ["Salida", "Proceso activo + próximos pasos + trazabilidad", "Automático"],
  ];

  return (
    <section className={styles.wrap}>
      <header className={styles.sectionHead}>
        <div><span>PROCESS BLUEPRINT</span><h2>Arquitectura real del proceso</h2></div>
        <div className={styles.contextChip}><GitBranch size={14}/>{clientLabel(client)}</div>
      </header>

      <div className={styles.processRail}>
        {steps.map(([label, detail, mode], index) => (
          <div className={styles.processStep} key={label}>
            <div className={styles.stepTop}><span>{String(index + 1).padStart(2,"0")}</span><em>{mode}</em></div>
            <strong>{label}</strong><small>{detail}</small>
            {index < steps.length - 1 && <ArrowRight size={14}/>}
          </div>
        ))}
      </div>

      <div className={styles.threeGrid}>
        <article className={styles.deepCard}>
          <span className={styles.label}><Database size={13}/> INPUTS Y PRECONDICIONES</span>
          <ul className={styles.checkList}>
            <li><CheckCircle2 size={14}/>Cuenta identificada y contexto disponible</li>
            <li><CheckCircle2 size={14}/>Responsable y SLA definidos</li>
            <li><CheckCircle2 size={14}/>Integraciones requeridas disponibles</li>
            <li><CircleAlert size={14}/>1 condición puede derivar a revisión humana</li>
          </ul>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}><ShieldCheck size={13}/> REGLAS Y EXCEPCIONES</span>
          <div className={styles.ruleRows}>
            <div><strong>Sin owner</strong><span>Escalar en 30 min</span></div>
            <div><strong>Dato crítico faltante</strong><span>Bloquear ejecución</span></div>
            <div><strong>Error de integración</strong><span>2 reintentos → humano</span></div>
            <div><strong>Acción irreversible</strong><span>Aprobación obligatoria</span></div>
          </div>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}><Activity size={13}/> INSTANCIAS RECIENTES</span>
          <div className={styles.instanceRows}>
            <div><i className={styles.okDot}/><span><strong>Epsa</strong><small>Completada · 14:22</small></span></div>
            <div><i className={styles.warnDot}/><span><strong>ACA</strong><small>Esperando validación</small></span></div>
            <div><i className={styles.okDot}/><span><strong>Lider Energy</strong><small>En ejecución · paso 3/5</small></span></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function ProjectDepth({ title, client }: Omit<Props, "section">) {
  return (
    <section className={styles.wrap}>
      <header className={styles.sectionHead}>
        <div><span>PROJECT INTELLIGENCE</span><h2>Hitos, dependencias y riesgo</h2></div>
        <div className={styles.contextChip}><Target size={14}/>{clientLabel(client)}</div>
      </header>
      <div className={styles.twoGrid}>
        <article className={styles.deepCard}>
          <span className={styles.label}><ListChecks size={13}/> HITOS DEL PROYECTO</span>
          <div className={styles.milestones}>
            {[
              ["01","Arquitectura validada","Completo","100%"],
              ["02","Integraciones y accesos","Atención","72%"],
              ["03","Piloto controlado","Próximo","24%"],
              ["04","Implementación","Pendiente","0%"],
            ].map(([n,name,status,progress])=>(
              <div key={n}><span>{n}</span><div><strong>{name}</strong><small>{status}</small></div><em>{progress}</em></div>
            ))}
          </div>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}><Radar size={13}/> RIESGO ACTUAL</span>
          <div className={styles.riskHero}><strong>Medio</strong><span>1 dependencia puede mover el próximo hito</span></div>
          <div className={styles.ruleRows}>
            <div><strong>Dependencia</strong><span>Acceso externo pendiente</span></div>
            <div><strong>Owner</strong><span>Project Manager</span></div>
            <div><strong>Impacto</strong><span>+2 días si no se resuelve hoy</span></div>
            <div><strong>Next best action</strong><span>Escalar al responsable del cliente</span></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function MeetingDepth({ title, client }: Omit<Props, "section">) {
  const commitments = [
    ["Compartir acceso faltante","Cliente","Hoy · 17:00","Abierto"],
    ["Actualizar matriz de procesos","Avans","Mañana · 12:00","En curso"],
    ["Validar cambio de contexto","Account Lead","Mañana · 16:00","Revisión"],
  ];
  return (
    <section className={styles.wrap}>
      <header className={styles.sectionHead}>
        <div><span>MEETING INTELLIGENCE</span><h2>De conversación a operación</h2></div>
        <div className={styles.contextChip}><MessageSquareText size={14}/>{clientLabel(client)}</div>
      </header>

      <div className={styles.summaryStrip}>
        <div><strong>3</strong><span>Compromisos</span></div>
        <div><strong>2</strong><span>Decisiones</span></div>
        <div><strong>1</strong><span>Cambio de contexto</span></div>
        <div><strong>0</strong><span>Compromisos vencidos</span></div>
      </div>

      <div className={styles.twoGrid}>
        <article className={styles.deepCard}>
          <span className={styles.label}><ListChecks size={13}/> COMPROMISOS DETECTADOS</span>
          <div className={styles.commitments}>
            {commitments.map(([task,owner,due,status])=>(
              <div key={task}>
                <span className={styles.checkBox}/>
                <div><strong>{task}</strong><small>{owner} · {due}</small></div>
                <em>{status}</em>
              </div>
            ))}
          </div>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}><Sparkles size={13}/> CONTEXTO PROPUESTO</span>
          <div className={styles.contextProposal}>
            <span>CAMBIO A VALIDAR</span>
            <strong>La prioridad operativa pasa de velocidad de entrega a estabilidad del flujo.</strong>
            <p>Avans detectó este cambio a partir de una decisión explícita y dos comentarios consistentes durante la reunión.</p>
            <div><button>Validar cambio</button><button className={styles.ghostButton}>Mantener contexto actual</button></div>
          </div>
        </article>
      </div>
    </section>
  );
}

function InsightDepth({ title, client }: Omit<Props, "section">) {
  return (
    <section className={styles.wrap}>
      <header className={styles.sectionHead}>
        <div><span>EVIDENCE STACK</span><h2>Evidencia, hipótesis y medición</h2></div>
        <div className={styles.contextChip}><Radar size={14}/>{clientLabel(client)}</div>
      </header>

      <div className={styles.insightGrid}>
        <article className={styles.deepCard}>
          <span className={styles.label}>01 · QUÉ CAMBIÓ</span>
          <div className={styles.metricCompare}><div><span>Baseline</span><strong>12.4</strong></div><ArrowRight/><div><span>Actual</span><strong>16.1</strong></div><em>+29.8%</em></div>
          <small className={styles.help}>Comparación contra período equivalente y mismo tipo de operación.</small>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}>02 · HIPÓTESIS IA</span>
          <div className={styles.confidence}><strong>82%</strong><span>confianza</span></div>
          <p className={styles.bodyText}>El principal cambio coincide con una dependencia repetida que empezó a concentrar retrasos durante los últimos ciclos.</p>
        </article>
        <article className={styles.deepCard}>
          <span className={styles.label}>03 · EVIDENCIA</span>
          <ul className={styles.checkList}>
            <li><Database size={14}/>Histórico de 6 períodos</li>
            <li><GitBranch size={14}/>3 incidencias vinculadas</li>
            <li><UsersRound size={14}/>2 responsables afectados</li>
          </ul>
        </article>
      </div>

      <article className={styles.deepCard + " " + styles.measureCard}>
        <div><span className={styles.label}>PLAN DE VALIDACIÓN</span><h3>No alcanza con recomendar: hay que medir si funcionó.</h3></div>
        <div className={styles.measureSteps}>
          <div><span>Acción</span><strong>Resolver dependencia raíz</strong></div>
          <div><span>Métrica</span><strong>Tiempo de ciclo</strong></div>
          <div><span>Ventana</span><strong>7 días</strong></div>
          <div><span>Éxito</span><strong>−15% o mejor</strong></div>
        </div>
      </article>
    </section>
  );
}

function OpportunityDepth({ title, client }: Omit<Props, "section">) {
  return (
    <section className={styles.wrap}>
      <header className={styles.sectionHead}>
        <div><span>OPPORTUNITY SCORE</span><h2>¿Vale la pena actuar ahora?</h2></div>
        <div className={styles.contextChip}><Target size={14}/>{clientLabel(client)}</div>
      </header>
      <div className={styles.scoreGrid}>
        {[
          ["Fit con cuenta","92","Contexto y objetivos"],
          ["Impacto potencial","78","Estimación inicial"],
          ["Timing","86","Ventana activa"],
          ["Esfuerzo","34","Bajo / medio"],
        ].map(([label,value,detail])=>(
          <article className={styles.scoreCard} key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small><div><i style={{width: value + "%"}}/></div></article>
        ))}
      </div>
      <article className={styles.deepCard + " " + styles.opportunityAction}>
        <div><span className={styles.label}><Sparkles size={13}/> PRÓXIMA MEJOR ACCIÓN</span><h3>Convertir la oportunidad en una acción validable, no en otro dato del dashboard.</h3><p>Avans conserva la señal de origen, el contexto utilizado, el responsable y el resultado posterior.</p></div>
        <button>Crear acción vinculada <ArrowRight size={14}/></button>
      </article>
    </section>
  );
}
