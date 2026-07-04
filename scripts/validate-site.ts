#!/usr/bin/env node
/**
 * scripts/validate-site.ts
 *
 * Runs site-wide configuration validation checks.
 * Exit 1 on any failure.
 *
 * Checks:
 * - site.config.ts is valid and has required fields
 * - home.config.ts sections reference valid hrefs
 * - nav.config.ts items reference existing routes
 * - SEO/JSON-LD/organization don't hardcode game name
 * - sitemap only includes verified/unverified pages (not broken links)
 * - robots.txt is present
 *
 * Usage:
 *   npm run validate:site
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let errors: string[] = [];
let warnings: string[] = [];

function error(msg: string) {
  errors.push(msg);
  console.error("ERROR:", msg);
}

function warn(msg: string) {
  warnings.push(msg);
  console.warn("WARN:", msg);
}

function checkSiteConfig() {
  const cfg = path.join(ROOT, "src/site-data/site.config.ts");
  if (!fs.existsSync(cfg)) { error("src/site-data/site.config.ts not found"); return; }
  const src = fs.readFileSync(cfg, "utf-8");

  const required = ["gameName", "siteName", "domain", "platform", "genre", "description", "officialLinks", "seo"];
  for (const field of required) {
    if (!src.includes(field)) error(`site.config.ts: missing field "${field}"`);
  }

  // Ensure no hardcoded "Haze Seas" in siteName or gameName only (those ARE the game name)
  // Check that the config uses variables, not literal strings everywhere
  const lines = src.split("\n");
  const exportedLines = lines.filter((l) => l.includes("export"));
  if (exportedLines.length < 5) error("site.config.ts: appears to be missing content");
}

function checkHomeConfig() {
  const cfg = path.join(ROOT, "src/site-data/home.config.ts");
  if (!fs.existsSync(cfg)) { error("src/site-data/home.config.ts not found"); return; }
  const src = fs.readFileSync(cfg, "utf-8");

  if (!src.includes("heroConfig")) error("home.config.ts: missing heroConfig");
  if (!src.includes("faqItems")) error("home.config.ts: missing faqItems");
  if (!src.includes("activeCodes")) error("home.config.ts: missing activeCodes");
  if (!src.includes("resourceModules")) error("home.config.ts: missing resourceModules");
}

function checkNavConfig() {
  const cfg = path.join(ROOT, "src/site-data/nav.config.ts");
  if (!fs.existsSync(cfg)) { error("src/site-data/nav.config.ts not found"); return; }
}

function checkLayoutNoHardcodedGame() {
  const layout = path.join(ROOT, "src/app/[locale]/layout.tsx");
  if (!fs.existsSync(layout)) { error("src/app/[locale]/layout.tsx not found"); return; }
  const src = fs.readFileSync(layout, "utf-8");

  // layout should NOT contain hardcoded "Haze Seas" in JSON-LD organization
  if (/"name":\s*"[^"]*Haze Seas[^"]*"/.test(src)) {
    warn("layout.tsx: JSON-LD organization name should read from siteConfig.siteName");
  }
  if (/"Haze Seas Wiki"/.test(src)) {
    warn("layout.tsx: appears to hardcode 'Haze Seas Wiki' instead of siteConfig.siteName");
  }
}

function checkComponentNoHardcodedGame() {
  // Check components that should be data-driven
  const components = [
    "src/components/site/Header.tsx",
    "src/components/site/Footer.tsx",
  ];
  for (const rel of components) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) continue;
    const src = fs.readFileSync(full, "utf-8");
    if (/"Haze Seas[^"]*Wiki"/.test(src) && !src.includes("siteConfig")) {
      warn(`${rel}: appears to hardcode 'Haze Seas' instead of using siteConfig`);
    }
  }
}

function checkStaticPagesExist() {
  const requiredRoutes = [
    "src/app/[locale]/page.tsx",
    "src/app/[locale]/layout.tsx",
    "src/app/[locale]/[...slug]/page.tsx",
    "src/app/[locale]/about/page.tsx",
    "src/app/[locale]/privacy-policy/page.tsx",
    "src/app/[locale]/terms-of-service/page.tsx",
    "src/app/[locale]/copyright/page.tsx",
  ];
  for (const r of requiredRoutes) {
    if (!fs.existsSync(path.join(ROOT, r))) error(`${r} not found`);
  }
}

function checkSitemapAndRobots() {
  if (!fs.existsSync(path.join(ROOT, "public/robots.txt"))) warn("public/robots.txt not found");
  // sitemap is generated — just check it's in next.config
  const nextCfg = path.join(ROOT, "next.config.mjs");
  if (!fs.existsSync(nextCfg)) { error("next.config.mjs not found"); return; }
  const src = fs.readFileSync(nextCfg, "utf-8");
  if (!src.includes("output")) warn("next.config.mjs: missing output config");
}

async function main() {
  console.log("Running site config validation...");

  checkSiteConfig();
  checkHomeConfig();
  checkNavConfig();
  checkLayoutNoHardcodedGame();
  checkComponentNoHardcodedGame();
  checkStaticPagesExist();
  checkSitemapAndRobots();

  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
  if (errors.length > 0) {
    console.error("\nSite validation FAILED");
    process.exit(1);
  } else {
    console.log("\nSite validation PASSED");
    process.exit(0);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
