/* eslint-disable no-unused-vars */
async function getPhotographers () {
  // On récupère l'ensemble des données liées aux photographes dans le json
  const response = await fetch('/data/photographers.json')
  if (!response.ok) {
    return []
  }

  const body = await response.json()
  const photographers = body.photographers
  return photographers
}

async function getPhotographerById (id) {
  const photographers = await getPhotographers()
  const found = photographers.find(element => {
    return element.id === id
  })
  return found
}
