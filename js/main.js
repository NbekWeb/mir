const searchInputs = document.querySelectorAll(".searchInput");
const searchResults = document.querySelectorAll(".searchResult");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
const menuOpen = document.getElementById("menuOpen");

menuOpen.addEventListener("click", () => {
    mobileMenu.classList.add("open");
});

menuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
});


function toggleSearchResult(input, result) {
  if (input.value.trim() !== "") {
    result.style.display = "block";
  } else {
    result.style.display = "none";
  }
}

searchInputs.forEach((input, index) => {
  const result = searchResults[index];

  if (!result) return;

  input.addEventListener("input", () => toggleSearchResult(input, result));
  input.addEventListener("focus", () => toggleSearchResult(input, result));

  document.addEventListener("click", (event) => {
    if (!input.contains(event.target) && !result.contains(event.target)) {
      result.style.display = "none";
    }
  });
});

const moreModal = document.getElementById("more__modal");
const moreModalWrap = document.getElementById("more__modal__wrap");

document.addEventListener("click", (event) => {
  if (moreModal.contains(event.target)) {
    moreModalWrap.style.display = "flex";
    document.body.style.overflowY = "hidden";
  } else if (!moreModalWrap.contains(event.target)) {
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

