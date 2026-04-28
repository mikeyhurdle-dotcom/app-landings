// Headless renderer for the teacher toolkit PDFs.
//
// Usage:
//   npx tsx scripts/generate-teacher-pdfs.tsx \
//     --teacher "Ellie Moorhouse" \
//     --studio "EM:CAS" \
//     --code "EMCAS-XXXX" \
//     --colour "#E6614C" \
//     --out ~/Downloads
//
// Renders Student Welcome and Parent Note PDFs to the chosen folder
// using the same React components shipped on /teachers/assets, so the
// output is byte-identical to what a teacher would download themselves.

import * as React from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
type DocElement = React.ReactElement<DocumentProps>;
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import QRCode from "qrcode";
import { StudentWelcomePDF } from "../src/components/mewstro/teacher-assets/StudentWelcomePDF";
import { ParentOnePagerPDF } from "../src/components/mewstro/teacher-assets/ParentOnePagerPDF";
import { FridgeSheetPDF } from "../src/components/mewstro/teacher-assets/FridgeSheetPDF";
import type { TeacherAssetVars } from "../src/components/mewstro/teacher-assets/types";

function arg(name: string, fallback?: string): string {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) {
    if (fallback !== undefined) return fallback;
    throw new Error(`missing required arg --${name}`);
  }
  return process.argv[i + 1];
}

function optionalArg(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  if (i < 0) return undefined;
  return process.argv[i + 1];
}

function expand(p: string): string {
  if (p.startsWith("~")) return path.join(os.homedir(), p.slice(1));
  return p;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const teacherFullName = arg("teacher");
  const studioName = arg("studio");
  const inviteCode = arg("code").toUpperCase();
  const accentColor = arg("colour", "#2D8B7E");
  const offerCodeUrl = optionalArg("offer-url");
  const outDir = expand(arg("out", "."));

  const teacherFirst = teacherFullName.trim().split(/\s+/)[0];

  const offerCodeQrDataUrl = offerCodeUrl
    ? await QRCode.toDataURL(offerCodeUrl, {
        width: 512,
        margin: 1,
        errorCorrectionLevel: "M",
      })
    : undefined;

  const vars: TeacherAssetVars = {
    teacherName: teacherFirst,
    teacherFullName,
    studioName,
    inviteCode,
    accentColor,
    offerCodeUrl,
    offerCodeQrDataUrl,
  };

  fs.mkdirSync(outDir, { recursive: true });
  const slug = slugify(studioName) || "studio";

  // Each component renders a <Document> internally but its public prop type
  // is { vars }, so the unknown cast bridges the wrapper to what pdf() expects.
  const jobs: Array<{ name: string; element: DocElement }> = [
    {
      name: `${slug}-mewstro-student-welcome.pdf`,
      element: React.createElement(StudentWelcomePDF, { vars }) as unknown as DocElement,
    },
    {
      name: `${slug}-mewstro-parent-note.pdf`,
      element: React.createElement(ParentOnePagerPDF, { vars }) as unknown as DocElement,
    },
    {
      name: `${slug}-mewstro-fridge-tracker.pdf`,
      element: React.createElement(FridgeSheetPDF, { vars }) as unknown as DocElement,
    },
  ];

  for (const job of jobs) {
    const outPath = path.join(outDir, job.name);
    const stream = await pdf(job.element).toBuffer();
    const chunks: Buffer[] = [];
    await new Promise<void>((resolve, reject) => {
      stream.on("data", (c: Buffer) => chunks.push(c));
      stream.on("end", () => resolve());
      stream.on("error", reject);
    });
    const buf = Buffer.concat(chunks);
    fs.writeFileSync(outPath, buf);
    console.log(`wrote ${outPath} (${buf.length} bytes)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
