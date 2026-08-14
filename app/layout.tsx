import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Avans Agency OS",description:"Marketing que funciona. Operaciones que también."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html> }
