"use client";

import { useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  Database,
  GitBranch,
  Inbox,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
} from "lucide-react";
import { useDemoState } from "./demo-state-provider";
import styles from "./connected-case-console.module.css";

const steps = [
  {
    key: "meeting",
    label: "Reunión",
    title: "ACA · Seguimiento",
    detail: "Meeting Intelligence procesa la conversación y detecta tres compromisos.",
    icon: MessageSquareText,
  },
  {
    key: "commitment",
    label: "Compromiso",
    title: "Compartir acceso faltante",
    detail: "El compromiso queda con owner, fecha y origen trazable.",
    icon: UserCheck,
  },
  {
    key: "process",
    label: "Proceso",
    title: "Seguimiento de compromisos",
    detail: "Process Engine crea el seguimiento y evalúa la precondición.",
    icon: Workflow,
  },
  {
    key: "attention",
    label: "Inbox",
    title: "ACA · Insumo pendiente",
    detail: "La precondición vence y Avans eleva una excepción a atención humana.",
    icon: Inbox,
  },
  {
    key: "decision",
    label: "Decisión",
    title: "Continuar cuando llegue el acceso",
    detail: "El responsable confirma la acción y deja motivo para auditoría.",
    icon: ShieldCheck,
  },
  {
    key: "execution",
    label: "Ejecución",
    title: "Workflow reanudado",
    detail: "El guardrail permite reintentar porque la acción es reversible y está autorizada.",
    icon: GitBranch,
  },
  {
    key: "audit",
    label: "Auditoría",
    title: "Resultado registrado",
    detail: "Cliente, proceso, decisión y ejecución quedan vinculados al mismo hilo.",
    icon: Database,
  },
] as const;

export function ConnectedCaseConsole() {
  const { acaCaseStage: stage, note, events, setNote, advanceAcaCase, resetAcaCase } = useDemoState();

  const status = useMemo(() => {
    if (stage <= 2) return "Procesando";
    if (stage === 3) return "Requiere atención";
    if (stage === 4) return "Decisión aprobada";
    if (stage === 5) return "Ejecutando";
    return "Resuelto";
  }, [stage]);



  return (
    <section className={styles.console}>
      <div className={styles.top}>
        <div>
          <span className={styles.eyebrow}>CONNECTED CASE · DEMO INTERACTIVA</span>
          <h2>Un solo hilo operativo, de la reunión al resultado</h2>
          <p>
            Esta vista muestra cómo los módulos dejan de ser islas. Cada objeto conserva el mismo contexto,
            origen y trazabilidad mientras cambia de estado.
          </p>
        </div>
        <span className={styles.status}><CircleAlert size={14}/>{status}</span>
      </div>

      <div className={styles.rail}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const state = index < stage ? "done" : index === stage ? "current" : "next";
          return (
            <div className={`${styles.step} ${styles[state]}`} key={step.key}>
              <div className={styles.stepHead}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {state === "done" ? <CheckCircle2 size={15}/> : <Icon size={15}/>}
              </div>
              <strong>{step.label}</strong>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
              {index < steps.length - 1 && <ArrowRight className={styles.connector} size={14}/>}
            </div>
          );
        })}
      </div>

      <div className={styles.grid}>
        <article className={styles.card}>
          <span className={styles.eyebrow}>HUMAN GATE</span>
          <h3>Resolver la excepción sin perder contexto</h3>
          <label>
            <span>Motivo / instrucción</span>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={3}/>
          </label>
          <div className={styles.actions}>
            <button onClick={advanceAcaCase} disabled={stage >= steps.length - 1}>
              {stage === 3 ? "Aprobar continuación" : stage === 4 ? "Ejecutar dentro de guardrails" : stage === 5 ? "Registrar resultado" : "Avanzar circuito"}
              <ArrowRight size={14}/>
            </button>
            <button className={styles.ghost} onClick={resetAcaCase}><RotateCcw size={14}/> Reiniciar demo</button>
          </div>
          <div className={styles.guardrail}>
            <ShieldCheck size={16}/>
            <div><strong>Guardrail aplicado</strong><small>Reintento permitido sólo si la precondición queda confirmada. No modifica alcance ni datos críticos.</small></div>
          </div>
        </article>

        <article className={styles.card}>
          <span className={styles.eyebrow}>CLIENT IMPACT · ACA</span>
          <h3>Qué cambia en la ficha de cuenta</h3>
          <div className={styles.impact}>
            <div><span>Atención humana</span><strong>{stage >= 6 ? "0" : "1"}</strong></div>
            <div><span>Compromisos abiertos</span><strong>{stage >= 5 ? "2" : "3"}</strong></div>
            <div><span>Proceso</span><strong>{stage >= 5 ? "Activo" : "Esperando"}</strong></div>
            <div><span>Auditoría</span><strong>{stage >= 6 ? "Completa" : "En curso"}</strong></div>
          </div>
          <div className={styles.recommendation}>
            <Sparkles size={15}/>
            <span><strong>Avans recomienda:</strong> cuando el mismo bloqueo se repita, anticipar la solicitud de acceso durante el preflight de onboarding.</span>
          </div>
        </article>

        <article className={styles.card}>
          <span className={styles.eyebrow}>TRACE LOG</span>
          <h3>Eventos del mismo caso</h3>
          <div className={styles.logs}>
            {events.map((event) => <div key={event}><i/><span>{event}</span></div>)}
          </div>
        </article>
      </div>
    </section>
  );
}
