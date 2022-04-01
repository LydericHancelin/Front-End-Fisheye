let photosIdLiked = [];
function getPhotographerIdInParams(){
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get("id");
    return parseInt(id);
}

function photographerPage(photographer) {
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const h2 = document.createElement( 'h2' );
        h2.textContent = photographer.name;
        const h3 = document.createElement( 'h3' );
        h3.textContent = photographer.city+", "+photographer.country;
        const p = document.createElement( 'p' );
        p.textContent = photographer.tagline;
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        return (article);
    }
    const picture = `assets/photographers/${photographer.portrait}`;

    function handlePhotoLike(id, count, $element){
        if (photosIdLiked.includes(id)){
            const index = photosIdLiked.indexOf(id);
            if (index > -1) {
                    photosIdLiked.splice(index, 1);
                    $element.textContent = `${parseInt(count)} ♥`
            }
        }else {
            photosIdLiked.push(id);
            console.log(photosIdLiked);
            $element.textContent = `${parseInt(count)+1} ♥`
        }
        getUserTotalLikes(photographer.id, photosIdLiked.length )
    }

    function getUserProfilPic() {
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        return img;
    }

    function getUserPictures(photos){

        const grid = document.createElement('div');
        grid.classList.add("photo-grid");
        photos.forEach(photo => {
            const gridItem = document.createElement('div');
            const itemInfos = document.createElement('div');
            const itemTitle = document.createElement('h3');
            itemTitle.textContent = photo.title;
            const itemLikes = document.createElement('button');
            itemLikes.setAttribute("type", "button");
            itemLikes.addEventListener("click", (event)=>handlePhotoLike(photo.id, photo.likes, event.target));
            itemLikes.textContent = `${photo.likes} ♥`;
            if (!!photo.video){
                const itemVideo = document.createElement('video');
                itemVideo.setAttribute("src", `assets/media/${photo.video}`);
                itemVideo.addEventListener("click", ()=>displayVideoModal(`assets/media/${photo.video}`));
                gridItem.appendChild(itemVideo);
            }
            if (!!photo.image){
                const itemPhoto = document.createElement('img');
                itemPhoto.setAttribute("src", `assets/media/${photo.image}`);
                itemPhoto.addEventListener("click", ()=>displayPhotoModal(`assets/media/${photo.image}`));
                gridItem.appendChild(itemPhoto);
            }
            itemInfos.appendChild(itemTitle);
            itemInfos.appendChild(itemLikes);
            gridItem.appendChild(itemInfos);
            grid.appendChild(gridItem);
        });
        return grid;
    }
    function createPhotographerStats(){
        const divTotalLikes = document.createElement('div');
        divTotalLikes.classList.add("total-likes");
        const spanNbLikes = document.createElement('span');
        spanNbLikes.setAttribute("id", "total-likes");
        const spanSalaire = document.createElement('span');
        spanSalaire.textContent = photographer.price + "€/jour.";
        divTotalLikes.appendChild(spanNbLikes);
        divTotalLikes.appendChild(spanSalaire);
        return divTotalLikes;
    }

    async function getUserTotalLikes(id,sum=0){
            const spanNbLikes = document.getElementById("total-likes");
            if(spanNbLikes){
                const totalLikes = await getNbLikesByPhotographerId(id);
                spanNbLikes.textContent = `${parseInt(totalLikes)+sum} ♥`;
            }
    }

    return { getUserCardDOM, getUserProfilPic, getUserPictures, getUserTotalLikes, createPhotographerStats }
}

async function init() {
    const photographHeader = document.querySelector(".photograph-header");
    const buttonC = document.querySelector(".contact_button");
    const parentDiv = buttonC.parentNode;
    const id = getPhotographerIdInParams();
    const photographer = await getPhotographerById(id);

    const photographerModel =  photographerPage(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    parentDiv.insertBefore(userCardDOM, buttonC);
    const userPic = photographerModel.getUserProfilPic();
    photographHeader.appendChild(userPic);

    const photos=await getPhotoByPhotographerId(photographer.id);
    const main = document.querySelector("main");
    const photoGrid = photographerModel.getUserPictures(photos);
    main.append(photoGrid);

    const photographerStats = photographerModel.createPhotographerStats();
    main.append(photographerStats);
    await photographerModel.getUserTotalLikes(photographer.id);
};

init();