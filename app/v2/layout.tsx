import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./theme-overrides.css";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Avans Intelligence Core",
  description: "Centro operativo inteligente de Avans: procesos, decisiones, automatización y aprendizaje con control humano.",
  applicationName: "Avans Intelligence Core",
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={figtree.className}>{children}</div>;
}
