// eslint-disable-next-line no-unused-vars
function photographerFactory (data) {
  const { name, portrait, city, country, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`

  const urlParams = new URLSearchParams({ id }).toString()

  function getUserCardDOM () {
    const article = document.createElement('article')
    const link = 'photographer.html?' + urlParams
    const a = document.createElement('a')
    a.setAttribute('href', link)
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    const h2 = document.createElement('h2')
    h2.textContent = name
    a.appendChild(img)
    a.appendChild(h2)
    const h3 = document.createElement('h3')
    h3.textContent = city + ', ' + country
    const p = document.createElement('p')
    p.textContent = tagline
    const priceperday = document.createElement('span')
    priceperday.textContent = price + '€/jour'
    article.appendChild(a)
    article.appendChild(h3)
    article.appendChild(p)
    article.appendChild(priceperday)
    return (article)
  }

  return { getUserCardDOM }
}
