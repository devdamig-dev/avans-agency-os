export type V2NavItem = {
  label: string;
  slug: string;
  href: string;
};

export type V2NavGroup = {
  group: string;
  items: V2NavItem[];
};

export const v2NavGroups: V2NavGroup[] = [
  {
    group: "General",
    items: [
      { label: "Command Center", slug: "command-center", href: "/v2" },
      { label: "Bandeja", slug: "inbox", href: "/v2/inbox" },
    ],
  },
  {
    group: "Núcleo del sistema",
    items: [
      { label: "Clientes", slug: "clientes", href: "/v2/clientes" },
      { label: "Operaciones", slug: "operaciones", href: "/v2/operaciones" },
      { label: "Ventas", slug: "ventas", href: "/v2/ventas" },
      { label: "Finanzas", slug: "finanzas", href: "/v2/finanzas" },
      { label: "RRHH", slug: "rrhh", href: "/v2/rrhh" },
      { label: "Gerencia", slug: "gerencia", href: "/v2/gerencia" },
    ],
  },
  {
    group: "Plataforma",
    items: [
      { label: "Usuarios y roles", slug: "usuarios", href: "/v2/usuarios" },
      { label: "Integraciones", slug: "integraciones", href: "/v2/integraciones" },
      { label: "Automatizaciones e IA", slug: "automatizaciones", href: "/v2/automatizaciones" },
      { label: "Seguridad", slug: "seguridad", href: "/v2/seguridad" },
      { label: "Auditoría", slug: "auditoria", href: "/v2/auditoria" },
      { label: "Salud del sistema", slug: "salud-sistema", href: "/v2/salud-sistema" },
    ],
  },
];

/**
 * Rutas que ya existían en el demo. Se conservan como capacidades internas y
 * se accede a ellas desde el área correspondiente, en lugar de mostrarlas
 * todas al mismo nivel en la navegación principal.
 */
export const v2CapabilityItems: V2NavItem[] = [
  { label: "Procesos", slug: "procesos", href: "/v2/procesos" },
  { label: "Proyectos", slug: "proyectos", href: "/v2/proyectos" },
  { label: "Reuniones", slug: "reuniones", href: "/v2/reuniones" },
  { label: "Insights", slug: "insights", href: "/v2/insights" },
  { label: "Oportunidades", slug: "oportunidades", href: "/v2/oportunidades" },
  { label: "Aprendizajes", slug: "aprendizajes", href: "/v2/aprendizajes" },
  { label: "Leads", slug: "leads", href: "/v2/leads" },
  { label: "Discovery", slug: "discovery", href: "/v2/discovery" },
  { label: "Propuestas", slug: "propuestas", href: "/v2/propuestas" },
  { label: "Contenido", slug: "contenido", href: "/v2/contenido" },
  { label: "Campañas", slug: "campanas", href: "/v2/campanas" },
  { label: "Reportes", slug: "reportes", href: "/v2/reportes" },
  { label: "Agentes", slug: "agentes", href: "/v2/agentes" },
  { label: "Workflows", slug: "workflows", href: "/v2/workflows" },
  { label: "Guardrails", slug: "guardrails", href: "/v2/guardrails" },
];

const visibleItems = v2NavGroups.flatMap((group) => group.items);

export const v2NavItems = [...visibleItems, ...v2CapabilityItems].filter(
  (item, index, items) => items.findIndex((candidate) => candidate.slug === item.slug) === index,
);

export const v2ParentBySlug: Record<string, string> = {
  procesos: "operaciones",
  proyectos: "operaciones",
  reuniones: "operaciones",
  contenido: "operaciones",
  campanas: "operaciones",
  leads: "ventas",
  discovery: "ventas",
  oportunidades: "ventas",
  propuestas: "ventas",
  insights: "gerencia",
  reportes: "gerencia",
  aprendizajes: "gerencia",
  agentes: "automatizaciones",
  workflows: "automatizaciones",
  guardrails: "seguridad",
};
