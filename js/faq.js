document.querySelectorAll(".faq__question ul li").forEach((item) => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".faq__question ul li").forEach((li) => {
            li.classList.remove("active");
        });
        this.classList.add("active");
    });
});

document.getElementById("open__modal").addEventListener("click", function () {
    document.body.classList.add("open__modal");

});

function closeModal() {
    document.body.classList.remove("open__modal");
}

document.getElementById("close__btn").addEventListener("click", function () {
    closeModal()
});

document.addEventListener("click", function (event) {
    const modal = document.getElementById("modal__content");
    const openModalButton = document.getElementById("open__modal");

    if (event.target !== openModalButton) {
        closeModal()
    }
});


document.querySelectorAll(".faq__main li").forEach((item) => {
    item.addEventListener("click", () => {
        const icon = item.querySelector(".rotate-180");
        icon.classList.toggle("rotate");
    });
});

document.getElementById("modal__content").addEventListener("click", (event) => {
    event.stopPropagation();
});