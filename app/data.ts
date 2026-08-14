export const sections = [
  { slug: "dashboard", label: "Dashboard", group: "General" },
  { slug: "leads", label: "Leads", group: "Comercial" },
  { slug: "discovery", label: "Discovery", group: "Comercial" },
  { slug: "propuestas", label: "Propuestas", group: "Comercial" },
  { slug: "clientes", label: "Clientes", group: "Operación" },
  { slug: "proyectos", label: "Proyectos", group: "Operación" },
  { slug: "onboarding", label: "Onboarding", group: "Operación" },
  { slug: "contenido", label: "Contenido", group: "Entrega" },
  { slug: "reportes", label: "Reportes", group: "Entrega" },
  { slug: "aprobaciones", label: "Aprobaciones", group: "Entrega" },
  { slug: "agentes", label: "Agentes IA", group: "Sistema" },
  { slug: "automatizaciones", label: "Automatizaciones", group: "Sistema" },
  { slug: "configuracion", label: "Configuración", group: "Sistema" },
] as const;

export const leads = [
  { name: "Clínica Norte", company: "Salud", source: "WhatsApp", score: 92, stage: "Calificado", owner: "Mica", budget: "$1.8M" },
  { name: "Casa Nativa", company: "Real Estate", source: "Instagram", score: 84, stage: "Discovery", owner: "Juan", budget: "$980K" },
  { name: "Marea Studio", company: "Ecommerce", source: "Formulario", score: 76, stage: "Nuevo", owner: "Sofi", budget: "$720K" },
  { name: "Nexo Legal", company: "Servicios", source: "Referido", score: 68, stage: "Propuesta", owner: "Mica", budget: "$1.2M" },
];

export const agents = [
  ["Lead Classifier", "Comercial", "Clasifica intención, urgencia y fit."],
  ["Lead Scoring", "Comercial", "Prioriza oportunidades con señales verificables."],
  ["Discovery Brief", "Discovery", "Ordena respuestas y detecta datos faltantes."],
  ["Proposal Writer", "Propuestas", "Prepara alcance, etapas y exclusiones."],
  ["Onboarding Assistant", "Clientes", "Controla documentos, accesos y kickoff."],
  ["Project Copilot", "Proyectos", "Resume bloqueos y recomienda próximos pasos."],
  ["Content Strategist", "Contenido", "Diseña pilares e ideas para cada marca."],
  ["Copywriter", "Contenido", "Redacta variantes según tono y canal."],
  ["Creative Prompter", "Contenido", "Crea prompts visuales listos para revisar."],
  ["Report Analyst", "Reportes", "Interpreta métricas y anomalías."],
  ["Client Success", "Clientes", "Detecta riesgos y oportunidades de expansión."],
] as const;

export const workflows = [
  { name: "Captura y calificación", trigger: "Nuevo lead", steps: ["Normalizar datos", "Lead Classifier", "Asignar owner", "Revisión humana"], runs: 148 },
  { name: "Discovery a propuesta", trigger: "Discovery completo", steps: ["Crear brief", "Proposal Writer", "Validar alcance", "Aprobación CEO"], runs: 32 },
  { name: "Reporte mensual", trigger: "Métricas cargadas", steps: ["Analizar KPIs", "Redactar insights", "Revisión PM", "Enviar"], runs: 54 },
];
