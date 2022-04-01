async function getPhotos() {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch("/data/photographers.json");
    if (!response.ok){
        return [];
    }

    const body = await response.json();
    const photos = body.media;
    // et bien retourner le tableau photographers seulement une fois
    return photos;
}

async function getPhotoById(id) {
    const photos = await getPhotos();
    const found = photos.find(element =>{
        return element.id === id;
    });
    return found;
}

async function getPhotoByPhotographerId(id){
    const photos = await getPhotos();
    const found = photos.filter(element => element.photographerId === id);
    return found;
}

async function getNbLikesByPhotographerId(id){
    const found = await getPhotoByPhotographerId(id);
    const totalLikes = found.reduce((acc,photos)=>acc+photos.likes,0);
    return totalLikes;
}

