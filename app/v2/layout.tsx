import { Figtree } from "next/font/google";

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={figtree.className}>{children}</div>;
}
