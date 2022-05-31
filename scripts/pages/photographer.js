/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const photosIdLiked = []
let currentMedias = []

function getPhotographerIdInParams () {
  const url = new URL(window.location.href)
  const params = new URLSearchParams(url.search)
  const id = params.get('id')
  return parseInt(id)
}
function createMediaObject (media) {
  if (!!media.video) {
    return new Video(media)
  }
  return new Image(media)
}
function photographerPage (photographer) {
  function getUserCardDOM () {
    const article = document.createElement('article')
    const h2 = document.createElement('h2')
    h2.textContent = photographer.name
    const h3 = document.createElement('h3')
    h3.textContent = photographer.city + ', ' + photographer.country
    const p = document.createElement('p')
    p.textContent = photographer.tagline
    article.appendChild(h2)
    article.appendChild(h3)
    article.appendChild(p)
    return (article)
  }
  const picture = `assets/photographers/${photographer.portrait}`

  function handlePhotoLike (id, count, $element) {
    if (photosIdLiked.includes(id)) {
      const index = photosIdLiked.indexOf(id)
      if (index > -1) {
        photosIdLiked.splice(index, 1)
        $element.textContent = `${parseInt(count)} ♥`
        $element.className = ''
        $element.classList.add('disliked')
      }
    } else {
      photosIdLiked.push(id)
      $element.textContent = `${parseInt(count) + 1} ♥`
      $element.className = ''
      $element.classList.add('liked')
    }
    updateUserTotalLikes(photographer.id, photosIdLiked.length)
  }

  function getUserProfilPic () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', photographer.name)
    return img
  }

  // fonction qui crée et place dans une grid l'ensemble des méidas du photographe
  function getUserPictures (photos) {
    const grid = document.createElement('div')
    photos.forEach(photo => {
      const gridItem = document.createElement('div')
      const itemInfos = document.createElement('div')
      const itemTitle = document.createElement('h3')
      itemTitle.textContent = photo.title
      const itemLikes = document.createElement('button')
      itemLikes.setAttribute('type', 'button')
      itemLikes.addEventListener('click', (event) => handlePhotoLike(photo.id, photo.likes, event.target))
      if (photosIdLiked.includes(photo.id)) {
        itemLikes.textContent = `${parseInt(photo.likes) + 1} ♥`
      } else {
        itemLikes.textContent = `${photo.likes} ♥`
      }
      const media = createMediaObject(photo)
      const mediaHtml = media.createHtml()
      mediaHtml.setAttribute('tabindex', '0')
      gridItem.appendChild(mediaHtml)
      itemInfos.appendChild(itemTitle)
      itemInfos.appendChild(itemLikes)
      gridItem.appendChild(itemInfos)
      grid.appendChild(gridItem)
    })
    return grid
  }

  // Cette fonction permet de remplir les données de l'encadré en bas à droite de la page du photographe
  function createPhotographerStats () {
    const divTotalLikes = document.createElement('div')
    divTotalLikes.classList.add('total-likes')
    const spanNbLikes = document.createElement('span')
    spanNbLikes.setAttribute('id', 'total-likes')
    const spanSalaire = document.createElement('span')
    spanSalaire.textContent = photographer.price + '€/jour.'
    divTotalLikes.appendChild(spanNbLikes)
    divTotalLikes.appendChild(spanSalaire)
    return divTotalLikes
  }

  // Met à jour le total de likes de l'utilisateur
  async function updateUserTotalLikes (id, sum = 0) {
    const spanNbLikes = document.getElementById('total-likes')
    if (spanNbLikes) {
      const totalLikes = await getNbLikesByPhotographerId(id)
      spanNbLikes.textContent = `${parseInt(totalLikes) + sum} ♥`
    }
  }

  return { getUserCardDOM, getUserProfilPic, getUserPictures, updateUserTotalLikes, createPhotographerStats }
}

async function createPhotographerPictures (photographerId, photographerModel) {
  const photos = await getPhotoByPhotographerId(photographerId)
  currentMedias = photos.map((photo) => { return createMediaObject(photo) })
  const main = document.querySelector('main')
  const photoGrid = photographerModel.getUserPictures(photos)
  photoGrid.classList.add('photo-grid')
  const oldGrid = document.querySelector('.photo-grid')
  if (oldGrid) {
    main.replaceChild(photoGrid, oldGrid)
  } else {
    main.append(photoGrid)
  }
  await photographerModel.updateUserTotalLikes(photographerId)
}

async function init () {
  const photographHeader = document.querySelector('.photograph-header')
  const buttonC = document.querySelector('.contact_button')
  const parentDiv = buttonC.parentNode
  const id = getPhotographerIdInParams()
  const photographer = await getPhotographerById(id)

  const photographerModel = photographerPage(photographer)
  const userCardDOM = photographerModel.getUserCardDOM()
  parentDiv.insertBefore(userCardDOM, buttonC)
  const userPic = photographerModel.getUserProfilPic()
  photographHeader.appendChild(userPic)

  const photographerStats = photographerModel.createPhotographerStats()
  main.append(photographerStats)

  const filter = document.getElementById('filter')
  filter.addEventListener('change', function () {
    createPhotographerPictures(photographer.id, photographerModel)
  })
  await createPhotographerPictures(photographer.id, photographerModel)
}

init()
