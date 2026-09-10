import type { AgencyModuleSlug } from "../agency-client-data";
import styles from "./agency-depth.module.css";

const moduleDetails: Record<AgencyModuleSlug, {
  brief: { label: string; value: string }[];
  decisions: { title: string; detail: string; status: string }[];
  lanes: { label: string; title: string; detail: string }[];
  history: { time: string; title: string; detail: string; status: string }[];
}> = {
  contenido: {
    brief: [
      { label: "Objetivo del ciclo", value: "Construir planificación alineada a objetivos y memoria validada de la cuenta." },
      { label: "Fuente principal", value: "Brief + piezas aprobadas + performance histórica + feedback reciente." },
      { label: "Criterio IA", value: "No repetir ángulos saturados y explicar por qué propone cada territorio o formato." },
      { label: "Control humano", value: "Validación de enfoque, claims sensibles, creatividad final y publicación." },
    ],
    decisions: [
      { title: "Territorios temáticos", detail: "La IA propone ejes y justifica cada uno contra objetivos, histórico y saturación.", status: "Revisar" },
      { title: "Selección de formatos", detail: "Prioriza formatos por canal, objetivo y performance previa; no por tendencia aislada.", status: "Asistido" },
      { title: "Aprendizajes de corrección", detail: "Cambios recurrentes pasan a memoria sólo después de validación humana.", status: "Validar" },
    ],
    lanes: [
      { label: "Planificación", title: "Qué producir", detail: "Territorios, ángulos, formatos, frecuencia y objetivo de cada pieza." },
      { label: "Producción", title: "Cómo producirlo", detail: "Copy, visual, video, variantes y referencias de cuenta." },
      { label: "Aprobación", title: "Qué sale", detail: "Revisión interna, feedback cliente, versión final y trazabilidad." },
    ],
    history: [
      { time: "Hoy 10:20", title: "Plan del próximo ciclo preparado", detail: "Se cruzaron contexto, piezas aprobadas y señales recientes.", status: "Borrador" },
      { time: "Ayer 16:40", title: "Feedback incorporado", detail: "Una corrección recurrente quedó propuesta como aprendizaje, aún sin aplicar.", status: "Validar" },
      { time: "Ayer 12:15", title: "Pieza derivada a revisión", detail: "El output superó controles automáticos y pasó a criterio humano.", status: "Revisión" },
    ],
  },
  campanas: {
    brief: [
      { label: "Objetivo de negocio", value: "Interpretar performance contra KPI, histórico y contexto comercial de la cuenta." },
      { label: "Fuentes", value: "Meta Ads / Google Ads / conversiones / CRM según integraciones disponibles." },
      { label: "Criterio IA", value: "Las reglas detectan la anomalía; la IA interpreta causas probables y propone acciones." },
      { label: "Control humano", value: "Presupuesto, puja, pausas relevantes y cambios fuera de guardrails." },
    ],
    decisions: [
      { title: "Desvío detectado", detail: "La señal debe mostrar qué cambió, desde cuándo y contra qué referencia.", status: "Explicable" },
      { title: "Recomendación", detail: "Cada acción sugerida conserva evidencia, impacto esperado y nivel de confianza.", status: "Pendiente" },
      { title: "Ejecución", detail: "Sólo se habilita si la acción está aprobada y dentro de límites configurados.", status: "Controlada" },
    ],
    lanes: [
      { label: "Observar", title: "Monitoreo por excepción", detail: "El sistema revisa todo y sólo eleva aquello que requiere criterio." },
      { label: "Decidir", title: "Recomendación asistida", detail: "Explica causa, impacto y posibles acciones antes de modificar nada." },
      { label: "Ejecutar", title: "Cambio con guardrails", detail: "Autorización, before/after, rollback cuando aplica y seguimiento posterior." },
    ],
    history: [
      { time: "Hoy 09:35", title: "Anomalía de CPL detectada", detail: "La regla comparó 7 días contra histórico equivalente.", status: "Revisar" },
      { time: "Ayer 18:10", title: "Cambio aprobado ejecutado", detail: "Presupuesto ajustado dentro del umbral permitido y registrado.", status: "Midiendo" },
      { time: "Ayer 11:25", title: "Recomendación descartada", detail: "El especialista rechazó la hipótesis y dejó el motivo para aprendizaje.", status: "Registrado" },
    ],
  },
  reportes: {
    brief: [
      { label: "Objetivo del reporte", value: "Explicar resultados y decisiones, no sólo trasladar métricas de una plataforma." },
      { label: "Fuentes", value: "Plataformas conectadas + histórico propio + incidencias + decisiones del período." },
      { label: "Criterio IA", value: "Priorizar variaciones relevantes y separar evidencia de interpretación." },
      { label: "Control humano", value: "Validación de narrativa, conclusiones sensibles y versión final entregable." },
    ],
    decisions: [
      { title: "Consistencia de datos", detail: "No generar narrativa si faltan fuentes críticas o el período no está cerrado.", status: "Control previo" },
      { title: "Insight sugerido", detail: "La IA debe citar la señal que origina cada conclusión y marcar nivel de confianza.", status: "Revisión" },
      { title: "Versión cliente", detail: "Se genera después de validación interna y conserva historial de cambios.", status: "Aprobación" },
    ],
    lanes: [
      { label: "Datos", title: "Cerrar el período", detail: "Fuentes, normalización, faltantes y consistencia histórica." },
      { label: "Análisis", title: "Explicar qué pasó", detail: "Variaciones, causas probables, decisiones e incidencias relevantes." },
      { label: "Entrega", title: "Contar qué hacer", detail: "Resumen ejecutivo, aprendizajes, recomendaciones y próximos pasos." },
    ],
    history: [
      { time: "Hoy 08:50", title: "Fuentes consolidadas", detail: "El período quedó listo para interpretación luego del chequeo de consistencia.", status: "Listo" },
      { time: "Ayer 17:30", title: "Insight agregado", detail: "Se vinculó una variación de performance con una decisión registrada.", status: "Revisar" },
      { time: "Ayer 13:05", title: "Reporte entregado", detail: "La versión cliente quedó archivada junto al feedback posterior.", status: "Cerrado" },
    ],
  },
};

export function AgencyDepth({ clientName, module }: { clientName: string; module: AgencyModuleSlug }) {
  const data = moduleDetails[module];

  return (
    <section className={styles.wrap}>
      <div className={styles.grid}>
        <article className={styles.panel}>
          <span className={styles.eyebrow}>BRIEF OPERATIVO · {clientName.toUpperCase()}</span>
          <h2>Qué debe saber Avans antes de actuar</h2>
          <div className={styles.brief}>
            {data.brief.map((item) => (
              <div className={styles.briefItem} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel}>
          <span className={styles.eyebrow}>DECISION CENTER</span>
          <h2>Decisiones abiertas del módulo</h2>
          <div className={styles.decisionList}>
            {data.decisions.map((item) => (
              <div className={styles.decision} key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>
                <em>{item.status}</em>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className={styles.panel}>
        <span className={styles.eyebrow}>CAPAS DE TRABAJO</span>
        <h2>Cómo se reparte la operación</h2>
        <div className={styles.lanes}>
          {data.lanes.map((lane) => (
            <div className={styles.lane} key={lane.label}>
              <span>{lane.label}</span>
              <strong>{lane.title}</strong>
              <small>{lane.detail}</small>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.panel}>
        <span className={styles.eyebrow}>TRAZABILIDAD · DEMO</span>
        <h2>Actividad reciente de {clientName}</h2>
        <div className={styles.history}>
          {data.history.map((item) => (
            <div className={styles.historyRow} key={item.time + item.title}>
              <time>{item.time}</time>
              <div>
                <strong>{item.title}</strong>
                <small>{item.detail}</small>
              </div>
              <em>{item.status}</em>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
