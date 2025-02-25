const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

class ProductCard {
    constructor({
        title,
        stock,
        weight,
        length,
        price,
        discountPrice,
        image,
        liked = false
    }) {
        this.title = title;
        this.stock = stock;
        this.weight = weight;
        this.length = length;
        this.price = price;
        this.discountPrice = discountPrice;
        this.image = image;
        this.count = 1;
        this.liked = liked;

    }

    increaseCount() {
        if (this.count) {
            this.count++;
        }
    }

    decreaseCount() {
        if (this.count > 1) {
            this.count--;
        }

    }

    render() {
        const card = document.createElement("div");
        card.className = "product__card";
        card.innerHTML = `
            <img src="${this.image}" alt="${this.title}" />
            <span class="like__icon text-yellow-500 text-2xl">
                <i class="ri-heart-line not__like"></i>
                <i class="ri-heart-fill  click__like" style="display:none;"></i>
            </span>
            <a href="../page/single-card.html" class="text-lg font-medium text-black limit2">${this.title}</a>
            <div class="product__character text-sm text-dark-300">
                <span class="text-15 text-green-500 font-semibold">В наличии: ${this.stock} шт.</span>
                <span>Вес: ${this.weight}гр</span>
                <span>Длина общая, мм: ${this.length}</span>
            </div>
            <div class="product__price">
                <div class="price__item">
                    <span class="text-gray-700 text-lg">${this.price} ₽</span>
                    <span class="text-red-500 font-semibold text-2xl">${this.discountPrice} ₽</span>
                </div>
                <div class="price__btn not__click">
                    <span class="in__basket text-white text-15">В корзину</span>
                    <div class="basket__count text-yellow-500 font-bold text-2xl" style="display: none;">
                        <i class="ri-subtract-line decrease"></i>
                        <span class="text-xl text-dark-300 font-light count">${this.count}</span>
                        <i class="ri-add-line increase"></i>
                    </div>
                </div>
            </div>
        `;


        const increaseBtn = card.querySelector(".increase");
        const decreaseBtn = card.querySelector(".decrease");
        const countSpan = card.querySelector(".count");
        const cartButton = card.querySelector(".price__btn");
        const basketCount = card.querySelector(".basket__count");
        const inBasket = card.querySelector(".in__basket");

        const likeIcon = card.querySelector(".like__icon");
        const notLike = card.querySelector(".not__like");
        const clickLike = card.querySelector(".click__like");

        increaseBtn.addEventListener("click", () => {
            this.increaseCount();
            countSpan.textContent = this.count;
        });

        decreaseBtn.addEventListener("click", () => {
            this.decreaseCount();
            countSpan.textContent = this.count;
        });

        cartButton.addEventListener("click", () => {
            cartButton.classList.remove("not__click");
            inBasket.style.display = "none";
            basketCount.style.display = "flex";
        });

        likeIcon.addEventListener("click", () => {
            if (!this.liked) {
                this.liked = !this.liked
                notLike.style.display = 'none';
                clickLike.style.display = "flex";
            } else {
                this.liked = !this.liked
                clickLike.style.display = 'none';
                notLike.style.display = "flex";
            }
        });

        return card;
    }
}


const products = [{
        title: "Бокорезы Hesler 160 мм (DP160)",
        stock: 10,
        weight: 500,
        length: 200,
        price: "28 030 ",
        discountPrice: "24 320 ",
        image: "../img/tushenka.png"
    },
    {
        title: "Валик полиакрил для водной основы с ручкой ",
        stock: 10,
        weight: 500,
        length: 200,
        price: "28 030 ",
        discountPrice: "24 320 ",
        image: "../img/tushenka.png"
    },
    {
        title: "Конина тушеная Улан, есть возможность в 2 строки",
        stock: 10,
        weight: 500,
        length: 200,
        price: "28 030 ",
        discountPrice: "24 320 ",
        image: "../img/tushenka.png"
    },
    {
        title: "Конина тушеная Улан, есть возможность в 2 строки",
        stock: 10,
        weight: 500,
        length: 200,
        price: "28 030 ",
        discountPrice: "24 320 ",
        image: "../img/tushenka.png"
    },
];

const productContainer = document.getElementById("body__card");
const productContainer2 = document.getElementById("body__card2");
const productContainer3 = document.getElementById("body__card3");

if (productContainer) {
    products.forEach(productData => {
        const productCard = new ProductCard(productData);
        productContainer.appendChild(productCard.render());
    });
} else {
    console.error("Error: No element with ID 'body__card' found.");
}

if (productContainer2) {
    products.forEach(productData => {
        const productCard = new ProductCard(productData);
        productContainer2.appendChild(productCard.render());
    });
} else {
    console.error("Error: No element with ID 'body__card' found.");
}

if (productContainer3) {
    [...products, ...products].forEach(productData => {
        const productCard = new ProductCard(productData);
        productContainer3.appendChild(productCard.render());
    });
} else {
    console.error("Error: No element with ID 'body__card' found.");
}