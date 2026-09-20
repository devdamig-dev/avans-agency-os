import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  GitBranch,
  Inbox,
  MessageSquareText,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { ConnectedCaseConsole } from "../../components/connected-case-console";
import { V2Chrome } from "../../components/v2-chrome";
import styles from "./case.module.css";

export default function AcaConnectedCasePage() {
  return (
    <V2Chrome active="inbox" title="ACA · Caso conectado">
      <div className={styles.wrap}>
        <Link href="/v2" className={styles.back}><ArrowLeft size={14}/> Volver al Command Center</Link>

        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>CONNECTED OPERATIONS · ACA</span>
            <h1>Reunión → compromiso → proceso → Inbox → decisión → ejecución → auditoría</h1>
            <p>
              Un ejemplo completo de cómo Avans conecta módulos y conserva el mismo contexto operativo
              desde que aparece una señal hasta que el resultado vuelve a la memoria de la cuenta.
            </p>
          </div>
          <Link href="/v2/clientes/aca" className={styles.clientLink}>Abrir ficha ACA <ArrowRight size={14}/></Link>
        </section>

        <section className={styles.routeMap}>
          <Link href="/v2/objetos/reuniones/aca-seguimiento"><MessageSquareText size={15}/><span><strong>Reunión</strong><small>ACA · Seguimiento</small></span></Link>
          <ArrowRight size={14}/>
          <Link href="/v2/objetos/procesos/seguimiento-de-compromisos"><Workflow size={15}/><span><strong>Proceso</strong><small>Seguimiento de compromisos</small></span></Link>
          <ArrowRight size={14}/>
          <Link href="/v2/objetos/inbox/aca-insumo-pendiente"><Inbox size={15}/><span><strong>Inbox</strong><small>Insumo pendiente</small></span></Link>
          <ArrowRight size={14}/>
          <div><ShieldCheck size={15}/><span><strong>Decisión</strong><small>Continuar al confirmar</small></span></div>
          <ArrowRight size={14}/>
          <div><GitBranch size={15}/><span><strong>Ejecución</strong><small>Reintento controlado</small></span></div>
          <ArrowRight size={14}/>
          <Link href="/v2/objetos/auditoria/recomendacion-aprobada"><Database size={15}/><span><strong>Auditoría</strong><small>Resultado trazado</small></span></Link>
        </section>

        <ConnectedCaseConsole />
      </div>
    </V2Chrome>
  );
}
