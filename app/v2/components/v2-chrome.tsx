import Link from "next/link";
import {
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  ClipboardCheck,
  FileChartColumn,
  FileText,
  FolderKanban,
  Gauge,
  Inbox,
  Lightbulb,
  Megaphone,
  MessagesSquare,
  Network,
  Search,
  Settings2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { AvansLogo } from "../../components/avans-logo";
import { v2NavGroups } from "../navigation";
import styles from "../v2.module.css";

const iconMap: Record<string, React.ElementType> = {
  "command-center": Gauge,
  inbox: Inbox,
  clientes: Users,
  procesos: Network,
  proyectos: FolderKanban,
  reuniones: MessagesSquare,
  insights: ChartNoAxesCombined,
  oportunidades: BriefcaseBusiness,
  aprendizajes: Lightbulb,
  leads: Search,
  discovery: ClipboardCheck,
  propuestas: FileText,
  contenido: FileText,
  campanas: Megaphone,
  reportes: FileChartColumn,
  integraciones: Settings2,
  agentes: Bot,
  workflows: Workflow,
  guardrails: ShieldCheck,
  auditoria: BrainCircuit,
};

export function V2Chrome({
  active,
  title,
  children,
}: {
  active: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <Link href="/v2" aria-label="Ir al Command Center">
            <AvansLogo variant="compact" />
          </Link>
          <span className={styles.productName}>Intelligence Core</span>
        </div>

        <div className={styles.workspace}>
          <span className={styles.mark}>A</span>
          <div>
            <strong>Avans Agency</strong>
            <small>Workspace · V2</small>
          </div>
        </div>

        <nav className={styles.nav}>
          {v2NavGroups.map(({ group, items }) => (
            <div key={group} className={styles.navGroup}>
              <span>{group}</span>
              {items.map((item) => {
                const Icon = iconMap[item.slug];
                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={active === item.slug ? styles.activeNav : ""}
                  >
                    {Icon ? <Icon size={15} /> : <span className={styles.dot} />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={styles.guardrail}>
          <ShieldCheck size={17} />
          <div>
            <strong>Autonomía controlada</strong>
            <small>Las acciones sensibles requieren validación.</small>
          </div>
        </div>
      </aside>

      <section className={styles.workspaceMain}>
        <header className={styles.topbar}>
          <div>
            <span>Avans /</span>
            <strong>{title}</strong>
          </div>
          <div className={styles.topStatus}>
            <span className={styles.liveDot} />
            Intelligence Loop activo
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
