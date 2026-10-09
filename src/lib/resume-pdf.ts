import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";

export function resumePdfExists(): boolean {
  const diskPath = path.join(
    process.cwd(),
    "public",
    site.resumePdf.href.replace(/^\//, ""),
  );
  return fs.existsSync(diskPath);
}
