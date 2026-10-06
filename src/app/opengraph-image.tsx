import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FAJRIEL ARIFTIANSYAH - Website Profil & Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const font = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/space-grotesk@latest/latin-700-normal.woff"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "70px 80px",
          position: "relative",
          overflow: "hidden",
          background: "#0b0f14",
          color: "#ffffff",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* AURORA / GRADIENT */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            top: -400,
            right: -100,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(37,99,235,0.35), rgba(37,99,235,0) 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            bottom: -400,
            left: -150,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.28), rgba(124,58,237,0) 70%)",
            display: "flex",
          }}
        />

        {/* TOP BRAND */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: "#9ca3af",
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              background: "#3b82f6",
              display: "flex",
            }}
          />

          FAJRIELDEV
        </div>

        {/* MAIN */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 45,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            FAJRIEL ARIFTIANSYAH
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontSize: 32,
              color: "#60a5fa",
              fontWeight: 700,
            }}
          >
            Full Stack Web Developer
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 850,
              fontSize: 24,
              lineHeight: 1.5,
              color: "#9ca3af",
            }}
          >
            Website profil dan portfolio siswa SMK Rekayasa Perangkat Lunak,
            dibangun dengan Next.js, React, Tailwind CSS, dan Supabase.
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 55,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #252b33",
            paddingTop: 22,
            fontSize: 20,
            color: "#6b7280",
          }}
        >
          <span>PORTFOLIO • PROFILE • PROJECTS</span>

          <span style={{ color: "#d1d5db" }}>
            www.fajrielariftiansyah.my.id
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Space Grotesk",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}