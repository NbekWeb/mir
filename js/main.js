const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

function toggleSearchResult() {
    if (searchInput.value.trim() !== "") {
        searchResult.style.display = "block";
    } else {
        searchResult.style.display = "none";
    }
}

searchInput.addEventListener("input", toggleSearchResult);
searchInput.addEventListener("focus", toggleSearchResult);

document.addEventListener("click", (event) => {
    if (!searchInput.contains(event.target) && !searchResult.contains(event.target)) {
        searchResult.style.display = "none";
    }
});

const moreModal = document.getElementById("more__modal");
const moreModalWrap = document.getElementById("more__modal__wrap");

document.addEventListener("click", (event) => {
    if (moreModal.contains(event.target) && moreModalWrap.style.display !== "flex") {
        moreModalWrap.style.display = "flex";
        document.body.style.overflowY = "hidden";
    } else {
        moreModalWrap.style.display = "none";
        document.body.style.overflowY = "";
    }
});

const listItems = document.querySelectorAll(".more__modal__main li");

listItems.forEach((li) => {
    li.addEventListener("click", (event) => {
        event.stopPropagation();
        listItems.forEach((item) => {
            item.classList.remove("text-yellow-500");
            const icon = item.querySelector("i");
            if (icon) {
                icon.classList.remove("rotate-180");
            }
        });

        li.classList.add("text-yellow-500");

        const icon = li.querySelector("i");
        if (icon) {
            icon.classList.add("rotate-180");
        }
    });
});