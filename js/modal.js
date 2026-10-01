import { products } from './data.js';

const modal = document.getElementById('modal');
const modalContent = modal?.querySelector('.modal__content');

let currentProduct = null;
let selectedParams = {};

function openModal(id) {
    currentProduct = products.find(p => p.id === id);
    if (!currentProduct) return;


    selectedParams = {};
    for (const key in currentProduct.params) {
        selectedParams[key] = currentProduct.params[key][0];
    }

    renderModal();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
}

function calcPrice() {
    let price = currentProduct.price;
    for (const key in selectedParams) {
        const modifier = currentProduct.priceModifiers?.[key]?.[selectedParams[key]] || 0;
        price += modifier;
    }
    return price;
}

function renderModal() {
    if (!modalContent) return;

    const p = currentProduct;
    modalContent.innerHTML = `
        <button class="modal__close" data-close aria-label="Закрыть">✕</button>
        <img src="${p.image}" alt="${p.name}" class="modal__img">
        <h2>${p.name}</h2>
        <p>${p.description}</p>
        <div class="modal__params">
            ${Object.entries(p.params).map(([key, values]) => `
                <div class="modal__param">
                    <h4>${key}</h4>
                    <div class="modal__options">
                        ${values.map(v => `
                            <button class="modal__option ${selectedParams[key] === v ? 'modal__option--active' : ''}"
                                    type="button"
                                    data-param="${key}" data-value="${v}">
                                ${v}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
        <p class="modal__price">Итого: <strong>${calcPrice()} BYN</strong></p>
    `;
}


document.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card && !e.target.closest('.modal')) {
        const id = +card.dataset.id;
        if (id) openModal(id);
        return;
    }
    if (e.target.closest('[data-close]')) {
        closeModal();
        return;
    }
    const opt = e.target.closest('.modal__option');
    if (opt) {
        selectedParams[opt.dataset.param] = opt.dataset.value;
        renderModal();
    }
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
});


document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const card = e.target.closest('.product-card');
        if (card && !e.target.closest('.modal')) {
            const id = +card.dataset.id;
            if (id) openModal(id);
        }
    }
});