import { products } from './data.js';

const MOBILE_BREAKPOINT = 768;
const MOBILE_INITIAL_COUNT = 4;

const productsEl = document.getElementById('products');
const showMoreBtn = document.getElementById('show-more');
const categoryButtons = document.querySelectorAll('.category');

let currentCategory = 'belts';
let showAll = false;

function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
}

function getInitialCount() {
    return isMobile() ? MOBILE_INITIAL_COUNT : Infinity;
}

function getFiltered() {
    return products.filter(p => p.category === currentCategory);
}

function renderCards() {
    if (!productsEl) return;

    const list = getFiltered();
    const limit = showAll ? list.length : getInitialCount();
    const visible = list.slice(0, limit);

    productsEl.innerHTML = visible.map(p => `
        <li class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Открыть ${p.name}">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <span class="product-card__price">${p.price} BYN</span>
        </li>
    `).join('');

    if (showMoreBtn) {
        
        showMoreBtn.hidden = visible.length >= list.length;
    }
}

function switchCategory(cat) {
    currentCategory = cat;
    showAll = false;
    renderCards();
}

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('category--active'));
        btn.classList.add('category--active');
        switchCategory(btn.dataset.category || 'belts');
    });
});

showMoreBtn?.addEventListener('click', () => {
    showAll = true;      
    renderCards();
});


let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (!isMobile()) showAll = false;
        renderCards();
    }, 150);
});

renderCards();