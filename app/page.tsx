import { ArrowRight, Bot, CheckCircle2, FileText, LineChart, MessageSquare, Sparkles, Users } from "lucide-react";

const modules = [
  {
    title: "Comercial",
    description: "Entrada de leads, clasificación, scoring, seguimiento y cierre con supervisión humana.",
    icon: MessageSquare
  },
  {
    title: "Discovery y propuestas",
    description: "Briefs internos, diagnóstico, alcances, presupuestos y presentaciones base.",
    icon: FileText
  },
  {
    title: "Onboarding",
    description: "Alta de clientes, accesos, contratos, facturación, carpetas y tareas iniciales.",
    icon: Users
  },
  {
    title: "Contenido",
    description: "Ideas, copies, prompts de imagen/video y revisión según criterio del content manager.",
    icon: Sparkles
  },
  {
    title: "Reportes",
    description: "Interpretación de métricas, capturas o datos de pauta para reportes claros al cliente.",
    icon: LineChart
  },
  {
    title: "Agentes IA",
    description: "Agentes por etapa del negocio, siempre trabajando como borrador y bajo aprobación.",
    icon: Bot
  }
];

const workflow = ["Lead", "Discovery", "Propuesta", "Alta", "Proyecto", "Contenido", "Reporte", "Aprobación"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090A12] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,105,0,0.25),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(181,74,255,0.25),transparent_28%),radial-gradient(circle_at_50%_95%,rgba(255,42,153,0.18),transparent_35%)]" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-black">A</div>
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] text-white/60">AVANS</p>
              <p className="text-lg font-semibold">Agency OS</p>
            </div>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 md:block">
            Marketing que funciona · Operación asistida por IA
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#ff7a1a]" />
              MVP en construcción sobre Supabase + Vercel + agentes IA
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
              Procesos que funcionan. <span className="gradient-text">Agentes que avanzan.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68 md:text-xl">
              Sistema modular para automatizar la operación interna de Avans: captación, discovery, propuestas, alta de clientes, contenido, reportes y project management con supervisión humana en cada etapa.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]" href="#modulos">
                Ver módulos del MVP
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 px-6 py-3 font-semibold text-white/85 backdrop-blur transition hover:bg-white/10" href="https://github.com/devdamig-dev/avans-agency-os">
                Ver repo
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-[#10111d] p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/45">Dashboard demo</p>
                    <h2 className="text-2xl font-bold">Avans Agency OS</h2>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm text-emerald-300">Ready</div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Leads nuevos", "24"],
                    ["Propuestas", "7"],
                    ["Aprobaciones", "13"],
                    ["Agentes activos", "9"]
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-white/[0.05] p-4">
                      <p className="text-sm text-white/45">{label}</p>
                      <p className="mt-2 text-3xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-4">
                  <p className="mb-4 text-sm font-semibold text-white/60">Flujo operativo</p>
                  <div className="space-y-3">
                    {workflow.map((step, index) => (
                      <div key={step} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-[#ff7a1a]" />
                        <span className="text-sm text-white/80">{index + 1}. {step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className="relative mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff7a1a]">MVP inicial</p>
          <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] md:text-6xl">Automatizar la agencia completa, no solo la atención.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.08]">
                <Icon className="mb-5 h-7 w-7 text-[#ff7a1a]" />
                <h3 className="text-xl font-bold">{module.title}</h3>
                <p className="mt-3 leading-7 text-white/58">{module.description}</p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
