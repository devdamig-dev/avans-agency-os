import { useId } from "react";

type LogoVariant = "default" | "compact" | "markOnly";

export function AvansLogo({ variant = "default", inverse = false }: { variant?: LogoVariant; inverse?: boolean }) {
  const gradientId = useId().replace(/:/g, "");
  const markOnly = variant === "markOnly";
  return <span className={`avans-logo ${variant}`} aria-label="Avans Agency OS">
    <svg viewBox="0 0 48 48" role="img" aria-hidden="true">
      <defs><linearGradient id={gradientId} x1="4" y1="44" x2="43" y2="4" gradientUnits="userSpaceOnUse"><stop stopColor="#ff7a32"/><stop offset=".5" stopColor="#e1387f"/><stop offset="1" stopColor="#9a68e8"/></linearGradient></defs>
      <path d="M8 37.5 20.3 10h7.1L40 37.5h-8.2l-2.3-5.6H18.1l-2.4 5.6H8Zm13-12.4h5.7l-2.8-7Z" fill={`url(#${gradientId})`}/>
      <path d="m29.5 7.5 11 1.2-5.8 9.3" fill="none" stroke={`url(#${gradientId})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    {!markOnly && <span><strong style={{color:inverse?"#fff":undefined}}>Avans</strong>{variant === "default" && <small>AGENCY OS</small>}</span>}
  </span>;
}
