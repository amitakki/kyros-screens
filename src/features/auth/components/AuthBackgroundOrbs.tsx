export function AuthBackgroundOrbs() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "var(--brand)",
          opacity: 0.18,
          top: -100,
          right: -100,
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "var(--success)",
          opacity: 0.1,
          bottom: 60,
          left: -50,
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: "var(--info)",
          opacity: 0.08,
          top: "40%",
          left: "60%",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
