export type AttentionKind = "decision" | "blocker" | "alert" | "approval" | "learning";

export type AttentionItem = {
  id: string;
  kind: AttentionKind;
  priority: "Crítica" | "Alta" | "Media";
  title: string;
  context: string;
  reason: string;
  recommendation: string;
  owner: string;
  due: string;
};

export const attentionItems: AttentionItem[] = [
  {
    id: "att-001",
    kind: "alert",
    priority: "Crítica",
    title: "Milen · Fatiga creativa detectada",
    context: "Campaign Intelligence · Meta Ads",
    reason: "El CPL subió 38% en 6 días y dos creatividades concentran la caída de conversión.",
    recommendation: "Preparar dos variantes nuevas y mantener presupuesto hasta validar recuperación.",
    owner: "Vale",
    due: "Hoy · 12:30",
  },
  {
    id: "att-002",
    kind: "blocker",
    priority: "Alta",
    title: "Line Up · QA bloqueado por acceso pendiente",
    context: "Process Engine · Implementación CRM",
    reason: "Falta permiso administrador de Meta desde hace 4 días y el hito de QA queda expuesto.",
    recommendation: "Escalar el pedido al sponsor y mover las tareas no dependientes en paralelo.",
    owner: "Juan",
    due: "Hoy · 14:00",
  },
  {
    id: "att-003",
    kind: "approval",
    priority: "Alta",
    title: "Marzo Pumps · Propuesta lista para validar",
    context: "Decision Center · Propuesta comercial",
    reason: "Alcance técnico y etapas están completos; inversión y exclusiones requieren decisión humana.",
    recommendation: "Validar inversión y alcance antes de generar la versión cliente.",
    owner: "Dirección",
    due: "Hoy · 16:00",
  },
  {
    id: "att-004",
    kind: "learning",
    priority: "Media",
    title: "Lonkar · Nuevo patrón de copy para validar",
    context: "Learning Engine · Client Intelligence",
    reason: "Las últimas 6 piezas aprobadas eliminan superlativos y priorizan beneficios concretos.",
    recommendation: "Incorporar el patrón como preferencia de comunicación validada.",
    owner: "Cami",
    due: "Mañana",
  },
];

export const stats = [
  { label: "Requieren atención", value: "7", detail: "3 de alta prioridad" },
  { label: "Procesos activos", value: "18", detail: "2 con bloqueo" },
  { label: "Acciones automáticas", value: "42", detail: "Hoy · sin errores críticos" },
  { label: "Aprendizajes nuevos", value: "8", detail: "3 esperan validación" },
];

export const automaticActivity = [
  ["09:42", "Onboarding", "Se verificaron requisitos de Salutaris", "Completado"],
  ["09:35", "Reporting", "Se normalizaron métricas de Meta + GA4 para Milen", "Completado"],
  ["09:21", "Workflow", "Se creó tarea por compromiso de reunión de Line Up", "Completado"],
  ["08:58", "Campaign", "Se detectó anomalía de CPL y se abrió alerta crítica", "Derivado"],
];

export const learningSignals = [
  {
    client: "Milen Muebles",
    signal: "Los copies aprobados convierten mejor cuando el beneficio aparece en la primera línea.",
    status: "Validado",
  },
  {
    client: "Line Up",
    signal: "Las tareas de integración sin owner definido son el principal origen de demoras.",
    status: "Propuesto",
  },
  {
    client: "Marzo Pumps",
    signal: "LinkedIn técnico obtiene mejor respuesta que contenidos institucionales genéricos.",
    status: "Midiendo",
  },
];

export const intelligenceLoop = [
  "Observar",
  "Detectar",
  "Entender",
  "Recomendar",
  "Aprobar",
  "Ejecutar",
  "Medir",
  "Aprender",
];
