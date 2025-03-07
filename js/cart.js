const products = [
  {
    id: 1,
    title: "M&M's шоколадные конфеты 130гр",
    price: 820,
    count: 1,
    image: "../img/valik.png",
  },
  {
    id: 2,
    title: "M&M's шоколадные конфеты 130гр",
    price: 820,
    count: 2,
    image: "../img/valik.png",
  },
  {
    id: 3,
    title: "M&M's шоколадные конфеты 130гр",
    price: 820,
    count: 2,
    image: "../img/valik.png",
  },
  {
    id: 4,
    title: "M&M's шоколадные конфеты 130гр",
    price: 820,
    count: 2,
    image: "../img/valik.png",
  },
];

function renderCart() {
  const cart = document.getElementById("cart");
  cart.innerHTML = "";

  products.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.dataset.id = product.id;
    item.innerHTML = `
            <img src="${product.image}" alt="Product">
            <div class="info">
                <p class="text-lg limit2 ">${product.title}</p>
                <span class="text-gray-700 text-sm">Осталось: <span class="stock-count">${
                  product.count
                }</span> шт.</span>
            </div>
            <div class="wrap__quantity">
            <div class="quantity">
                <button class="decrease text-yellow-500" data-action="decrease">
                    <i class="ri-subtract-line"></i>
                </button>
                <span class="count-value">${product.count}</span>
                <button class="increase text-yellow-500" data-action="increase">
                    <i class="ri-add-line"></i>
                </button>
            </div>
            <div class="wrap__price">
                <p class="total">${product.price * product.count} ₽</p>
                <span class="text-gray-700">410 ₽/шт.</span>
            </div>
            </div>
            <span class="remove text-gray-700" data-action="remove">
                <i class="ri-close-fill text-2xl"></i>
            </span>
        `;
    cart.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  const cart = document.getElementById("cart");

  cart.addEventListener("click", (e) => {
    const item = e.target.closest(".cart-item");
    if (!item) return;

    const itemId = parseInt(item.dataset.id);
    const product = products.find((p) => p.id === itemId);
    const action = e.target.closest("[data-action]")?.dataset.action;

    if (!product) return;

    if (action === "remove") {
      const index = products.findIndex((p) => p.id === itemId);
      if (index !== -1) {
        products.splice(index, 1);
        renderCart();
        if (products.length === 0) {
          window.location.href = "../index.html";
        }
      }
    }

    if (action === "increase") {
      product.count++;
      updateItemUI(item, product);
    }

    if (action === "decrease") {
      if (product.count > 1) {
        product.count--;
        updateItemUI(item, product);
      }
    }
  });
});

function updateItemUI(item, product) {
  item.querySelector(".count-value").textContent = product.count; // Update quantity
  item.querySelector(".stock-count").textContent = product.count; // Update remaining stock
  item.querySelector(".total").textContent = `${
    product.price * product.count
  } ₽`; // Update total price
}

document.getElementById("remove__all").addEventListener("click", () => {
  products.length = 0;
  window.location.href = "../index.html";
  renderCart();
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
    liked = false,
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
            <a href='../page/single-card.html' class="text-lg font-medium text-black limit2 min-h-11">${this.title}</a>
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
        this.liked = !this.liked;
        notLike.style.display = "none";
        clickLike.style.display = "flex";
      } else {
        this.liked = !this.liked;
        clickLike.style.display = "none";
        notLike.style.display = "flex";
      }
    });

    return card;
  }
}

const products2 = [
  {
    title: "Бокорезы Hesler 160 мм (DP160)",
    stock: 10,
    weight: 500,
    length: 200,
    price: "28 030 ",
    discountPrice: "24 320 ",
    image: "../img/valik.png",
  },
  {
    title: "Валик полиакрил для водной основы с ручкой ",
    stock: 10,
    weight: 500,
    length: 200,
    price: "28 030 ",
    discountPrice: "24 320 ",
    image: "../img/valik.png",
  },
  {
    title: "Конина тушеная Улан, есть возможность в 2 строки",
    stock: 10,
    weight: 500,
    length: 200,
    price: "28 030 ",
    discountPrice: "24 320 ",
    image: "../img/valik.png",
  },
  {
    title: "Конина тушеная Улан, есть возможность в 2 строки",
    stock: 10,
    weight: 500,
    length: 200,
    price: "28 030 ",
    discountPrice: "24 320 ",
    image: "../img/valik.png",
  },
];

const productContainer = document.getElementById("simple__products");

if (productContainer) {
  [...products2].forEach((productData) => {
    const productCard = new ProductCard(productData);
    productContainer.appendChild(productCard.render());
  });
} else {
  console.error("Error: No element with ID 'body__card' found.");
}

document.getElementById("go__order").addEventListener("click", function () {
  window.location.href = "./order.html";
});
