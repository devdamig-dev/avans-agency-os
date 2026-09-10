import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { AgencyClientGate } from "../components/agency-client-gate";
import { ModuleDepth } from "../components/module-depth";
import { V2Chrome } from "../components/v2-chrome";
import { v2NavItems } from "../navigation";
import { sectionData } from "../section-data";
import { avansClients, type AgencyModuleSlug } from "../agency-client-data";
import styles from "../v2.module.css";

const clientScopedAgencyModules = new Set<AgencyModuleSlug>(["contenido", "campanas", "reportes"]);

export function generateStaticParams() {
  return v2NavItems
    .filter((item) => item.slug !== "command-center")
    .map((item) => ({ section: item.slug }));
}

export default async function V2SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const navItem = v2NavItems.find((item) => item.slug === section);
  const data = sectionData[section];

  if (!navItem || !data) notFound();

  if (clientScopedAgencyModules.has(section as AgencyModuleSlug)) {
    return (
      <V2Chrome active={section} title={navItem.label}>
        <AgencyClientGate module={section as AgencyModuleSlug} />
      </V2Chrome>
    );
  }

  return (
    <V2Chrome active={section} title={navItem.label}>
      <div className={styles.content}>
        <section className={styles.moduleHero}>
          <div>
            <span className={styles.eyebrow}>{data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
          <button className={styles.primaryAction}>
            {data.action}
            <ArrowRight size={15} />
          </button>
        </section>

        <section className={styles.moduleStats}>
          {data.metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.detail}</small>
            </article>
          ))}
        </section>

        <section className={styles.moduleGrid}>
          <article className={styles.modulePanel}>
            <div className={styles.panelHead}>
              <div>
                <span className={styles.eyebrow}>VISTA OPERATIVA · DEMO</span>
                <h2>{data.title}</h2>
              </div>
              <span className={styles.demoPill}>Datos simulados</span>
            </div>

            <div className={styles.moduleRows}>
              {data.rows.map((row) => {
                const client = section === "clientes" ? avansClients.find((item) => item.name === row.title) : null;
                const content = (
                  <>
                    <div>
                      <span className={styles.rowMeta}>{row.meta}</span>
                      <h3>{row.title}</h3>
                      <p>{row.detail}</p>
                    </div>
                    <div className={styles.rowSide}>
                      <span>{row.status}</span>
                      <ArrowRight size={15} />
                    </div>
                  </>
                );

                return client ? (
                  <Link key={row.title} href={`/v2/clientes/${client.slug}`} className={styles.moduleRow}>
                    {content}
                  </Link>
                ) : (
                  <button key={row.title} className={styles.moduleRow}>
                    {content}
                  </button>
                );
              })}
            </div>
          </article>

          <aside className={styles.contextPanel}>
            <Sparkles size={20} />
            <span className={styles.eyebrow}>CÓMO LO PIENSA AVANS</span>
            <h2>{data.sideTitle}</h2>
            <div className={styles.contextList}>
              {data.sideItems.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <ModuleDepth section={section} />
      </div>
    </V2Chrome>
  );
}
