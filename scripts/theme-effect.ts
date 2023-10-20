export const setMetaThemeColor = function () {
  enum Theme {
    LIGHT = "light",
    DARK = "dark",
    SYSTEM = "system",
  }
  const PREFERS_DARK_SCHEME = "(prefers-color-scheme: dark)";
  const BG_LIGHT = "hsl(0, 0%, 100%)";
  const BG_DARK = "hsl(222.2, 84%, 4.9%)";

  try {
    const currentTheme = localStorage.getItem("theme");
    const headElement = document.head;
    const setThemeColor = (color: string) => {
      if (color === Theme.DARK) {
        headElement
          .querySelector("meta[name=theme-color]")
          ?.setAttribute("content", BG_DARK);
      }
      if (color === Theme.LIGHT) {
        headElement
          .querySelector("meta[name=theme-color]")
          ?.setAttribute("content", BG_LIGHT);
      }
    };

    if (Theme.SYSTEM === currentTheme || !currentTheme) {
      const prefersDarkSchemeMediaQuery =
        window.matchMedia(PREFERS_DARK_SCHEME);
      if (
        prefersDarkSchemeMediaQuery.media !== PREFERS_DARK_SCHEME ||
        prefersDarkSchemeMediaQuery.matches
      ) {
        setThemeColor(Theme.DARK);
      } else {
        setThemeColor(Theme.LIGHT);
      }
    } else if (currentTheme) {
      setThemeColor(currentTheme);
    }
    if (currentTheme === Theme.LIGHT || currentTheme === Theme.DARK)
      setThemeColor(currentTheme);
  } catch (e) {
    /* empty */
  }
};
