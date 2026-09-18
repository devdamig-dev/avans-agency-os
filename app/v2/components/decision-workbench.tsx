"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, RotateCcw, Send, ShieldCheck } from "lucide-react";
import styles from "../object-detail.module.css";

export function DecisionWorkbench({
  title,
  initialStatus,
  actions,
  reversible,
}: {
  title: string;
  initialStatus: string;
  actions: string[];
  reversible: boolean;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState("");
  const [history, setHistory] = useState<{ action: string; note: string; time: string }[]>([]);

  const tone = useMemo(() => {
    const value = status.toLowerCase();
    if (value.includes("rechaz") || value.includes("bloque") || value.includes("paus")) return "warning";
    if (value.includes("aprob") || value.includes("resuelto") || value.includes("cerr") || value.includes("valid")) return "ok";
    return "pending";
  }, [status]);

  function applyAction(action: string) {
    const next =
      action.includes("Aprobar") ? "Aprobado" :
      action.includes("Validar") ? "Validado" :
      action.includes("Resolver") ? "Resuelto" :
      action.includes("Cerrar") ? "Cerrado" :
      action.includes("Rechazar") || action.includes("Descartar") ? "Rechazado" :
      action.includes("Pausar") || action.includes("Mantener bloqueo") ? "Pausado" :
      action.includes("Escalar") || action.includes("incidente") ? "Escalado" :
      action.includes("Reintentar") ? "Reintentando" :
      action.includes("Rollback") ? "Rollback solicitado" :
      action.includes("Ejecutar") || action.includes("Aplicar") || action.includes("Convertir") ? "En ejecución" :
      "Actualizado";

    setStatus(next);
    setHistory((current) => [
      { action, note: note.trim() || "Sin comentario adicional.", time: new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) },
      ...current,
    ]);
    setNote("");
  }

  return (
    <article className={styles.workbench}>
      <div className={styles.panelHead}>
        <div>
          <span className={styles.eyebrow}>DECISION WORKBENCH · DEMO INTERACTIVA</span>
          <h2>Resolver este objeto</h2>
        </div>
        <span className={`${styles.liveStatus} ${styles[tone]}`}>
          {tone === "ok" ? <CheckCircle2 size={14} /> : <CircleAlert size={14} />}
          {status}
        </span>
      </div>

      <p className={styles.workbenchIntro}>
        Las acciones de esta preview sólo cambian el estado local de la interfaz. En producción quedarían persistidas con usuario, timestamp, comentario, autorización y evidencia.
      </p>

      <label className={styles.noteField}>
        <span>Comentario / motivo</span>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={`Dejá contexto para la decisión sobre “${title}”…`}
          rows={3}
        />
      </label>

      <div className={styles.actionGrid}>
        {actions.map((action) => (
          <button key={action} onClick={() => applyAction(action)} type="button">
            <Send size={14} />
            {action}
          </button>
        ))}
        {reversible && (
          <button className={styles.secondaryAction} onClick={() => applyAction("Rollback demo")} type="button">
            <RotateCcw size={14} />
            Rollback demo
          </button>
        )}
      </div>

      <div className={styles.auditMini}>
        <div className={styles.auditTitle}>
          <ShieldCheck size={15} />
          <strong>Trazabilidad de esta sesión</strong>
        </div>
        {history.length === 0 ? (
          <p>Todavía no hiciste ninguna acción en esta preview.</p>
        ) : (
          history.map((item, index) => (
            <div className={styles.auditRow} key={`${item.time}-${item.action}-${index}`}>
              <time>{item.time}</time>
              <div>
                <strong>{item.action}</strong>
                <small>{item.note}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
