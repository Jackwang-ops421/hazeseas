import fs from "fs";
import path from "path";
import { routing, SUPPORTED_LOCALES, type Locale } from "@/i18n/routing";

// ─── Content type definitions ────────────────────────────────────────────────

/** Canonical list of content directories. Single source of truth. */
export const CONTENT_TYPES = [
  "codes",
  "guide",
  "fruits",
  "tier-list",
  "bosses",
  "items",
  "haki",
  "community",
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
    return null;
  }
}

/** Returns which locales have at least one MDX file in the given category */
export function getCategoryLocales(contentType: string): Locale[] {
  return (SUPPORTED_LOCALES as readonly string[]).filter((locale) => {
    const directory = path.join(CONTENT_ROOT, locale, contentType);
    return getSlugsFromDirectory(directory).length > 0;
  }) as Locale[];
}

/** Returns which locales have the specified article */
export function getArticleLocales(contentType: string, slugSegments: string[]): Locale[] {
  const slug = slugSegments.join("/");
  return (SUPPORTED_LOCALES as readonly string[]).filter((locale) => {
    const directory = path.join(CONTENT_ROOT, locale, contentType);
    return Boolean(findFileBySlug(directory, slug));
  }) as Locale[];
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

  const itemTypes = fs.existsSync(path.join(CONTENT_ROOT, language))
    ? fs.readdirSync(path.join(CONTENT_ROOT, language), { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
    : [];

  for (const contentType of itemTypes) {
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
  codes: "Codes",
  guide: "Guide",
  fruits: "Fruits",
  "tier-list": "Tier List",
  bosses: "Bosses",
  items: "Items",
  haki: "Haki",
  community: "Community",
};

const GROUP_ORDER: string[] = [
  "guide", "codes", "fruits", "tier-list", "bosses", "items", "haki", "community",
];

// ─── Header dropdown data (per primary nav item) ───────────────────────────

export interface NavDropdownLink {
  label: string;
  href: string;
}

export interface NavDropdownGroup {
  /** Slug of the category (e.g. "guide", "codes") */
  slug: string;
  /** Display label already provided by nav config */
  label: string;
  /** Where the label itself navigates (the category overview) */
  href: string;
  /** Top articles in this category, capped */
  items: NavDropdownLink[];
  /** Footer link inside the dropdown — points to the full listing */
  readMoreHref: string;
}

/**
 * Build dropdown bundles for each primary header nav item.
 *
 * Each group contains the category overview plus up to `maxItems` articles,
 * sorted by `priority` (asc) then `date` (desc). Falls back to alphabetical
 * ordering when neither is set.
 *
 * Designed to be called server-side and passed into <SiteHeader />.
 */
export function getHeaderNavDropdowns(
  categorySlugs: string[],
  language: Locale = "en",
  categoryLabels: Record<string, string> = {},
  maxItems = 6,
): NavDropdownGroup[] {
  const out: NavDropdownGroup[] = [];

  for (const slug of categorySlugs) {
    const groupDir = path.join(CONTENT_ROOT, language, slug);
    if (!fs.existsSync(groupDir)) continue;

    type Row = { title: string; href: string; priority: number; date: string };
    const rows: Row[] = [];

    for (const segments of getSlugsFromDirectory(groupDir)) {
      const articleSlug = segments.join("/");
      const mdxFilePath = findFileBySlug(groupDir, articleSlug);
      if (!mdxFilePath) continue;

      const fullPath = path.join(groupDir, `${mdxFilePath}.mdx`);
      let title = segments[segments.length - 1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      let priority = 99;
      let date = "";

      try {
        const source = fs.readFileSync(fullPath, "utf-8");
        const titleMatch = source.match(/title:\s*["'](.+?)["']/);
        const priorityMatch = source.match(/priority:\s*(\d+)/);
        const dateMatch = source.match(/date:\s*["'](.+?)["']/);
        if (titleMatch) title = titleMatch[1];
        if (priorityMatch) priority = parseInt(priorityMatch[1], 10);
        if (dateMatch) date = dateMatch[1];
      } catch {
        // keep defaults
      }

      rows.push({
        title,
        href: `/${slug}/${articleSlug}`,
        priority,
        date,
      });
    }

    rows.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return (b.date ?? "").localeCompare(a.date ?? "");
    });

    const overviewLink: NavDropdownLink = { label: "Overview", href: `/${slug}` };
    const articleLinks = rows
      .slice(0, maxItems)
      .map<NavDropdownLink>((r) => ({ label: r.title, href: r.href }));

    if (articleLinks.length === 0) continue;

    out.push({
      slug,
      label: categoryLabels[slug] ?? slug.replace(/\b\w/g, (c) => c.toUpperCase()),
      href: `/${slug}`,
      items: [overviewLink, ...articleLinks],
      readMoreHref: `/${slug}`,
    });
  }

  return out;
}

export function getDynamicNavigation(language: Locale = "en"): NavGroup[] {
  const localeDir = path.join(CONTENT_ROOT, language);
  if (!fs.existsSync(localeDir)) return [];

  const groups: NavGroup[] = [];

  for (const entry of fs.readdirSync(localeDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const groupSlug = entry.name;

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
