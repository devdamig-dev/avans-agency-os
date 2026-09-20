"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type DemoState = {
  acaCaseStage: number;
  note: string;
  events: string[];
  setNote: (value: string) => void;
  advanceAcaCase: () => void;
  resetAcaCase: () => void;
};

const defaultEvents = [
  "10:02 · Reunión procesada",
  "10:03 · 3 compromisos creados",
  "10:04 · Proceso de seguimiento iniciado",
  "10:31 · Precondición vencida → Inbox",
];

const DemoStateContext = createContext<DemoState | null>(null);
const STORAGE_KEY = "avans-v2-demo-state";

export function DemoStateProvider({ children }: { children: React.ReactNode }) {
  const [acaCaseStage, setAcaCaseStage] = useState(3);
  const [note, setNote] = useState("Esperar confirmación del acceso y reanudar automáticamente.");
  const [events, setEvents] = useState<string[]>(defaultEvents);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { acaCaseStage?: number; note?: string; events?: string[] };
      if (typeof parsed.acaCaseStage === "number") setAcaCaseStage(parsed.acaCaseStage);
      if (typeof parsed.note === "string") setNote(parsed.note);
      if (Array.isArray(parsed.events)) setEvents(parsed.events);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ acaCaseStage, note, events }));
    } catch {}
  }, [acaCaseStage, note, events]);

  function advanceAcaCase() {
    if (acaCaseStage >= 6) return;
    const next = acaCaseStage + 1;
    const messages: Record<number, string> = {
      4: "10:44 · Decisión aprobada por Account Lead",
      5: "10:45 · Workflow reanudado dentro de guardrails",
      6: "10:46 · Caso resuelto y auditado",
    };
    setAcaCaseStage(next);
    if (messages[next]) setEvents((current) => [...current, messages[next]]);
  }

  function resetAcaCase() {
    setAcaCaseStage(3);
    setNote("Esperar confirmación del acceso y reanudar automáticamente.");
    setEvents(defaultEvents);
  }

  const value = useMemo(
    () => ({ acaCaseStage, note, events, setNote, advanceAcaCase, resetAcaCase }),
    [acaCaseStage, note, events],
  );

  return <DemoStateContext.Provider value={value}>{children}</DemoStateContext.Provider>;
}

export function useDemoState() {
  const context = useContext(DemoStateContext);
  if (!context) throw new Error("useDemoState must be used inside DemoStateProvider");
  return context;
}
