/* eslint-disable no-unused-vars */
async function getPhotographers () {
  // Penser à remplacer par les données récupérées dans le json
  const response = await fetch('/data/photographers.json')
  if (!response.ok) {
    return []
  }

  const body = await response.json()
  const photographers = body.photographers
  // et bien retourner le tableau photographers seulement une fois
  return photographers
}

async function getPhotographerById (id) {
  const photographers = await getPhotographers()
  const found = photographers.find(element => {
    return element.id === id
  })
  return found
}
