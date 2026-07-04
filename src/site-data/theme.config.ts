/**
 * Theme configuration — CSS custom property values and color settings.
 * Values are consumed via CSS variables e.g. var(--nav-theme).
 */

export interface ThemeConfig {
  /** Primary accent color (HSL values passed to CSS), e.g. "245 76% 56%" */
  navTheme: string;
  /** Lighter variant for text/icons on dark backgrounds */
  navThemeLight: string;
  /** CSS variable name for the accent color */
  navThemeVar: string;
}

export const themeConfig: ThemeConfig = {
  navTheme: "245 76% 56%",
  navThemeLight: "245 76% 76%",
  navThemeVar: "--nav-theme",
};

/** TailwindCSS CSS variable mappings */
export const CSS_VARS = {
  navTheme: `hsl(var(--nav-theme))`,
  navThemeLight: `hsl(var(--nav-theme-light))`,
};
