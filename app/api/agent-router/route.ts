type AgentPlan = {
  summary: string;
  department: string;
  agents: string[];
  steps: string[];
  approvalRequired: boolean;
  risk: "low" | "medium" | "high";
};

const catalog = [
  { name: "Director", department: "Dirección", keywords: ["estrategia", "plan", "prioridad", "reunión", "cliente"] },
  { name: "Project Manager", department: "Operaciones", keywords: ["proyecto", "deadline", "tarea", "seguimiento", "pendiente"] },
  { name: "Brand Strategist", department: "Estrategia", keywords: ["marca", "identidad", "brief", "posicionamiento", "concepto"] },
  { name: "Copywriter", department: "Creativo", keywords: ["copy", "texto", "post", "guion", "newsletter", "contenido"] },
  { name: "Designer", department: "Creativo", keywords: ["diseño", "pieza", "banner", "imagen", "figma", "flyer"] },
  { name: "Web Developer", department: "Desarrollo", keywords: ["wordpress", "framer", "web", "css", "elementor", "deploy"] },
  { name: "Automation Engineer", department: "Desarrollo", keywords: ["automatización", "workflow", "api", "webhook", "integración"] },
  { name: "Ads Specialist", department: "Growth", keywords: ["ads", "meta", "campaña", "anuncio", "cpc", "performance"] },
  { name: "CRM Specialist", department: "Comercial", keywords: ["lead", "crm", "kommo", "ventas", "seguimiento"] },
  { name: "QA Agent", department: "Operaciones", keywords: ["qa", "revisar", "chequear", "errores", "validar"] },
  { name: "Finance Agent", department: "Administración", keywords: ["presupuesto", "costos", "factura", "rentabilidad", "cobro"] },
];

function fallbackPlan(task: string): AgentPlan {
  const normalized = task.toLowerCase();
  const scored = catalog
    .map((agent) => ({
      ...agent,
      score: agent.keywords.reduce((total, keyword) => total + (normalized.includes(keyword) ? 2 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score);

  const selected = scored.filter((agent) => agent.score > 0).slice(0, 4);
  const agents = selected.length ? selected.map((agent) => agent.name) : ["Director", "Project Manager", "QA Agent"];
  const department = selected[0]?.department ?? "Dirección";
  const sensitive = /(publicar|enviar|cobrar|pagar|borrar|eliminar|presupuesto|inversión|cliente)/i.test(task);

  return {
    summary: "El Director descompone la solicitud, deriva el trabajo y consolida un entregable antes de ejecutar acciones externas.",
    department,
    agents,
    steps: [
      "Interpretar objetivo, contexto y restricciones.",
      "Asignar subtareas a los especialistas adecuados.",
      "Consolidar resultados y ejecutar QA cruzado.",
      sensitive ? "Solicitar aprobación humana antes de cualquier acción externa." : "Preparar resultado final y registrar trazabilidad.",
    ],
    approvalRequired: sensitive,
    risk: sensitive ? "medium" : "low",
  };
}

function extractOutputText(payload: unknown) {
  if (!payload || typeof payload !== "object") return "";
  const output = (payload as { output?: unknown[] }).output;
  if (!Array.isArray(output)) return "";

  return output
    .flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const content = (item as { content?: unknown[] }).content;
      if (!Array.isArray(content)) return [];
      return content
        .filter((part) => part && typeof part === "object" && (part as { type?: string }).type === "output_text")
        .map((part) => String((part as { text?: string }).text ?? ""));
    })
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const task = typeof body?.task === "string" ? body.task.trim() : "";
  const workspace = typeof body?.workspace === "string" ? body.workspace.trim() : "Avans Agency";

  if (!task) {
    return Response.json({ error: "La tarea es obligatoria." }, { status: 400 });
  }

  const fallback = fallbackPlan(task);
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({ plan: fallback, mode: "fallback" });
  }

  const model = process.env.AVANS_AGENT_MODEL || "gpt-5.6-luna";

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        reasoning: { effort: "low" },
        instructions:
          "Sos el router de Avans Command Center. Elegí agentes de un catálogo cerrado y devolvé SOLO JSON válido, sin markdown. Nunca autorices acciones externas sensibles: marcá approvalRequired=true. Catálogo: Director, Project Manager, Brand Strategist, Copywriter, Designer, Web Developer, Automation Engineer, Ads Specialist, CRM Specialist, QA Agent, Finance Agent.",
        input: `Workspace: ${workspace}\nTarea: ${task}\n\nDevolvé exactamente estas claves: summary:string, department:string, agents:string[], steps:string[] (3 a 5), approvalRequired:boolean, risk:"low"|"medium"|"high".`,
      }),
      signal: AbortSignal.timeout(18000),
    });

    if (!response.ok) {
      return Response.json({ plan: fallback, mode: "fallback", warning: "AI router unavailable" });
    }

    const payload = await response.json();
    const text = extractOutputText(payload);
    const parsed = JSON.parse(text) as Partial<AgentPlan>;

    const allowedAgents = new Set(catalog.map((agent) => agent.name));
    const agents = Array.isArray(parsed.agents)
      ? parsed.agents.filter((name): name is string => typeof name === "string" && allowedAgents.has(name)).slice(0, 5)
      : fallback.agents;

    const plan: AgentPlan = {
      summary: typeof parsed.summary === "string" ? parsed.summary : fallback.summary,
      department: typeof parsed.department === "string" ? parsed.department : fallback.department,
      agents: agents.length ? agents : fallback.agents,
      steps:
        Array.isArray(parsed.steps) && parsed.steps.every((step) => typeof step === "string")
          ? parsed.steps.slice(0, 5)
          : fallback.steps,
      approvalRequired:
        typeof parsed.approvalRequired === "boolean" ? parsed.approvalRequired : fallback.approvalRequired,
      risk: parsed.risk === "low" || parsed.risk === "medium" || parsed.risk === "high" ? parsed.risk : fallback.risk,
    };

    return Response.json({ plan, mode: "ai", model });
  } catch {
    return Response.json({ plan: fallback, mode: "fallback", warning: "AI router fallback" });
  }
}
