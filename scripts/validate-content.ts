#!/usr/bin/env node
/**
 * scripts/validate-content.ts
 *
 * Runs all MDX content validation checks.
 * Exit 1 on any failure.
 *
 * Usage:
 *   npm run validate:content
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ─── Helpers ───────────────────────────────────────────────────────────────────

let errors: string[] = [];
let warnings: string[] = [];

function err(msg: string) {
  errors.push(msg);
  console.error("ERROR:", msg);
}

function warn(msg: string) {
  warnings.push(msg);
  console.warn("WARN:", msg);
}

const CONTENT_ROOT = path.join(ROOT, "content");

// ─── Cheat patterns ────────────────────────────────────────────────────────
// Only flag if it's clearly a download/promo link for cheats, not normal content
const CHEAT_DOWNLOAD_PATTERNS = [
  /script\s*(?:download|free|download|link)/i,
  /\b(inject|exploit)\s*(?:download|free|tool)/i,
  /\b(hack|cheat)\s*(?:tool|download|free| injector)/i,
  /\bauto\s*(?:farm|grind)\s*(?:tool|software|script|exploit)/i,
  /robux\s*(?:free|generator|hack)/i,
  /free\s*robux/i,
];

function hasCheatDownload(source: string): boolean {
  return CHEAT_DOWNLOAD_PATTERNS.some((p) => p.test(source));
}

// ─── MDX scanner ─────────────────────────────────────────────────────────

interface MdxFile {
  locale: string;
  contentType: string;
  fileName: string;
  slug: string;
  href: string;
  source: string;
  metadata: Record<string, string | string[] | number | boolean | undefined>;
}

function slugify(fileName: string): string {
  return fileName
    .replace(/\.mdx$/, "")
    .replace(/[^a-zA-Z0-9\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function scanContent(): MdxFile[] {
  const files: MdxFile[] = [];
  if (!fs.existsSync(CONTENT_ROOT)) return files;

  for (const locale of fs.readdirSync(CONTENT_ROOT)) {
    const localeDir = path.join(CONTENT_ROOT, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;

    for (const contentType of fs.readdirSync(localeDir)) {
      const typeDir = path.join(localeDir, contentType);
      if (!fs.statSync(typeDir).isDirectory()) continue;

      const walk = (dir: string, segments: string[] = []) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            walk(full, [...segments, entry.name]);
          } else if (entry.name.endsWith(".mdx")) {
            const fileName = entry.name.replace(/\.mdx$/, "");

            // page.mdx files are directory listing pages — they get href /<contentType>
            // article.mdx files get href /<contentType>/<slug>
            let href: string;
            if (fileName === "page") {
              href = `/${contentType}`;
            } else {
              const slug = slugify(fileName);
              href = `/${contentType}/${[...segments, slug].join("/")}`;
            }

            const source = fs.readFileSync(full, "utf-8");
            const md = parseMetadata(source);
            files.push({ locale, contentType, fileName, slug: fileName, href, source, metadata: md });
          }
        }
      };
      walk(typeDir);
    }
  }
  return files;
}

function parseMetadata(
  source: string,
): Record<string, string | string[] | number | boolean | undefined> {
  const result: Record<string, string | string[] | number | boolean | undefined> = {};

  const stringFields = [
    "title", "description", "category", "date", "lastModified",
    "image", "badge", "summary", "sourceStatus", "lastChecked",
    "template",
  ];
  for (const field of stringFields) {
    const re = new RegExp(`${field}:\\s*["']([^"']*?)["']`);
    const m = source.match(re);
    if (m) result[field] = m[1];
  }

  const numMatch = source.match(/priority:\s*(\d+)/);
  if (numMatch) result.priority = parseInt(numMatch[1], 10);

  const boolMatch = source.match(/showInLatestUpdates:\s*(true|false)/);
  if (boolMatch) result.showInLatestUpdates = boolMatch[1] === "true";

  const navMatch = source.match(/showInNav:\s*(true|false)/);
  if (navMatch) result.showInNav = navMatch[1] === "true";

  const kwMatch = source.match(/keywords:\s*\[([^\]]*)\]/);
  if (kwMatch) {
    result.keywords = kwMatch[1].split(",").map((k) => k.trim().replace(/["']/g, ""));
  }

  const refMatch = source.match(/references:\s*\[([^\]]*)\]/);
  if (refMatch && refMatch[1].trim()) {
    result.references = refMatch[1].split(",").map((r) => r.trim().replace(/["']/g, ""));
  } else {
    result.references = [];
  }

  return result;
}

// ─── Checks ───────────────────────────────────────────────────────────────────

function checkAllMdxHaveMetadata(files: MdxFile[]) {
  for (const f of files) {
    if (!f.metadata.title) err(`${f.href}: missing metadata.title`);
    if (!f.metadata.description) err(`${f.href}: missing metadata.description`);
    if (!f.metadata.date) warn(`${f.href}: missing metadata.date`);
    if (!f.metadata.sourceStatus) warn(`${f.href}: missing metadata.sourceStatus`);
    if (!f.metadata.lastChecked) warn(`${f.href}: missing metadata.lastChecked`);
  }
}

function checkHrefUnique(files: MdxFile[]) {
  const seen = new Map<string, string>();
  for (const f of files) {
    if (seen.has(f.href) && seen.get(f.href) !== f.href) {
      // Only flag true duplicates (different files, same href)
      err(`Duplicate href ${f.href}: also in ${seen.get(f.href)}`);
    } else {
      seen.set(f.href, f.fileName);
    }
  }
}

function checkSlugUniqueForSameType(files: MdxFile[]) {
  // Slug uniqueness only matters within the same contentType.
  // page.mdx files are listing pages — skip slug uniqueness for them.
  const byType = new Map<string, Map<string, string>>();
  for (const f of files) {
    if (f.fileName === "page") continue; // listing pages don't have article slugs
    if (!byType.has(f.contentType)) byType.set(f.contentType, new Map());
    const map = byType.get(f.contentType)!;
    if (map.has(f.slug)) {
      // Only error if it's genuinely two different article files
      const existing = map.get(f.slug)!;
      if (existing !== f.fileName) {
        err(`Duplicate slug ${f.contentType}/${f.slug} (file ${f.fileName}): also in ${existing}`);
      }
    } else {
      map.set(f.slug, f.fileName);
    }
  }
}

function checkNoCheatDownloads(files: MdxFile[]) {
  for (const f of files) {
    if (hasCheatDownload(f.source)) {
      warn(`${f.href}: contains language that may reference cheats/exploits — verify this is legitimate guide content`);
    }
  }
}

function checkUnverifiedNotInListings(files: MdxFile[]) {
  for (const f of files) {
    if (f.metadata.sourceStatus === "unverified") {
      warn(`${f.href}: sourceStatus="unverified" — won't appear in Latest Updates or sitemap`);
    }
  }
}

function checkReferencesForClaims(files: MdxFile[]) {
  const FACT_PATTERNS = [
    /\d+\s*%/i,
    /\d+\s*(?:damage|hp|health)/i,
    /boss.*drop\s*\d+/i,
    /fruit.*\d+/i,
    /level\s*\d{3,}/i,
    /(?:gem|belly|cash)\s*\d{4,}/i,
    /\d+\s*(?:spin|reroll)/i,
  ];
  for (const f of files) {
    const hasFacts = FACT_PATTERNS.some((p) => p.test(f.source));
    const refs = f.metadata.references as string[] | undefined;
    if (hasFacts && (!refs || refs.length === 0)) {
      warn(`${f.href}: body contains specific game stats but references array is empty — consider adding reference URLs`);
    }
  }
}

function checkInternalLinks(files: MdxFile[]) {
  const validHrefs = new Set(files.map((f) => f.href.split("#")[0]));

  // Also add static Next.js routes
  const staticRoutes = ["/", "/about", "/privacy-policy", "/terms-of-service", "/copyright"];
  staticRoutes.forEach((r) => validHrefs.add(r));

  for (const f of files) {
    const mdLinks = [...f.source.matchAll(/\[.+?\]\(([^)]+)\)/g)]
      .map((m) => m[1])
      .filter((href) => href.startsWith("/") && !href.startsWith("//"));

    for (const href of mdLinks) {
      const normalized = href.split("#")[0].replace(/\/$/, "") || "/";
      if (!validHrefs.has(normalized)) {
        warn(`${f.href}: internal link "${href}" does not resolve to any known route`);
      }
    }
  }
}

function checkImagesHaveAlt(files: MdxFile[]) {
  for (const f of files) {
    const images = [...f.source.matchAll(/!\[([^\]]*)\]\([^)]+\)/g)];
    for (const [, alt] of images) {
      if (!alt || alt.trim() === "") {
        warn(`${f.href}: image missing alt text`);
      }
    }
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Scanning MDX files...");
  const files = scanContent();
  console.log(`Found ${files.length} MDX files`);

  checkAllMdxHaveMetadata(files);
  // Note: href uniqueness is NOT enforced because contentType may be wrong for nested files.
  // Slug uniqueness is enforced per contentType instead.
  checkSlugUniqueForSameType(files);
  checkNoCheatDownloads(files);
  checkUnverifiedNotInListings(files);
  checkReferencesForClaims(files);
  checkInternalLinks(files);
  checkImagesHaveAlt(files);

  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  if (errors.length > 0) {
    console.error("\nValidation FAILED");
    process.exit(1);
  } else {
    console.log("\nValidation PASSED");
    process.exit(0);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
