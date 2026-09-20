"use client";

import Link from "next/link";
import { ArrowRight, GitBranch, Inbox, MessageSquareText, ShieldCheck, Workflow } from "lucide-react";
import { useDemoState } from "./demo-state-provider";
import styles from "./connected-flow-banner.module.css";

export function ConnectedFlowBanner({ section }: { section: string }) {
  const { acaCaseStage } = useDemoState();
  if (!["inbox","procesos","reuniones","auditoria"].includes(section)) return null;
  const status = acaCaseStage >= 6 ? "Resuelto y auditado" : acaCaseStage >= 5 ? "Ejecución controlada" : acaCaseStage >= 4 ? "Decisión aprobada" : "Requiere atención";

  return (
    <section className={styles.banner}>
      <div className={styles.icon}><GitBranch size={18}/></div>
      <div className={styles.copy}>
        <span>CONNECTED OPERATIONS · CASO ACA</span>
        <strong>Seguí un mismo caso entre Reuniones, Procesos, Inbox, Decisiones, Ejecución y Auditoría.</strong><small>{status}</small>
      </div>
      <div className={styles.steps} aria-hidden="true">
        <MessageSquareText size={14}/><ArrowRight size={12}/><Workflow size={14}/><ArrowRight size={12}/><Inbox size={14}/><ArrowRight size={12}/><ShieldCheck size={14}/>
      </div>
      <Link href="/v2/casos/aca-seguimiento">Abrir circuito <ArrowRight size={14}/></Link>
    </section>
  );
}
