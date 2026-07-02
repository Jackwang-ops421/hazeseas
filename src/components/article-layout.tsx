import Link from "next/link";
import type { Heading } from "@/lib/content";

interface QuickGuideItem {
  label: string;
  detail: string;
}

interface ArticleLayoutProps {
  title: string;
  summary: string;
  dateModified: string;
  lastModified?: string;
  section: string;
  sectionHref: string;
  quickGuide?: QuickGuideItem[];
  headings?: Heading[];
  children: React.ReactNode;
  relatedArticles?: Array<{
    title: string;
    description: string;
    href: string;
  }>;
  locale: string;
}

export function ArticleLayout({
  title,
  summary,
  dateModified,
  section,
  sectionHref,
  quickGuide,
  children,
  relatedArticles = [],
}: ArticleLayoutProps) {
  return (
    <>
      {/* Metadata row */}
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>Last updated: {dateModified}</span>
        <span>Author: Haze Seas Hub Team</span>
        <span>Type: Fan-made guide</span>
      </div>

      {/* Summary */}
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{summary}</p>

      {/* Quick Guide */}
      {quickGuide && quickGuide.length > 0 && (
        <div className="mt-6 rounded-2xl border border-[hsl(var(--nav-theme-light))] bg-[hsl(var(--nav-theme))]/5 p-5">
          <h2 className="text-base font-bold text-foreground">Quick Guide</h2>
          <ul className="mt-3 space-y-2">
            {quickGuide.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[hsl(var(--nav-theme))] text-[10px] font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <span>
                  <strong className="text-foreground">{item.label}: </strong>
                  {item.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Main content */}
      <div className="prose-invert mt-10 max-w-none">{children}</div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-12 rounded-2xl border border-border bg-card/70 p-5">
          <h2 className="text-xl font-bold text-foreground">Related Haze Seas Guides</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="block rounded-xl border border-border bg-muted/40 p-4 transition hover:border-[hsl(var(--nav-theme-light))]"
              >
                <h3 className="font-bold text-foreground">{article.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{article.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
