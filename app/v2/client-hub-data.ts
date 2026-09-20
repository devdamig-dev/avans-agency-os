export type ClientHubSnapshot = {
  accountOwner: string;
  services: { name: string; type: string; state: string; cadence: string; next: string }[];
  processes: { name: string; state: string; owner: string; next: string; automation: string }[];
  projects: { name: string; progress: number; risk: string; nextMilestone: string }[];
  meetings: { title: string; when: string; commitments: number; state: string }[];
  decisions: { title: string; source: string; state: string; time: string }[];
  signals: { title: string; detail: string; tone: "attention" | "ok" | "info" }[];
  sources: { name: string; type: string; freshness: string; state: string }[];
  learnings: { title: string; source: string; state: string }[];
  activity: { time: string; actor: string; action: string }[];
};

const commonSources = [
  { name: "Google Workspace", type: "Documentos y reuniones", freshness: "Hoy", state: "Conectado" },
  { name: "Decision Memory", type: "Decisiones y feedback", freshness: "Tiempo real", state: "Activo" },
];

export const clientHubData: Record<string, ClientHubSnapshot> = {
  epsa: {
    accountOwner: "Account Lead · Avans",
    services: [
      { name: "Automatización operativa", type: "Automation IA", state: "Activo", cadence: "Continuo", next: "Revisión de excepciones" },
      { name: "Contenido", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Planificación próximo ciclo" },
      { name: "Reporting", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Cierre de período" },
    ],
    processes: [
      { name: "Seguimiento de consultas", state: "Activo", owner: "Automation Ops", next: "Monitorear excepciones", automation: "72%" },
      { name: "Derivación de reclamos", state: "Activo", owner: "Account + Ops", next: "Validar escalamiento", automation: "61%" },
      { name: "Cierre mensual", state: "En curso", owner: "Reporting", next: "Cerrar fuentes", automation: "48%" },
    ],
    projects: [
      { name: "Optimización flujo de atención", progress: 76, risk: "Bajo", nextMilestone: "Piloto ampliado" },
      { name: "Capa de reporting", progress: 58, risk: "Medio", nextMilestone: "Validación de fuentes" },
    ],
    meetings: [
      { title: "Seguimiento operativo", when: "Hoy · 10:00", commitments: 3, state: "Procesada" },
      { title: "Revisión mensual", when: "Hace 8 días", commitments: 2, state: "Cerrada" },
    ],
    decisions: [
      { title: "Mantener escalamiento humano en reclamos sensibles", source: "Reunión", state: "Aplicada", time: "Hoy" },
      { title: "Actualizar criterio de respuesta de seguimiento", source: "Feedback", state: "Validada", time: "Ayer" },
      { title: "No ampliar autonomía hasta medir 2 ciclos más", source: "Guardrail", state: "Activa", time: "3 días" },
    ],
    signals: [
      { title: "1 excepción requiere atención", detail: "Un caso superó el umbral de derivación automática.", tone: "attention" },
      { title: "Contexto actualizado", detail: "La última reunión aportó un criterio operativo validado.", tone: "ok" },
      { title: "Automatización estable", detail: "Sin errores críticos en las últimas ejecuciones simuladas.", tone: "info" },
    ],
    sources: [
      ...commonSources,
      { name: "CRM / atención", type: "Consultas y estados", freshness: "Hoy", state: "Conectado" },
      { name: "Base operativa", type: "Casos y derivaciones", freshness: "Hoy", state: "Conectado" },
    ],
    learnings: [
      { title: "Derivar antes los reclamos con señales de incidencia", source: "Resultados + feedback", state: "Activo" },
      { title: "Evitar pedir nuevamente datos ya confirmados", source: "Correcciones", state: "Activo" },
      { title: "Nueva regla de seguimiento", source: "Reunión", state: "Validar" },
    ],
    activity: [
      { time: "10:42", actor: "Meeting Intelligence", action: "Propuso actualización de contexto." },
      { time: "10:18", actor: "Process Engine", action: "Escaló una excepción al responsable." },
      { time: "09:54", actor: "Reporting Agent", action: "Cerró 3 de 4 fuentes del período." },
    ],
  },
  aca: {
    accountOwner: "Account Lead · Avans",
    services: [
      { name: "Campañas", type: "Agency Pack", state: "Activo", cadence: "Continuo", next: "Resolver 1 señal" },
      { name: "Contenido", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Aprobación de enfoque" },
      { name: "Automatización de reporting", type: "Automation IA", state: "Activo", cadence: "Mensual", next: "Validar dependencia" },
    ],
    processes: [
      { name: "Monitoreo por excepción", state: "Atención", owner: "Performance", next: "Revisar señal", automation: "64%" },
      { name: "Aprobación de contenido", state: "Activo", owner: "Account", next: "Esperar feedback", automation: "42%" },
      { name: "Reporte mensual", state: "Bloqueado", owner: "Reporting", next: "Resolver acceso", automation: "38%" },
    ],
    projects: [
      { name: "Integración de datos", progress: 63, risk: "Medio", nextMilestone: "Resolver acceso pendiente" },
      { name: "Modelo de campañas asistidas", progress: 49, risk: "Medio", nextMilestone: "Validar guardrails" },
    ],
    meetings: [
      { title: "Seguimiento de cuenta", when: "Hoy · 09:30", commitments: 3, state: "Revisar" },
      { title: "Performance", when: "Hace 5 días", commitments: 4, state: "Cerrada" },
    ],
    decisions: [
      { title: "No ejecutar cambios de presupuesto sin aprobación", source: "Guardrail", state: "Activa", time: "Hoy" },
      { title: "Priorizar calidad sobre volumen en la próxima prueba", source: "Reunión", state: "Validada", time: "Ayer" },
      { title: "Escalar acceso de fuente faltante", source: "Proyecto", state: "Pendiente", time: "2 días" },
    ],
    signals: [
      { title: "Dependencia bloqueando reporting", detail: "Una fuente todavía no puede cerrar el período.", tone: "attention" },
      { title: "2 recomendaciones pendientes", detail: "Campañas tiene decisiones esperando especialista.", tone: "attention" },
      { title: "Memoria de cuenta saludable", detail: "Objetivos, tono y restricciones están disponibles.", tone: "ok" },
    ],
    sources: [
      ...commonSources,
      { name: "Meta Ads", type: "Performance", freshness: "Hace 2 h", state: "Conectado" },
      { name: "Fuente de conversión", type: "Resultados", freshness: "Pendiente", state: "Revisar" },
    ],
    learnings: [
      { title: "Validar ventanas comparables antes de explicar un desvío", source: "Campaign Intelligence", state: "Activo" },
      { title: "Reducir el peso de tendencias sin evidencia interna", source: "Feedback", state: "Activo" },
    ],
    activity: [
      { time: "10:36", actor: "Campaign Intelligence", action: "Detectó un desvío para revisión." },
      { time: "10:05", actor: "Workflow Engine", action: "Marcó una dependencia como bloqueante." },
      { time: "09:41", actor: "Meeting Intelligence", action: "Extrajo 3 compromisos." },
    ],
  },
  "grupo-portland": {
    accountOwner: "Account Lead · Avans",
    services: [
      { name: "Contenido", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Aprobación de piezas" },
      { name: "Campañas", type: "Agency Pack", state: "Activo", cadence: "Continuo", next: "Medición posterior" },
      { name: "Opportunity Intelligence", type: "Automation IA", state: "Piloto", cadence: "Semanal", next: "Validar oportunidad" },
    ],
    processes: [
      { name: "Planificación de contenido", state: "Activo", owner: "Content", next: "Cerrar variantes", automation: "55%" },
      { name: "Optimización de campañas", state: "Activo", owner: "Performance", next: "Medir cambio", automation: "62%" },
      { name: "Detección de oportunidades", state: "Piloto", owner: "Strategy", next: "Priorizar señal", automation: "31%" },
    ],
    projects: [
      { name: "Opportunity Intelligence piloto", progress: 44, risk: "Bajo", nextMilestone: "Validar score" },
      { name: "Sistema de contenido", progress: 82, risk: "Bajo", nextMilestone: "Cierre de ciclo" },
    ],
    meetings: [
      { title: "Kickoff de inteligencia", when: "Hace 2 días", commitments: 4, state: "Procesada" },
      { title: "Revisión creativa", when: "Hace 6 días", commitments: 2, state: "Cerrada" },
    ],
    decisions: [
      { title: "Priorizar oportunidad comercial detectada", source: "Opportunity Intelligence", state: "Revisión", time: "Hoy" },
      { title: "Mantener variante creativa B como referencia", source: "Contenido", state: "Aplicada", time: "Ayer" },
    ],
    signals: [
      { title: "1 oportunidad de alta relevancia", detail: "Cruce de contexto y señal externa listo para validar.", tone: "attention" },
      { title: "Campaña en medición", detail: "Cambio ejecutado dentro de guardrails.", tone: "info" },
      { title: "Contenido alineado", detail: "Últimas correcciones no generan un nuevo patrón.", tone: "ok" },
    ],
    sources: [
      ...commonSources,
      { name: "Meta Ads", type: "Performance", freshness: "Hace 1 h", state: "Conectado" },
      { name: "Market signals", type: "Mercado y referencias", freshness: "Hoy", state: "Conectado" },
    ],
    learnings: [
      { title: "Las piezas con evidencia concreta reducen correcciones", source: "Contenido", state: "Activo" },
      { title: "Ajustar score de oportunidad por timing", source: "Opportunity Intelligence", state: "Validar" },
    ],
    activity: [
      { time: "10:31", actor: "Opportunity Intelligence", action: "Elevó una oportunidad para revisión." },
      { time: "09:58", actor: "Campaign Intelligence", action: "Inició ventana de medición posterior." },
      { time: "09:12", actor: "Content Engine", action: "Preparó 3 variantes de enfoque." },
    ],
  },
  edinovo: {
    accountOwner: "Account Lead · Avans",
    services: [
      { name: "Contenido", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Cerrar planificación" },
      { name: "Reporting", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Interpretar resultados" },
      { name: "Meeting Intelligence", type: "Automation IA", state: "Activo", cadence: "Por reunión", next: "Sin pendientes" },
    ],
    processes: [
      { name: "Planificación editorial", state: "Activo", owner: "Content", next: "Validar ejes", automation: "53%" },
      { name: "Revisión mensual", state: "Activo", owner: "Reporting", next: "Generar borrador", automation: "57%" },
      { name: "Compromisos de reuniones", state: "Activo", owner: "Account", next: "Seguimiento normal", automation: "69%" },
    ],
    projects: [
      { name: "Optimización de memoria de cuenta", progress: 71, risk: "Bajo", nextMilestone: "Validar 2 aprendizajes" },
    ],
    meetings: [
      { title: "Revisión mensual", when: "Ayer · 15:00", commitments: 2, state: "Completa" },
      { title: "Planificación", when: "Hace 9 días", commitments: 3, state: "Cerrada" },
    ],
    decisions: [
      { title: "Incorporar nuevo criterio editorial", source: "Feedback", state: "Validar", time: "Hoy" },
      { title: "Mantener frecuencia del próximo ciclo", source: "Reporting", state: "Aplicada", time: "Ayer" },
    ],
    signals: [
      { title: "2 aprendizajes candidatos", detail: "Patrones recurrentes aún no aplicados a memoria.", tone: "attention" },
      { title: "Reuniones sin vencimientos", detail: "Todos los compromisos del último ciclo están al día.", tone: "ok" },
    ],
    sources: [
      ...commonSources,
      { name: "Content history", type: "Piezas y performance", freshness: "Hoy", state: "Conectado" },
      { name: "Reporting layer", type: "Métricas normalizadas", freshness: "Hoy", state: "Conectado" },
    ],
    learnings: [
      { title: "Priorizar explicaciones más sintéticas", source: "Feedback cliente", state: "Validar" },
      { title: "Conservar estructura de cierre aprobada", source: "Contenido", state: "Activo" },
      { title: "No sobreponderar un único período", source: "Reporting", state: "Activo" },
    ],
    activity: [
      { time: "10:12", actor: "Learning Engine", action: "Creó 2 aprendizajes candidatos." },
      { time: "09:47", actor: "Reporting Agent", action: "Preparó interpretación preliminar." },
      { time: "Ayer", actor: "Meeting Intelligence", action: "Cerró 2 compromisos." },
    ],
  },
  "lider-energy": {
    accountOwner: "Account Lead · Avans",
    services: [
      { name: "Automatización operativa", type: "Automation IA", state: "Implementación", cadence: "Continuo", next: "Resolver 2 precondiciones" },
      { name: "Contenido", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Definir próximo ciclo" },
      { name: "Reporting", type: "Agency Pack", state: "Activo", cadence: "Mensual", next: "Cerrar fuente" },
    ],
    processes: [
      { name: "Alta inteligente", state: "Atención", owner: "Automation Ops", next: "Resolver acceso", automation: "37%" },
      { name: "Contenido mensual", state: "Activo", owner: "Content", next: "Preparar brief", automation: "46%" },
      { name: "Cierre de reporting", state: "Atención", owner: "Reporting", next: "Completar fuente", automation: "41%" },
    ],
    projects: [
      { name: "Activación Automation IA", progress: 39, risk: "Medio", nextMilestone: "Piloto controlado" },
      { name: "Integración de fuentes", progress: 52, risk: "Medio", nextMilestone: "Validar acceso" },
    ],
    meetings: [
      { title: "Activación", when: "Hoy · 11:30", commitments: 5, state: "Procesada" },
      { title: "Revisión de accesos", when: "Hace 3 días", commitments: 3, state: "Revisar" },
    ],
    decisions: [
      { title: "No iniciar piloto hasta cerrar precondiciones", source: "Process Engine", state: "Activa", time: "Hoy" },
      { title: "Mantener operación manual como fallback", source: "Guardrail", state: "Activa", time: "Ayer" },
    ],
    signals: [
      { title: "3 pendientes de activación", detail: "Dos accesos y una validación bloquean la siguiente etapa.", tone: "attention" },
      { title: "Fallback disponible", detail: "La operación puede continuar manualmente sin interrumpir servicio.", tone: "info" },
    ],
    sources: [
      ...commonSources,
      { name: "Fuente operativa", type: "Datos de proceso", freshness: "Parcial", state: "Revisar" },
      { name: "Reporting layer", type: "Métricas", freshness: "Hoy", state: "Conectado" },
    ],
    learnings: [
      { title: "Verificar accesos antes de activar cualquier workflow", source: "Implementación", state: "Activo" },
      { title: "Agregar preflight de datos críticos", source: "Process Engine", state: "Validar" },
    ],
    activity: [
      { time: "10:45", actor: "Process Engine", action: "Bloqueó inicio de piloto por precondición." },
      { time: "10:22", actor: "Meeting Intelligence", action: "Registró 5 compromisos." },
      { time: "09:30", actor: "Integration Layer", action: "Marcó una fuente como parcial." },
    ],
  },
};
