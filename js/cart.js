const products = [{
        id: 1,
        title: "M&M's шоколадные конфеты 130гр",
        price: 820,
        count: 1,
        image: "../img/valik.png"
    },
    {
        id: 2,
        title: "M&M's шоколадные конфеты 130гр",
        price: 820,
        count: 2,
        image: "../img/valik.png"
    },
    {
        id: 3,
        title: "M&M's шоколадные конфеты 130гр",
        price: 820,
        count: 2,
        image: "../img/valik.png"
    },
    {
        id: 4,
        title: "M&M's шоколадные конфеты 130гр",
        price: 820,
        count: 2,
        image: "../img/valik.png"
    }
];

function renderCart() {
    const cart = document.getElementById('cart');
    cart.innerHTML = '';

    products.forEach(product => {
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.dataset.id = product.id;
        item.innerHTML = `
            <img src="${product.image}" alt="Product">
            <div class="info">
                <p class="text-lg">${product.title}</p>
                <span class="text-gray-700 text-sm">Осталось: <span class="stock-count">${product.count}</span> шт.</span>
            </div>
            <div class="quantity">
                <button class="decrease text-yellow-500" data-action="decrease">
                    <i class="ri-subtract-line"></i>
                </button>
                <span class="count-value">${product.count}</span>
                <button class="increase text-yellow-500" data-action="increase">
                    <i class="ri-add-line"></i>
                </button>
            </div>
            <div>
                <p class="total">${product.price * product.count} ₽</p>
                <span class="text-gray-700">410 ₽/шт.</span>
            </div>
            <span class="remove text-gray-700" data-action="remove">
                <i class="ri-close-fill text-2xl"></i>
            </span>
        `;
        cart.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    const cart = document.getElementById('cart');

    cart.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        if (!item) return;

        const itemId = parseInt(item.dataset.id);
        const product = products.find(p => p.id === itemId);
        const action = e.target.closest('[data-action]')?.dataset.action;

        if (!product) return;

        if (action === 'remove') {
            const index = products.findIndex(p => p.id === itemId);
            if (index !== -1) {
                products.splice(index, 1);
                renderCart();
                if (products.length === 0) {
                    window.location.href = '../index.html';
                }
            }
        }

        if (action === 'increase') {
            product.count++;
            updateItemUI(item, product);
        }

        if (action === 'decrease') {
            if (product.count > 1) {
                product.count--;
                updateItemUI(item, product);
            }
        }
    });
});

function updateItemUI(item, product) {
    item.querySelector('.count-value').textContent = product.count; // Update quantity
    item.querySelector('.stock-count').textContent = product.count; // Update remaining stock
    item.querySelector('.total').textContent = `${product.price * product.count} ₽`; // Update total price
}

document.getElementById('remove__all').addEventListener('click', () => {
    products.length = 0;
    window.location.href = '../index.html';
    renderCart();
});