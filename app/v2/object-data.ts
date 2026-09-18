import { moduleDepthData } from "./module-depth-data";
import { sectionData } from "./section-data";

export type OperationalObject = {
  section: string;
  slug: string;
  title: string;
  client: string | null;
  kind: string;
  status: string;
  priority: "Crítica" | "Alta" | "Media" | "Normal";
  owner: string;
  source: string;
  due: string;
  summary: string;
  why: string;
  recommendation: string;
  confidence: string;
  guardrail: string;
  reversible: boolean;
  evidence: string[];
  flow: string[];
  actions: string[];
  timeline: { time: string; title: string; detail: string }[];
};

const excludedSections = new Set(["clientes", "contenido", "campanas", "reportes"]);

const profiles: Record<string, {
  kind: string;
  owner: string;
  source: string;
  why: string;
  recommendation: string;
  guardrail: string;
  reversible: boolean;
  actions: string[];
  evidence: string[];
}> = {
  inbox: {
    kind: "Atención humana",
    owner: "Responsable de cuenta",
    source: "Intelligent Inbox",
    why: "La señal superó el umbral definido y necesita criterio antes de continuar.",
    recommendation: "Resolver la excepción, dejar motivo y permitir que Avans registre el resultado para futuras ejecuciones.",
    guardrail: "No ejecutar cambios sensibles sin una decisión humana explícita.",
    reversible: true,
    actions: ["Aprobar", "Pedir ajuste", "Escalar", "Rechazar"],
    evidence: ["Prioridad calculada por impacto y urgencia", "Dependencias relacionadas identificadas", "Contexto de cuenta disponible"],
  },
  procesos: {
    kind: "Instancia de proceso",
    owner: "Operations",
    source: "Process Engine",
    why: "El proceso mantiene estado, reglas, precondiciones y responsables para evitar seguimiento manual disperso.",
    recommendation: "Resolver la condición actual y conservar el motivo de cualquier excepción antes de reanudar el flujo.",
    guardrail: "Los cambios de regla requieren validación antes de afectar nuevas ejecuciones.",
    reversible: true,
    actions: ["Resolver", "Reintentar", "Escalar", "Pausar"],
    evidence: ["Precondiciones evaluadas", "Reglas de negocio versionadas", "SLA y dependencias registradas"],
  },
  proyectos: {
    kind: "Riesgo operativo",
    owner: "Project Manager",
    source: "Projects + Process Engine",
    why: "Hay una señal que puede afectar un hito, dependencia o compromiso del proyecto.",
    recommendation: "Confirmar responsable y próxima acción antes de aceptar un desplazamiento de fecha o alcance.",
    guardrail: "Avans no modifica alcance, presupuesto o fecha comprometida de forma autónoma.",
    reversible: true,
    actions: ["Asignar acción", "Aceptar riesgo", "Escalar", "Cerrar"],
    evidence: ["Hitos y fechas vinculados", "Dependencias abiertas", "Historial de cambios del proyecto"],
  },
  reuniones: {
    kind: "Reunión procesada",
    owner: "Account / PM",
    source: "Meeting Intelligence",
    why: "La conversación generó decisiones, compromisos o cambios de contexto que deben quedar trazables.",
    recommendation: "Validar los compromisos y confirmar cualquier cambio estratégico antes de actualizar la memoria de cuenta.",
    guardrail: "La transcripción puede sugerir cambios de contexto, pero no los aplica sin validación.",
    reversible: true,
    actions: ["Validar compromisos", "Corregir", "Crear seguimiento", "Cerrar"],
    evidence: ["Transcripción asociada", "Compromisos extraídos", "Participantes y fecha vinculados"],
  },
  insights: {
    kind: "Insight",
    owner: "Especialista",
    source: "Intelligence Layer",
    why: "La variación detectada es relevante frente al histórico y merece interpretación antes de actuar.",
    recommendation: "Validar causalidad, decidir una acción y medir el resultado para saber si la hipótesis fue útil.",
    guardrail: "Una correlación no se presenta como causalidad confirmada sin validación humana.",
    reversible: true,
    actions: ["Validar insight", "Pedir más evidencia", "Aplicar recomendación", "Descartar"],
    evidence: ["Comparación contra histórico", "Fuente y período identificados", "Nivel de confianza visible"],
  },
  oportunidades: {
    kind: "Oportunidad",
    owner: "Dirección / Comercial",
    source: "Opportunity Intelligence",
    why: "Una señal externa o interna coincide con el contexto de la cuenta y podría convertirse en una acción concreta.",
    recommendation: "Validar fit, ventana temporal e impacto antes de convertir la oportunidad en proyecto, propuesta o campaña.",
    guardrail: "Avans propone oportunidades; inversión y foco estratégico permanecen bajo decisión humana.",
    reversible: true,
    actions: ["Priorizar", "Convertir en acción", "Pedir análisis", "Descartar"],
    evidence: ["Señal de origen identificada", "Cruce con contexto de cuenta", "Relevancia estimada"],
  },
  aprendizajes: {
    kind: "Aprendizaje candidato",
    owner: "Owner de conocimiento",
    source: "Learning Engine",
    why: "Avans detectó un patrón repetido que podría mejorar futuras ejecuciones.",
    recommendation: "Validar si el patrón es estable antes de incorporarlo a la memoria activa.",
    guardrail: "Ningún aprendizaje crítico modifica contexto o instrucciones sin validación.",
    reversible: true,
    actions: ["Validar aprendizaje", "Editar criterio", "Medir primero", "Descartar"],
    evidence: ["Correcciones recurrentes", "Decisiones relacionadas", "Resultado posterior disponible o pendiente"],
  },
  leads: {
    kind: "Oportunidad comercial",
    owner: "Comercial",
    source: "Pipeline",
    why: "El lead tiene información suficiente para sugerir una próxima acción y evitar pérdida de seguimiento.",
    recommendation: "Confirmar fit y siguiente contacto antes de derivar a Discovery.",
    guardrail: "La IA prioriza y prepara; el descarte comercial definitivo permanece bajo criterio humano.",
    reversible: true,
    actions: ["Avanzar", "Programar seguimiento", "Derivar a Discovery", "Descartar"],
    evidence: ["Origen y datos normalizados", "Fit estimado", "Actividad y último contacto"],
  },
  discovery: {
    kind: "Diagnóstico",
    owner: "Strategy",
    source: "Discovery Engine",
    why: "El relevamiento consolidó hechos, inferencias y preguntas pendientes que necesitan validación.",
    recommendation: "Cerrar información crítica y validar el diagnóstico antes de convertirlo en alcance.",
    guardrail: "Las hipótesis IA permanecen etiquetadas como inferencias hasta ser confirmadas.",
    reversible: true,
    actions: ["Validar diagnóstico", "Pedir información", "Priorizar oportunidad", "Cerrar Discovery"],
    evidence: ["Formularios y reuniones consolidados", "Hechos separados de inferencias", "Preguntas pendientes visibles"],
  },
  propuestas: {
    kind: "Propuesta",
    owner: "Dirección comercial",
    source: "Proposal Engine",
    why: "El alcance deriva del diagnóstico, pero precio, exclusiones y compromisos requieren validación humana.",
    recommendation: "Confirmar alcance y dependencias antes de generar o enviar una versión cliente.",
    guardrail: "Precio, exclusiones y compromisos externos nunca se aprueban automáticamente.",
    reversible: true,
    actions: ["Aprobar alcance", "Pedir ajuste", "Generar versión cliente", "Rechazar"],
    evidence: ["Discovery de origen vinculado", "Entregables y etapas trazables", "Exclusiones identificadas"],
  },
  integraciones: {
    kind: "Integración",
    owner: "Technical Ops",
    source: "Integration Layer",
    why: "La conexión necesita seguimiento de autorización, sincronización y frescura del dato.",
    recommendation: "Resolver credenciales o mapeo antes de permitir que workflows dependientes continúen.",
    guardrail: "Sólo se accede a datos y acciones expresamente autorizados.",
    reversible: true,
    actions: ["Reintentar sync", "Reautorizar", "Pausar conector", "Escalar"],
    evidence: ["Última sincronización", "Scope autorizado", "Errores y reintentos registrados"],
  },
  agentes: {
    kind: "Agente",
    owner: "AI Ops",
    source: "Agent Runtime",
    why: "El agente opera bajo un contrato explícito de objetivo, contexto, herramientas y límites.",
    recommendation: "Revisar calidad, costo y escalaciones antes de ampliar su autonomía.",
    guardrail: "No puede usar herramientas o ejecutar acciones fuera de los permisos asignados.",
    reversible: true,
    actions: ["Aprobar versión", "Reducir autonomía", "Pausar agente", "Abrir evaluación"],
    evidence: ["Inputs y outputs trazados", "Herramientas autorizadas", "Tasa de aprobación y escalaciones"],
  },
  workflows: {
    kind: "Workflow",
    owner: "Automation Ops",
    source: "Workflow Engine",
    why: "La automatización combina triggers, reglas, agentes y aprobaciones que deben conservar estado y versión.",
    recommendation: "Validar el paso fallido o sensible y reanudar desde un punto seguro.",
    guardrail: "Los cambios productivos se publican versionados y con posibilidad de rollback cuando aplica.",
    reversible: true,
    actions: ["Reintentar", "Aprobar paso", "Pausar workflow", "Rollback demo"],
    evidence: ["Versión activa identificada", "Reintentos idempotentes", "Estado de cada paso disponible"],
  },
  guardrails: {
    kind: "Política de autonomía",
    owner: "Dirección / AI Ops",
    source: "Guardrail Engine",
    why: "Una acción alcanzó un límite de riesgo, presupuesto, irreversibilidad o permiso.",
    recommendation: "Confirmar que la acción está dentro de la política antes de habilitar ejecución.",
    guardrail: "La propia política bloquea cualquier ejecución fuera del umbral autorizado.",
    reversible: true,
    actions: ["Aprobar excepción", "Mantener bloqueo", "Editar política", "Escalar"],
    evidence: ["Umbral que disparó el bloqueo", "Actor y acción solicitada", "Valores antes de ejecutar"],
  },
  auditoria: {
    kind: "Evento de auditoría",
    owner: "Governance",
    source: "Audit Log",
    why: "El evento conserva quién hizo qué, con qué autorización y qué cambió.",
    recommendation: "Revisar evidencia y cerrar el evento sólo cuando la trazabilidad sea suficiente.",
    guardrail: "Los registros de auditoría no se editan desde la experiencia operativa.",
    reversible: false,
    actions: ["Marcar revisado", "Abrir incidente", "Exportar evidencia", "Cerrar"],
    evidence: ["Actor y timestamp", "Autorización relacionada", "Before / after cuando aplica"],
  },
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function priorityFromStatus(status: string): OperationalObject["priority"] {
  const normalized = status.toLowerCase();
  if (normalized.includes("crít")) return "Crítica";
  if (normalized.includes("alta") || normalized.includes("atención") || normalized.includes("revis")) return "Alta";
  if (normalized.includes("media") || normalized.includes("propuesto") || normalized.includes("validar")) return "Media";
  return "Normal";
}

function clientFromTitle(title: string) {
  return title.includes(" · ") ? title.split(" · ")[0] : null;
}

export function getOperationalObjectForRow(section: string, title: string): OperationalObject | null {
  if (excludedSections.has(section)) return null;
  const data = sectionData[section];
  const row = data?.rows.find((item) => item.title === title);
  const profile = profiles[section];
  if (!row || !profile) return null;

  const depth = moduleDepthData[section];
  const client = clientFromTitle(row.title);
  const confidence = section === "auditoria" ? "100% trazabilidad" : section === "insights" ? "82% · hipótesis" : "86% · demo";

  return {
    section,
    slug: slugify(row.title),
    title: row.title,
    client,
    kind: profile.kind,
    status: row.status,
    priority: priorityFromStatus(row.status),
    owner: profile.owner,
    source: profile.source,
    due: row.status.toLowerCase().includes("complet") || row.status.toLowerCase().includes("cerr") ? "Sin vencimiento" : "Hoy · 18:00",
    summary: row.detail,
    why: profile.why,
    recommendation: profile.recommendation,
    confidence,
    guardrail: profile.guardrail,
    reversible: profile.reversible,
    evidence: profile.evidence,
    flow: depth?.flow ?? ["Detectar", "Entender", "Decidir", "Registrar"],
    actions: profile.actions,
    timeline: [
      { time: "09:12", title: "Objeto creado", detail: `Avans registró la señal desde ${profile.source}.` },
      { time: "09:13", title: "Contexto asociado", detail: client ? `Se vinculó a ${client} y a su memoria disponible.` : "Se asociaron fuente, estado y reglas relevantes." },
      { time: "09:14", title: "Análisis completado", detail: "Se generó explicación, evidencia y próxima acción sugerida." },
      { time: "Ahora", title: "Esperando resolución", detail: `Estado actual: ${row.status}. La decisión queda trazada en esta vista.` },
    ],
  };
}

export function getOperationalObject(section: string, slug: string) {
  const data = sectionData[section];
  const row = data?.rows.find((item) => slugify(item.title) === slug);
  return row ? getOperationalObjectForRow(section, row.title) : null;
}

export function getOperationalObjectParams() {
  return Object.entries(sectionData).flatMap(([section, data]) => {
    if (excludedSections.has(section) || !profiles[section]) return [];
    return data.rows.map((row) => ({ section, item: slugify(row.title) }));
  });
}
