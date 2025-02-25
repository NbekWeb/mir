class ProductCard {
    constructor({
        title,
        stock,
        weight,
        length,
        price,
        discountPrice,
        image
    }) {
        this.title = title;
        this.stock = stock;
        this.weight = weight;
        this.length = length;
        this.price = price;
        this.discountPrice = discountPrice;
        this.image = image;
        this.count = 0;
    }

    increaseCount() {
        if (this.count < this.stock) {
            this.count++;
        }
    }

    decreaseCount() {
        if (this.count > 0) {
            this.count--;
        }
    }

    render() {
        const card = document.createElement("div");
        card.className = "product__card";
        card.innerHTML = `
        <img src="${this.image}" alt="${this.title}" />
        <span class="text-lg font-medium text-black">${this.title}</span>
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
          <div class="price__btn not__click" id="cartButton">
            <span class="in__basket text-white text-15">В корзину</span>
            <div class="basket__count text-yellow-500 font-bold text-2xl" style="display: none;">
              <i class="ri-subtract-line" id="decrease"></i>
              <span class="text-xl text-dark-300 font-light" id="count">${this.count}</span>
              <i class="ri-add-line" id="increase"></i>
            </div>
          </div>
        </div>
      `;

        const increaseBtn = card.querySelector("#increase");
        const decreaseBtn = card.querySelector("#decrease");
        const countSpan = card.querySelector("#count");
        const cartButton = card.querySelector("#cartButton");
        const basketCount = card.querySelector(".basket__count");
        const inBasket = card.querySelector(".in__basket");

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

        return card;
    }
}

export default ProductCard;