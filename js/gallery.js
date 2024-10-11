const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: false,
  slidesPerView: 3,
  spaceBetween: 30,
  slideClass: "gallery-item",
  wrapperClass: "gallery-list",
  centeredSlides: false,
  noSwiping: true,
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("../gallery-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let galleryData = data.gallery;
      const galleryList = document.getElementById("gallery");

      if (!galleryList) {
        return;
      }
      galleryList.innerHTML = "";

      galleryData.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("gallery-item", "swiper-slide");

        li.innerHTML = `
            <img src="${item.photo}" alt="${item.title}" class="gallery-item-img">
          `;
        galleryList.appendChild(li);
      });

      swiper.update();
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
