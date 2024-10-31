export function useTheme() {
  const isDarkmode = () => window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

  const onChange = (handler: (mode: "dark" | "light") => void) => {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
      handler(event.matches ? "dark" : "light");
    });
  };

  const setTheme = (mode: "dark" | "light") => {
    if (mode === "light") {
      document.documentElement.removeAttribute("theme-mode");
    } else {
      document.documentElement.setAttribute("theme-mode", "dark");
    }
  };

  return { isDarkmode, onChange, setTheme };
}
