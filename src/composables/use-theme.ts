import { ref, onMounted } from 'vue'

export type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'mcg-theme-mode'

const themeMode = ref<ThemeMode>('light')
const isDark = ref(false)

const mediaQuery = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

function applyTheme() {
  const dark = themeMode.value === 'dark'

  isDark.value = dark
  document.documentElement.classList.toggle('dark', dark)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

function toggleTheme() {
  setThemeMode(isDark.value ? 'light' : 'dark')
}

function setThemeMode(mode: ThemeMode) {
  themeMode.value = mode
  localStorage.setItem(THEME_STORAGE_KEY, mode)
  applyTheme()
}

function getThemeIcon(): string {
  return isDark.value ? 'dark_mode' : 'light_mode'
}

export function useTheme() {
  onMounted(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    if (stored && ['light', 'dark'].includes(stored)) {
      themeMode.value = stored
    } else if (mediaQuery?.matches) {
      themeMode.value = 'dark'
    }
    applyTheme()
  })

  return {
    themeMode,
    isDark,
    setThemeMode,
    toggleTheme,
    getThemeIcon,
  }
}
