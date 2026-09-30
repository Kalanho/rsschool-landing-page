document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');

    if (!burger || !nav) return;

    function closeMenu() {
        nav.classList.remove('nav--open');
        burger.classList.remove('burger--active');
        burger.setAttribute('aria-label', 'Открыть меню');
        document.body.style.overflow = '';
    }

    function openMenu() {
        nav.classList.add('nav--open');
        burger.classList.add('burger--active');
        burger.setAttribute('aria-label', 'Закрыть меню');
        document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', () => {
        if (nav.classList.contains('nav--open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });


    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });


    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('nav--open')) {
            closeMenu();
        }
    });
});