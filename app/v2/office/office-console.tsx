"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Code2,
  Megaphone,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import styles from "./office.module.css";

type Department = {
  id: string;
  name: string;
  icon: React.ElementType;
  agents: string[];
  active: number;
  tasks: number;
  autonomy: number;
  accent: string;
};

type Plan = {
  summary: string;
  department: string;
  agents: string[];
  steps: string[];
  approvalRequired: boolean;
  risk: "low" | "medium" | "high";
};

const departments: Department[] = [
  { id: "strategy", name: "Dirección & Estrategia", icon: BrainCircuit, agents: ["Director", "Brand Strategist"], active: 2, tasks: 4, autonomy: 48, accent: "violet" },
  { id: "creative", name: "Creative Studio", icon: Palette, agents: ["Copywriter", "Designer"], active: 2, tasks: 7, autonomy: 61, accent: "pink" },
  { id: "development", name: "Development", icon: Code2, agents: ["Web Developer", "Automation Engineer"], active: 2, tasks: 5, autonomy: 56, accent: "cyan" },
  { id: "growth", name: "Growth", icon: Megaphone, agents: ["Ads Specialist"], active: 1, tasks: 3, autonomy: 69, accent: "orange" },
  { id: "commercial", name: "Commercial", icon: BriefcaseBusiness, agents: ["CRM Specialist"], active: 1, tasks: 2, autonomy: 52, accent: "blue" },
  { id: "operations", name: "Operations & QA", icon: Users, agents: ["Project Manager", "QA Agent", "Finance Agent"], active: 3, tasks: 6, autonomy: 43, accent: "green" },
];

const initialTasks = [
  { id: "T-184", title: "QA final Filial Berazategui", owner: "QA Agent", status: "working", time: "Ahora" },
  { id: "T-183", title: "Paquete social Sin Equipaje", owner: "Creative Studio", status: "review", time: "8 min" },
  { id: "T-182", title: "Reporte performance Milen", owner: "Ads Specialist", status: "done", time: "21 min" },
  { id: "T-181", title: "Seguimiento leads Avans", owner: "CRM Specialist", status: "done", time: "34 min" },
];

const workspaces = ["Avans Agency", "GastroPilot", "Sin Equipaje", "Nexodg"];

export function OfficeConsole() {
  const [workspace, setWorkspace] = useState(workspaces[0]);
  const [selected, setSelected] = useState(departments[0].id);
  const [task, setTask] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [routingMode, setRoutingMode] = useState<"ai" | "fallback" | null>(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  const selectedDepartment = useMemo(
    () => departments.find((department) => department.id === selected) ?? departments[0],
    [selected]
  );

  async function dispatchTask(event: React.FormEvent) {
    event.preventDefault();
    const clean = task.trim();
    if (!clean || loading) return;

    setLoading(true);
    setPlan(null);

    try {
      const response = await fetch("/api/agent-router", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: clean, workspace }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No se pudo enrutar la tarea");

      setPlan(data.plan);
      setRoutingMode(data.mode);
      setTasks((current) => [
        { id: `T-${185 + current.length}`, title: clean, owner: data.plan.agents.join(" + "), status: "working", time: "Ahora" },
        ...current.slice(0, 5),
      ]);
      setTask("");
    } catch {
      setPlan({
        summary: "No se pudo consultar el router. La tarea queda retenida para reintento seguro.",
        department: "Dirección",
        agents: ["Director", "Project Manager"],
        steps: ["Validar conexión del router", "Reintentar sin ejecutar acciones externas"],
        approvalRequired: true,
        risk: "medium",
      });
      setRoutingMode("fallback");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <section className={styles.header}>
        <div>
          <span className={styles.eyebrow}>AVANS COMMAND CENTER · CONTROL ROOM</span>
          <h1>Tu equipo de agentes, trabajando como una oficina.</h1>
          <p>Delegá un objetivo. El Director lo descompone, asigna especialistas, cruza resultados con QA y frena cualquier acción sensible hasta tu aprobación.</p>
        </div>
        <div className={styles.workspaceControl}>
          <span>Workspace</span>
          <select value={workspace} onChange={(event) => setWorkspace(event.target.value)}>
            {workspaces.map((item) => <option key={item}>{item}</option>)}
          </select>
          <small><span className={styles.liveDot} /> 11 agentes disponibles</small>
        </div>
      </section>

      <section className={styles.commandBar}>
        <form onSubmit={dispatchTask}>
          <Sparkles size={18} />
          <input
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Ej: Prepará todo lo necesario para la reunión de River del lunes"
            aria-label="Nueva tarea para el equipo de agentes"
          />
          <button type="submit" disabled={!task.trim() || loading}>
            {loading ? <Activity size={16} className={styles.spin} /> : <Send size={16} />}
            {loading ? "Enrutando" : "Delegar"}
          </button>
        </form>
        <div className={styles.guardrailLine}>
          <ShieldCheck size={14} />
          <span>Autonomía controlada: publicaciones, envíos, pagos y cambios externos requieren validación según política.</span>
        </div>
      </section>

      <section className={styles.controlGrid}>
        <div className={styles.officePanel}>
          <div className={styles.panelHeader}>
            <div><span className={styles.eyebrow}>LIVE OFFICE</span><h2>Mapa operativo</h2></div>
            <div className={styles.officeStats}><span>6 áreas</span><span>27 tareas</span><span>0 errores críticos</span></div>
          </div>

          <div className={styles.officeMap}>
            <div className={styles.coreNode}>
              <Bot size={19} />
              <strong>Director</strong>
              <span>Orchestrator</span>
              <i />
            </div>
            <div className={styles.connections} aria-hidden="true" />
            <div className={styles.departmentGrid}>
              {departments.map((department) => {
                const Icon = department.icon;
                return (
                  <button
                    key={department.id}
                    type="button"
                    className={`${styles.department} ${styles[department.accent]} ${selected === department.id ? styles.selected : ""}`}
                    onClick={() => setSelected(department.id)}
                  >
                    <span className={styles.departmentGlow} />
                    <div className={styles.departmentTop}>
                      <span className={styles.departmentIcon}><Icon size={17} /></span>
                      <span className={styles.statusPill}><i /> online</span>
                    </div>
                    <h3>{department.name}</h3>
                    <div className={styles.agentRow}>
                      {department.agents.map((agent) => <span key={agent} title={agent}>{agent.split(" ").map((word) => word[0]).join("").slice(0, 2)}</span>)}
                      <small>{department.agents.length} agentes</small>
                    </div>
                    <div className={styles.departmentMetrics}>
                      <span><strong>{department.tasks}</strong> tareas</span>
                      <span><strong>{department.autonomy}%</strong> autonomía</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.departmentDetail}>
            <div>
              <span className={styles.eyebrow}>ÁREA SELECCIONADA</span>
              <h3>{selectedDepartment.name}</h3>
              <p>{selectedDepartment.agents.join(" · ")}</p>
            </div>
            <div className={styles.detailMetric}><strong>{selectedDepartment.active}/{selectedDepartment.agents.length}</strong><span>activos</span></div>
            <div className={styles.detailMetric}><strong>{selectedDepartment.tasks}</strong><span>en cola</span></div>
            <div className={styles.detailMetric}><strong>{selectedDepartment.autonomy}%</strong><span>autonomía</span></div>
          </div>
        </div>

        <aside className={styles.sidePanel}>
          <div className={styles.panelHeader}>
            <div><span className={styles.eyebrow}>TASK STATUS</span><h2>Actividad</h2></div>
            <Activity size={17} />
          </div>
          <div className={styles.taskList}>
            {tasks.map((item) => (
              <div key={item.id} className={styles.taskItem}>
                <span className={`${styles.taskStatus} ${styles[item.status]}`}>
                  {item.status === "done" ? <CheckCircle2 size={13} /> : item.status === "review" ? <ShieldCheck size={13} /> : <Zap size={13} />}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.owner}</span>
                </div>
                <small>{item.time}</small>
              </div>
            ))}
          </div>

          <div className={styles.approvalBox}>
            <div><ShieldCheck size={16} /><strong>Approval Queue</strong></div>
            <p>2 acciones esperan validación humana.</p>
            <button type="button">Abrir Intelligent Inbox</button>
          </div>
        </aside>
      </section>

      {plan && (
        <section className={styles.planPanel}>
          <div className={styles.planHead}>
            <div>
              <span className={styles.eyebrow}>ROUTING RESULT · {routingMode === "ai" ? "AI" : "SAFE FALLBACK"}</span>
              <h2>{plan.department}</h2>
              <p>{plan.summary}</p>
            </div>
            <span className={`${styles.risk} ${styles["risk" + plan.risk]}`}>Riesgo {plan.risk}</span>
          </div>
          <div className={styles.planBody}>
            <div>
              <span className={styles.planLabel}>Equipo asignado</span>
              <div className={styles.chips}>{plan.agents.map((agent) => <span key={agent}><Bot size={13} />{agent}</span>)}</div>
            </div>
            <div>
              <span className={styles.planLabel}>Plan de ejecución</span>
              <ol>{plan.steps.map((step) => <li key={step}>{step}</li>)}</ol>
            </div>
            <div className={styles.approvalState}>
              {plan.approvalRequired ? <ShieldCheck size={19} /> : <CheckCircle2 size={19} />}
              <div>
                <strong>{plan.approvalRequired ? "Aprobación requerida" : "Puede avanzar dentro de guardrails"}</strong>
                <span>{plan.approvalRequired ? "El sistema detiene la acción externa hasta recibir validación." : "La tarea puede continuar sin intervención mientras no cambie el nivel de riesgo."}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className={styles.footerStrip}>
        <span><Clock3 size={14} /> Última sincronización: ahora</span>
        <span><ShieldCheck size={14} /> Guardrails activos</span>
        <span><Bot size={14} /> Router preparado para OpenAI Responses API</span>
      </section>
    </div>
  );
}
