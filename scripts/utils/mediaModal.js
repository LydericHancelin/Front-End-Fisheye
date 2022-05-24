const modal = document.getElementById("media_modal");
const closeButton = document.getElementById("closeButton");
const body = document.body;

function openMediaModal(media) {
    body.style.overflow = "hidden";
    modal.style.display = "flex";
    media.displayContent(currentMedias);
}
function closeMediaModal() {
    body.style.overflow = "auto";
    modal.style.display = "none";
}

closeButton.addEventListener("click", closeMediaModal);