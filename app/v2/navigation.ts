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
      { label: "Inbox", slug: "inbox", href: "/v2/inbox" },
    ],
  },
  {
    group: "Operación",
    items: [
      { label: "Clientes", slug: "clientes", href: "/v2/clientes" },
      { label: "Procesos", slug: "procesos", href: "/v2/procesos" },
      { label: "Proyectos", slug: "proyectos", href: "/v2/proyectos" },
      { label: "Reuniones", slug: "reuniones", href: "/v2/reuniones" },
    ],
  },
  {
    group: "Inteligencia",
    items: [
      { label: "Insights", slug: "insights", href: "/v2/insights" },
      { label: "Oportunidades", slug: "oportunidades", href: "/v2/oportunidades" },
      { label: "Aprendizajes", slug: "aprendizajes", href: "/v2/aprendizajes" },
    ],
  },
  {
    group: "Agency Pack",
    items: [
      { label: "Leads", slug: "leads", href: "/v2/leads" },
      { label: "Discovery", slug: "discovery", href: "/v2/discovery" },
      { label: "Propuestas", slug: "propuestas", href: "/v2/propuestas" },
      { label: "Contenido", slug: "contenido", href: "/v2/contenido" },
      { label: "Campañas", slug: "campanas", href: "/v2/campanas" },
      { label: "Reportes", slug: "reportes", href: "/v2/reportes" },
    ],
  },
  {
    group: "Sistema",
    items: [
      { label: "Integraciones", slug: "integraciones", href: "/v2/integraciones" },
      { label: "Agentes", slug: "agentes", href: "/v2/agentes" },
      { label: "Workflows", slug: "workflows", href: "/v2/workflows" },
      { label: "Guardrails", slug: "guardrails", href: "/v2/guardrails" },
      { label: "Auditoría", slug: "auditoria", href: "/v2/auditoria" },
    ],
  },
];

export const v2NavItems = v2NavGroups.flatMap((group) => group.items);
