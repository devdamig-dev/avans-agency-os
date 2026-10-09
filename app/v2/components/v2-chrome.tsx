import Link from "next/link";
import {
  Activity,
  BrainCircuit,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  FileChartColumn,
  Gauge,
  Inbox,
  Network,
  Settings2,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { AvansLogo } from "../../components/avans-logo";
import { v2NavGroups, v2ParentBySlug } from "../navigation";
import { ThemeToggle } from "./theme-toggle";
import styles from "../v2.module.css";

const iconMap: Record<string, React.ElementType> = {
  "command-center": Gauge,
  inbox: Inbox,
  clientes: Users,
  operaciones: Network,
  ventas: BriefcaseBusiness,
  finanzas: FileChartColumn,
  rrhh: Users,
  gerencia: ChartNoAxesCombined,
  usuarios: Settings2,
  integraciones: Settings2,
  automatizaciones: Workflow,
  seguridad: ShieldCheck,
  auditoria: BrainCircuit,
  "salud-sistema": Activity,
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
  const activeNav = v2ParentBySlug[active] ?? active;

  return (
    <main className={`${styles.shell} avans-v2-shell`}>
      <aside className={`${styles.sidebar} avans-v2-sidebar`}>
        <div className={styles.brand}>
          <Link href="/v2" aria-label="Ir al Command Center">
            <AvansLogo variant="compact" />
          </Link>
          <span className={styles.productName}>OS</span>
        </div>

        <div className={styles.workspace}>
          <span className={styles.mark}>↗</span>
          <div>
            <strong>Avans Agency</strong>
            <small>Sistema operativo interno</small>
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
                    className={activeNav === item.slug ? styles.activeNav : ""}
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
            <strong>Acceso corporativo</strong>
            <small>Google Workspace · @avans.agency</small>
          </div>
        </div>
      </aside>

      <section className={`${styles.workspaceMain} avans-v2-main`}>
        <header className={`${styles.topbar} avans-v2-topbar`}>
          <div>
            <span>Avans OS /</span>
            <strong>{title}</strong>
          </div>
          <div className={styles.topStatus}>
            <span className={styles.liveDot} />
            <Link href="/v2/estado-producto" title="Ver estado real del producto">
              Preview · estado del producto
            </Link>
            <ThemeToggle />
          </div>
        </header>
        {children}
      </section>
    </main>
  );
}
