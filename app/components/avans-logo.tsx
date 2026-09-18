type LogoVariant = "default" | "compact" | "markOnly";

const AVANS_LOGO_URL = "https://framerusercontent.com/assets/lolDH1ojIkJnKdil9ZchZVM7uW4.svg";

export function AvansLogo({ variant = "default" }: { variant?: LogoVariant; inverse?: boolean }) {
  if (variant === "markOnly") {
    return (
      <span className="avans-logo markOnly" aria-label="Avans">
        <span aria-hidden="true" style={{
          width: 28,
          height: 28,
          display: "inline-grid",
          placeItems: "center",
          color: "#FF6C4C",
          fontSize: 27,
          lineHeight: 1,
          fontWeight: 800,
          transform: "translateY(-1px)"
        }}>↗</span>
      </span>
    );
  }

  return (
    <span className={`avans-logo ${variant}`} aria-label="Avans">
      <img
        src={AVANS_LOGO_URL}
        alt="Avans"
        style={{
          display: "block",
          width: variant === "compact" ? 112 : 154,
          height: "auto",
          objectFit: "contain"
        }}
      />
    </span>
  );
}
