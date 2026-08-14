import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avans Agency OS",
  description: "Sistema modular con agentes IA para automatizar la operación de Avans Agency."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
