const STORAGE_KEY = 'cursor-community-theme';

export type Theme = 'light' | 'dark';

function getStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'light' || v === 'dark') return v;
  } catch {
    /* ignore */
  }
  return null;
}

function systemPrefersDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function getEffectiveTheme(): Theme {
  const stored = getStoredTheme();
  if (stored) return stored;
  return systemPrefersDark() ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
}

export function initTheme(): void {
  applyTheme(getEffectiveTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (!getStoredTheme()) {
      applyTheme(systemPrefersDark() ? 'dark' : 'light');
      syncToggleUi();
    }
  });
}

function syncToggleUi(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const theme = document.documentElement.getAttribute('data-theme') as Theme | null;
  const isDark = theme === 'dark';
  const labelLight = btn.getAttribute('data-label-light') ?? 'Switch to light theme';
  const labelDark = btn.getAttribute('data-label-dark') ?? 'Switch to dark theme';
  btn.setAttribute('aria-label', isDark ? labelLight : labelDark);
}

export function bindThemeToggle(): void {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  syncToggleUi();

  btn.addEventListener('click', () => {
    const next: Theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    applyTheme(next);
    syncToggleUi();
  });
}
