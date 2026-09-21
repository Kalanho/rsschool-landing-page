const STORAGE_KEY = 'theme';

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}

function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return applyTheme(saved);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    });
});

initTheme();