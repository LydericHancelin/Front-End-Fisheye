const img = document.querySelector(".imgItem");
const video = document.querySelector(".videoItem");
const modal = document.getElementById("media_modal");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
const closeButton = document.getElementById("closeButton");
const body = document.body;


function displayPhotoModal(mediaLink) {
    body.style.overflow = "hidden";
    img.style.display="block";
    video.style.display="none";
	modal.style.display = "flex";
    updateModal(mediaLink);
}

function displayVideoModal(mediaLink) {
    body.style.overflow = "hidden";
    video.style.display="block";
    img.style.display="none";
	modal.style.display = "flex";
    updateModal(mediaLink);
}

function closeMediaModal() {
    document.body.style.overflow = "auto";
    modal.style.display = "none";
}
closeButton.addEventListener("click", closeMediaModal);

function updateModal(src) {
    const index = currentPhotos.findIndex(photo => {
        return `assets/media/${isPhoto(photo) ? photo.image : photo.video}` === src
    });
    const {previousSrc, nextSrc} = getPreviousAndNextSources(index);
    if(isPhoto(currentPhotos[index])){
        video.style.display="none";
        img.style.display="block";
        img.setAttribute("src", src);
    }
    else{
        img.style.display="none";
        video.style.display="block";
        video.setAttribute("controls", false);
        video.setAttribute("src", src);
    }
    nextButton.classList.remove("hidden");
    previousButton.classList.remove("hidden");
    nextButton.onclick = function(){ updateModal(`assets/media/${nextSrc}`)};
    previousButton.onclick = function(){ updateModal(`assets/media/${previousSrc}`)};
    if(!currentPhotos[index+1]){
        nextButton.classList.add("hidden");
        nextButton.onclick=undefined;
    }
    if(!currentPhotos[index-1]){
        previousButton.classList.add("hidden");
        previousButton.onclick=undefined;
    }

}

function getPreviousAndNextSources(index){
    let previousSrc = currentPhotos[index];
    let nextSrc = currentPhotos[index];
    if(!!currentPhotos[index-1]){
        previousSrc = (isPhoto(currentPhotos[index-1]) ? currentPhotos[index-1].image : currentPhotos[index-1].video);
    }
    if(!!currentPhotos[index+1]){
        nextSrc = (isPhoto(currentPhotos[index+1]) ? currentPhotos[index+1].image : currentPhotos[index-1].video);
    }
    return {previousSrc,nextSrc}
}

function isPhoto(photo){
    return !!photo.image
}