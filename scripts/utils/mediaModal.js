const img = document.querySelector(".imgItem");
const video = document.querySelector(".videoItem");

function displayPhotoModal(mediaLink) {
    const modal = document.getElementById("media_modal");
    const body = document.body;
    body.style.overflow = "hidden";
    img.style.display="block";
    video.style.display="none";
    img.setAttribute("src", mediaLink);
	modal.style.display = "flex";
}

function displayVideoModal(mediaLink) {
    const modal = document.getElementById("media_modal");
    const body = document.body;
    body.style.overflow = "hidden";
    video.style.display="block";
    img.style.display="none";
    video.setAttribute("src", mediaLink);
    video.setAttribute("controls", false);
	modal.style.display = "flex";
}

function closeMediaModal() {
    const modal = document.getElementById("media_modal");
    document.body.style.overflow = "auto";
    modal.style.display = "none";
}