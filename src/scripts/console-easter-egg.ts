/**
 * Console Easter egg: hint on load and cursor() "hack" simulation.
 * Do not register twice; guard against duplicate runs.
 */

const TERMINAL_STYLE =
  'font-family: "JetBrains Mono", ui-monospace, monospace; color: #0f0; font-size: 14px;';
const ACCENT_STYLE =
  'font-family: "JetBrains Mono", ui-monospace, monospace; color: #edecec; font-size: 14px; font-weight: bold;';

const HACK_LINES = [
  '> Connecting to cursor-community.kz...',
  '> Bypassing firewall...',
  '> Accessing mainframe...',
  '> Decrypting secrets...',
  '> [OK] Access granted.',
];

const DELAY_MS = 500;

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runHackSequence(): Promise<void> {
  console.clear?.();
  for (const line of HACK_LINES) {
    console.log('%c ' + line, TERMINAL_STYLE);
    await delay(DELAY_MS);
  }
  console.log('');
  console.log(
    '%c Секрет: самый быстрый способ попасть в комьюнити — ссылка в футере сайта.',
    ACCENT_STYLE
  );
  console.log(
    '%c Ты нашёл пасхалку. Добро пожаловать в Cursor Community KZ 👋',
    ACCENT_STYLE
  );
  console.log('%c https://t.me/+IQDkySGNoCVkMTUy', TERMINAL_STYLE);
}

function install(): void {
  if (typeof window === 'undefined') return;
  if ((window as unknown as { __cursorEasterEggInstalled?: boolean }).__cursorEasterEggInstalled) {
    return;
  }
  (window as unknown as { __cursorEasterEggInstalled?: boolean }).__cursorEasterEggInstalled = true;

  const hint =
    'Хочешь сюрприз? Введи в консоли cursor()';
  console.log(
    '%c ' + hint,
    'font-family: "JetBrains Mono", monospace; color: #edecec; font-size: 12px;'
  );

  let inProgress = false;
  (window as unknown as { cursor?: () => void }).cursor = function cursor(): void {
    if (inProgress) {
      console.log('%c Already in progress...', TERMINAL_STYLE);
      return;
    }
    inProgress = true;
    runHackSequence().finally(() => {
      inProgress = false;
    });
  };
}

install();
