document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const modalDescription = document.querySelector(".modal-description .description-text");
    const closeBtn = document.querySelector(".close");

    galleryItems.forEach(item => {
        item.addEventListener("click", function () {
            const imageSrc = item.querySelector("img").src;
            const descriptionContent = item.querySelector(".description-text").innerHTML;

            modal.style.display = "block";
            modalContent.src = imageSrc;
            modalDescription.innerHTML = descriptionContent;
        });
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});