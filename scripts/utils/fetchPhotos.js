/* eslint-disable no-unused-vars */
async function getPhotos () {
  // On récupère l'ensemble des données du json pour le parcourir
  const response = await fetch('photographers.json')
  if (!response.ok) {
    return []
  }

  const body = await response.json()
  const photos = body.media
  return photos
}

async function getPhotoById (id) {
  const photos = await getPhotos()
  const found = photos.find(element => {
    return element.id === id
  })
  return found
}

async function getPhotoByPhotographerId (id) {
  const photos = await getPhotos()
  const found = photos.filter(element => element.photographerId === id)
  if (getSelectedFilter() === 'likes') {
    found.sort((a, b) => b.likes - a.likes)
  }
  if (getSelectedFilter() === 'date') {
    found.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  if (getSelectedFilter() === 'title') {
    found.sort((a, b) => a.title.localeCompare(b.title))
  }
  return found
}

async function getNbLikesByPhotographerId (id) {
  const found = await getPhotoByPhotographerId(id)
  const totalLikes = found.reduce((acc, photos) => acc + photos.likes, 0)
  return totalLikes
}

function getSelectedFilter () {
  const selectElmt = document.getElementById('filter')
  const valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value
  return valeurselectionnee
}
