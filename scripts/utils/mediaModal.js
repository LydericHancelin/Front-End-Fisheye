const img = document.querySelector(".imgItem");
const video = document.querySelector(".videoItem");
const modal = document.getElementById("media_modal");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton"); 
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
    video.setAttribute("controls", false);
	modal.style.display = "flex";
    updateModal(mediaLink);
}

function closeMediaModal() {
    document.body.style.overflow = "auto";
    modal.style.display = "none";
}

function updateModal(src) {
    const index = currentPhotos.findIndex(photo => {
        return `assets/media/${isPhoto(photo) ? photo.image : photo.video}` === src
    });
    const {previousSrc, nextSrc} = getPreviousAndNextSources(index);
    if(isPhoto(currentPhotos[index])){
        img.setAttribute("src", src);
    }
    else{
        video.setAttribute("src", src);
    }
    nextButton.onclick = function(){ updateModal(`assets/media/${nextSrc}`)};
    previousButton.onclick = function(){ updateModal(`assets/media/${previousSrc}`)};
}

function getPreviousAndNextSources(index){
    //trouver objets prev, next. définir si photo ou video. Construire les sources
    const previousSrc = (currentPhotos[index-1].image ? currentPhotos[index-1].image : currentPhotos[index-1].video);
    const nextSrc = (currentPhotos[index+1].image ? currentPhotos[index+1].image : currentPhotos[index-1].video);
    console.log("next : ",nextSrc);
    console.log("previous : ",previousSrc);
    return {previousSrc,nextSrc}
}

function isPhoto(photo){
    return !!photo.image 
}