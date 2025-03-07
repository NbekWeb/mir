document.querySelectorAll(".result__filtr").forEach((container) => {
  const minRange = container.querySelector(".minRange");
  const maxRange = container.querySelector(".maxRange");
  const minValue = container.querySelector(".minValue");
  const maxValue = container.querySelector(".maxValue");
  const track = container.querySelector(".slider-track");
  const main = container.closest("main");

  function updateSlider(event) {
    let min = parseInt(minRange.value);
    let max = parseInt(maxRange.value);
    main.classList.toggle("empty");

    if (max - min < 160) {
      if (event.target === minRange) {
        minRange.value = max - 160;
        min = max - 160;
      } else {
        maxRange.value = min + 160;
        max = min + 160;
      }
    }

    minValue.textContent = min + "₽";
    maxValue.textContent = max + "₽";

    let minPercent = (min / minRange.max) * 100;
    let maxPercent = (max / maxRange.max) * 100;

    track.style.left = minPercent + "%";
    track.style.width = maxPercent - minPercent + "%";

    minValue.style.left = `calc(${minPercent}% - 20px)`;
    maxValue.style.left = `calc(${maxPercent}% - 20px)`;
  }

  minRange.addEventListener("input", updateSlider);
  maxRange.addEventListener("input", updateSlider);

  updateSlider();
});

document.querySelectorAll('input[name="date"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    console.log("Selected:", radio.value);
  });
});

document.querySelectorAll('input[name="filter"]').forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    console.log(
      "Selected filters:",
      Array.from(document.querySelectorAll('input[name="filter"]:checked')).map(
        (cb) => cb.value
      )
    );
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const select = document.querySelector(".custom__select");
  const arrow = select.querySelector("i");
  const dropdown = select.querySelector("ul");

  select.addEventListener("click", () => {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    arrow.classList.toggle("rotate-180");
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      dropdown.style.display = "none";
      arrow.classList.remove("rotate-180");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modalBtn = document.getElementById("open__modal__btn");
  const closeBtn = document.getElementById("close__btn");
  const modalContent = document.getElementById("modal__content");

  if (modalBtn) {
    modalBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      document.body.classList.add("open__modal");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.body.classList.remove("open__modal");
    });
  }

  // Prevent clicks inside the modal from propagating to the document
  if (modalContent) {
    modalContent.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  // Close modal when clicking outside modal content
  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("open__modal") &&
      event.target !== modalBtn // Allow opening the modal
    ) {
      document.body.classList.remove("open__modal");
    }
  });
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

const products = [
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
];

const productContainer = document.getElementById("result__products");
const productContainer2 = document.getElementById("interest__products");

if (productContainer) {
  [...products, ...products, ...products].forEach((productData) => {
    const productCard = new ProductCard(productData);
    productContainer.appendChild(productCard.render());
  });
} else {
  console.error("Error: No element with ID 'body__card' found.");
}

if (productContainer2) {
  [
    ...products,
    {
      title: "Конина тушеная Улан, есть возможность в 2 строки",
      stock: 10,
      weight: 500,
      length: 200,
      price: "28 030 ",
      discountPrice: "24 320 ",
      image: "../img/valik.png",
    },
  ].forEach((productData) => {
    const productCard = new ProductCard(productData);
    productContainer2.appendChild(productCard.render());
  });
} else {
  console.error("Error: No element with ID 'body__card' found.");
}
