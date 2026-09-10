import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, Users } from "lucide-react";
import { agencyModuleConfig, avansClients, type AgencyModuleSlug } from "../agency-client-data";
import styles from "../client-work.module.css";

export function AgencyClientGate({ module }: { module: AgencyModuleSlug }) {
  const config = agencyModuleConfig[module];

  return (
    <div className={styles.gateWrap}>
      <section className={styles.gateHero}>
        <div>
          <span className={styles.eyebrow}>{config.eyebrow}</span>
          <h1>{config.label}</h1>
          <p>{config.description}</p>
        </div>
        <div className={styles.ruleCard}>
          <Users size={18} />
          <div>
            <strong>Primero la cuenta. Después la tarea.</strong>
            <span>Avans carga el contexto del cliente antes de habilitar generación, análisis o reporting.</span>
          </div>
        </div>
      </section>

      <section className={styles.selectionHead}>
        <div>
          <span className={styles.eyebrow}>PASO 1 · SELECCIONAR CLIENTE</span>
          <h2>¿Sobre qué cuenta vas a trabajar?</h2>
        </div>
        <span className={styles.demoPill}>Datos simulados · estructura real</span>
      </section>

      <section className={styles.clientGrid}>
        {avansClients.map((client) => (
          <Link key={client.slug} href={`/v2/clientes/${client.slug}/${module}`} className={styles.clientCard}>
            <div className={styles.clientCardTop}>
              <span className={styles.clientInitial}>{client.name.slice(0, 1)}</span>
              <span className={client.health === "Saludable" ? styles.good : styles.warning}>
                {client.health === "Saludable" ? <CheckCircle2 size={13} /> : <CircleAlert size={13} />}
                {client.health}
              </span>
            </div>
            <h3>{client.name}</h3>
            <div className={styles.clientFacts}>
              <span><strong>{client.context}%</strong> contexto disponible</span>
              <span>{client.attention}</span>
            </div>
            <div className={styles.openClient}>Abrir {config.label.toLowerCase()} <ArrowRight size={14} /></div>
          </Link>
        ))}
      </section>

      <section className={styles.gateFooter}>
        <span className={styles.stepIndex}>02</span>
        <div>
          <strong>Preflight de cuenta</strong>
          <span>Al entrar, Avans muestra qué contexto va a utilizar, qué falta validar y recién después permite iniciar la tarea.</span>
        </div>
        <ArrowRight size={18} />
        <span className={styles.stepIndex}>03</span>
        <div>
          <strong>{config.startAction}</strong>
          <span>La tarea nace vinculada al cliente, sus fuentes, decisiones y memoria desde el primer evento.</span>
        </div>
      </section>
    </div>
  );
}
