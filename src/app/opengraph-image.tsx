import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COMPANY, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const alt = `${SITE_NAME} | ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const wordmark = await readFile(join(process.cwd(), "public", "wordmark.svg"));
  const src = `data:image/svg+xml;base64,${wordmark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#8a8a93" }}>COMING SOON</div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={720} height={140} alt="" style={{ marginTop: 36 }} />
        <div style={{ marginTop: 40, fontSize: 38, color: "#d4d4da" }}>{SITE_TAGLINE}</div>
        <div style={{ marginTop: 56, fontSize: 24, color: "#8a8a93" }}>
          {`A product of ${COMPANY.name}`}
        </div>
      </div>
    ),
    size,
  );
}
