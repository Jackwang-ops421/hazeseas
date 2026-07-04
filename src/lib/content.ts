import fs from "fs";
import path from "path";
import { routing, type Locale } from "@/i18n/routing";

// ─── Content type definitions ────────────────────────────────────────────────

/** Canonical list of content directories. Single source of truth. */
export const CONTENT_TYPES = [
  "codes",
  "guide",
  "fruits",
  "tier-list",
  "bosses",
  "maps",
  "skills",
  "races",
  "weapons",
  "materials",
  "official-links",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

// ─── Extended MDX metadata schema ────────────────────────────────────────────

export type SourceStatus = "official" | "verified" | "community" | "video" | "pending" | "unverified";

export interface ContentMetadata {
  title: string;
  description: string;
  category: string;
  date: string;
  lastModified?: string;
  image?: string;
  badge?: string;
  summary?: string;
  /** How trustworthy the content source is */
  sourceStatus?: SourceStatus;
  /** When this information was last verified */
  lastChecked?: string;
  /** SEO keywords */
  keywords?: string[];
  /** Page layout template override */
  template?: string;
  /** Lower number = higher priority in listings */
  priority?: number;
  /** Show in Latest Updates section */
  showInLatestUpdates?: boolean;
  /** Show in wiki sidebar navigation */
  showInNav?: boolean;
  /** Reference URLs used to verify claims in this article */
  references?: string[];
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export interface ContentItem {
  slug: string;
  segments: string[];
  contentType: string;
  locale: Locale;
  metadata: ContentMetadata;
}

export type ContentData = {
  slug: string;
  segments: string[];
  contentType: string;
  locale: Locale;
  metadata: ContentMetadata;
  MDXContent: React.ComponentType;
  headings: Heading[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

// ─── Slug helpers ─────────────────────────────────────────────────────────────

export function fileNameToSlug(fileName: string): string {
  return fileName
    .replace(/\.mdx$/, "")
    .replace(/[^a-zA-Z0-9\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findFileBySlug(dir: string, slug: string, basePath: string[] = []): string | null {
  if (!fs.existsSync(dir)) return null;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const result = findFileBySlug(fullPath, slug, [...basePath, entry.name]);
      if (result) return result;
    } else if (entry.name.endsWith(".mdx")) {
      const fileName = entry.name.replace(".mdx", "");
      const entrySlug = [...basePath, fileNameToSlug(fileName)].join("/");
      if (entrySlug === slug) {
        return [...basePath, fileName].join("/");
      }
    }
  }
  return null;
}

function getSlugsFromDirectory(dir: string, basePath: string[] = []): string[][] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const paths: string[][] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...getSlugsFromDirectory(fullPath, [...basePath, entry.name]));
    } else if (entry.name.endsWith(".mdx")) {
      const fileName = entry.name.replace(".mdx", "");
      paths.push([...basePath, fileNameToSlug(fileName)]);
    }
  }
  return paths;
}

function extractHeadings(mdxSource: string): Heading[] {
  const headings: Heading[] = [];
  for (const line of mdxSource.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/\{[^}]*\}/g, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      headings.push({ id, text, level });
    }
  }
  return headings;
}

function getHeadingsFromFile(filePath: string): Heading[] {
  try {
    return extractHeadings(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return [];
  }
}

// ─── Content accessors ────────────────────────────────────────────────────────

export async function getAllContent(contentType: string, language: Locale): Promise<ContentItem[]> {
  const contentDir = path.join(CONTENT_ROOT, language, contentType);
  const slugPaths = getSlugsFromDirectory(contentDir);

  const items = await Promise.all(
    slugPaths.map(async (segments) => {
      const slug = segments.join("/");
      try {
        const realSlug = findFileBySlug(contentDir, slug) || slug;
        const mod = await import(`../../content/${language}/${contentType}/${realSlug}.mdx`);
        return {
          slug,
          segments,
          contentType,
          locale: language,
          metadata: mod.metadata as ContentMetadata,
        } satisfies ContentItem;
      } catch {
        return null;
      }
    }),
  );

  return items
    .filter((item): item is ContentItem => Boolean(item))
    .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}

export async function getContent(
  contentType: string,
  slugSegments: string[],
  language: Locale,
): Promise<ContentData | null> {
  const currentSlug = slugSegments.join("/");
  const contentDir = path.join(CONTENT_ROOT, language, contentType);

  try {
    const realSlug = findFileBySlug(contentDir, currentSlug) || currentSlug;
    const mdxPath = path.join(contentDir, `${realSlug}.mdx`);
    const { default: MDXContent, metadata } = await import(
      `../../content/${language}/${contentType}/${realSlug}.mdx`
    );
    return {
      slug: currentSlug,
      segments: slugSegments,
      contentType,
      locale: language,
      metadata: metadata as ContentMetadata,
      MDXContent,
      headings: getHeadingsFromFile(mdxPath),
    };
  } catch {
    if (language !== routing.defaultLocale) {
      try {
        const enContentDir = path.join(CONTENT_ROOT, routing.defaultLocale, contentType);
        const enRealSlug = findFileBySlug(enContentDir, currentSlug) || currentSlug;
        const enMdxPath = path.join(enContentDir, `${enRealSlug}.mdx`);
        const { default: MDXContent, metadata } = await import(
          `../../content/${routing.defaultLocale}/${contentType}/${enRealSlug}.mdx`
        );
        return {
          slug: currentSlug,
          segments: slugSegments,
          contentType,
          locale: routing.defaultLocale,
          metadata: metadata as ContentMetadata,
          MDXContent,
          headings: getHeadingsFromFile(enMdxPath),
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function getAllContentPaths(language: Locale) {
  const localeDir = path.join(CONTENT_ROOT, language);
  if (!fs.existsSync(localeDir)) return [];
  const entries = fs.readdirSync(localeDir, { withFileTypes: true });
  const contentTypeDirs = entries.filter((e) => e.isDirectory());
  return contentTypeDirs.flatMap((entry) => {
    const segments = getSlugsFromDirectory(path.join(localeDir, entry.name));
    return segments.map((slug) => ({ contentType: entry.name, slug }));
  });
}

// ─── Latest Updates — auto-generated from MDX ────────────────────────────────

export interface LatestUpdateItem {
  title: string;
  href: string;
  category: string;
  date: string;
  description: string;
  /** @internal — used for sorting, not exposed in output */
  _priority?: number;
  /** @internal — used for sorting, not exposed in output */
  _date?: string;
}

/**
 * Auto-generate Latest Updates from MDX files in content/<locale>/all/*.mdx.
 *
 * Filters:
 * - showInLatestUpdates !== false
 * - sourceStatus !== "unverified"
 * - title, description, href all present
 *
 * Sort: priority ASC, then date DESC
 */
export async function getLatestUpdates(language: Locale, limit = 12): Promise<LatestUpdateItem[]> {
  const items: LatestUpdateItem[] = [];

  for (const contentType of CONTENT_TYPES) {
    const contentDir = path.join(CONTENT_ROOT, language, contentType);
    if (!fs.existsSync(contentDir)) continue;

    const walkDir = (dir: string, baseSegments: string[] = []) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walkDir(full, [...baseSegments, entry.name]);
        } else if (entry.name.endsWith(".mdx")) {
          const fileName = entry.name.replace(".mdx", "");
          const slugSegments = [...baseSegments, fileNameToSlug(fileName)];
          const href = `/${contentType}/${slugSegments.join("/")}`;

          try {
            const source = fs.readFileSync(full, "utf-8");
            const titleMatch = source.match(/title:\s*["'](.+?)["']/);
            const descMatch = source.match(/description:\s*["'](.+?)["']/);
            const dateMatch = source.match(/date:\s*["'](.+?)["']/);
            const statusMatch = source.match(/sourceStatus:\s*["'](\w+)["']/);
            const showMatch = source.match(/showInLatestUpdates:\s*(true|false)/);
            const priorityMatch = source.match(/priority:\s*(\d+)/);

            const title = titleMatch?.[1] ?? "";
            const description = descMatch?.[1] ?? "";
            const date = dateMatch?.[1] ?? "";
            const sourceStatus = statusMatch?.[1] ?? "verified";
            const showInLatestUpdates = showMatch?.[1] !== "false";
            const priority = parseInt(priorityMatch?.[1] ?? "99", 10);

            if (!title || !description || !date) return;
            if (sourceStatus === "unverified") return;
            if (showInLatestUpdates === false) return;

            items.push({
              title,
              href,
              category: contentType,
              date,
              description,
              // attach sort key
              _priority: priority,
              _date: date,
            });
          } catch {
            // skip unreadable files
          }
        }
      }
    };

    walkDir(contentDir);
  }

  // Sort: priority ASC, then date DESC
  items.sort((a, b) => {
    const pa = a._priority ?? 99;
    const pb = b._priority ?? 99;
    if (pa !== pb) return pa - pb;
    return (b._date ?? "").localeCompare(a._date ?? "");
  });

  return items.slice(0, limit).map(({ _priority: _p, _date: _d, ...item }) => item);
}

// ─── Dynamic wiki sidebar navigation ────────────────────────────────────────

export interface NavGroup {
  title: string;
  count: number;
  slug: string;
  links: Array<{ label: string; href: string; badge?: string }>;
}

const GROUP_TITLES: Record<string, string> = {
  bosses: "Bosses",
  races: "Races",
  maps: "Maps & Areas",
  skills: "Skills",
  codes: "Codes",
  guide: "Getting Started",
  "tier-list": "Tier Lists",
  fruits: "Fruits",
  materials: "Materials",
  "official-links": "Official Links",
};

const GROUP_ORDER: string[] = [
  "guide", "races", "bosses", "maps", "skills", "codes",
  "tier-list", "fruits", "materials", "official-links",
];

export function getDynamicNavigation(language: Locale = "en"): NavGroup[] {
  const localeDir = path.join(CONTENT_ROOT, language);
  if (!fs.existsSync(localeDir)) return [];

  const groups: NavGroup[] = [];

  for (const entry of fs.readdirSync(localeDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const groupSlug = entry.name;
    if (!CONTENT_TYPES.includes(groupSlug as ContentType)) continue;

    const groupDir = path.join(localeDir, groupSlug);
    const slugPaths = getSlugsFromDirectory(groupDir);
    if (slugPaths.length === 0) continue;

    const links: NavGroup["links"] = [];
    links.push({ label: "Overview", href: `/${groupSlug}` });

    for (const segments of slugPaths) {
      const articleSlug = segments.join("/");
      const mdxFilePath = findFileBySlug(groupDir, articleSlug);
      if (!mdxFilePath) continue;

      const fullPath = path.join(groupDir, `${mdxFilePath}.mdx`);
      let title = segments[segments.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      let badge: string | undefined;

      try {
        const source = fs.readFileSync(fullPath, "utf-8");
        const titleMatch = source.match(/title:\s*["'](.+?)["']/);
        const badgeMatch = source.match(/badge:\s*["'](.+?)["']/);
        if (titleMatch) title = titleMatch[1];
        if (badgeMatch) badge = badgeMatch[1];
      } catch {
        // use default title
      }

      links.push({ label: title, href: `/${groupSlug}/${articleSlug}`, badge });
    }

    const groupTitle = GROUP_TITLES[groupSlug]
      || groupSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    groups.push({ title: groupTitle, count: links.length - 1, slug: groupSlug, links });
  }

  groups.sort((a, b) => {
    const ai = GROUP_ORDER.indexOf(a.slug);
    const bi = GROUP_ORDER.indexOf(b.slug);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return groups;
}
