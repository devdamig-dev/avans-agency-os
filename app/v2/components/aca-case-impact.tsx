"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Workflow } from "lucide-react";
import { useDemoState } from "./demo-state-provider";
import styles from "./aca-case-impact.module.css";

const labels = [
  "Reunión procesada",
  "Compromiso creado",
  "Proceso iniciado",
  "Requiere atención",
  "Decisión aprobada",
  "Ejecución controlada",
  "Resuelto y auditado",
];

export function AcaCaseImpact() {
  const { acaCaseStage } = useDemoState();
  const resolved = acaCaseStage >= 6;
  const progress = Math.round((acaCaseStage / 6) * 100);

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <div>
          <span>CASO CONECTADO · ACA</span>
          <strong>{labels[acaCaseStage]}</strong>
        </div>
        {resolved ? <CheckCircle2 size={18}/> : <CircleAlert size={18}/>}
      </div>
      <div className={styles.metrics}>
        <div><span>Atención</span><strong>{resolved ? "0" : "1"}</strong></div>
        <div><span>Compromisos</span><strong>{acaCaseStage >= 5 ? "2" : "3"}</strong></div>
        <div><span>Proceso</span><strong>{acaCaseStage >= 5 ? "Activo" : "Esperando"}</strong></div>
      </div>
      <div className={styles.rail}><i style={{ width: progress + "%" }} /></div>
      <Link href="/v2/casos/aca-seguimiento"><Workflow size={14}/> Abrir hilo operativo <ArrowRight size={14}/></Link>
    </div>
  );
}
