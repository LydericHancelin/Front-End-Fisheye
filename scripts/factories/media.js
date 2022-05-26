/* eslint-disable no-undef */
class Media {
  constructor ({ title }) {
    this.title = title
    this.img = document.querySelector('.imgItem')
    this.video = document.querySelector('.videoItem')
    this.nextButton = document.getElementById('nextButton')
    this.previousButton = document.getElementById('previousButton')
  }

  getPreviousAndNextMedias (currentMedias, index) {
    let previousMedia = currentMedias[index]
    let nextMedia = currentMedias[index]
    if (currentMedias[index - 1]) {
      previousMedia = currentMedias[index - 1]
    }
    if (currentMedias[index + 1]) {
      nextMedia = currentMedias[index + 1]
    }
    return { previousMedia, nextMedia }
  }

  updatePreviousAndNextButton (currentMedias, index) {
    const { previousMedia, nextMedia } = this.getPreviousAndNextMedias(currentMedias, index)
    nextButton.classList.remove('hidden')
    previousButton.classList.remove('hidden')
    nextButton.onclick = function () { openMediaModal(nextMedia) }
    previousButton.onclick = function () { openMediaModal(previousMedia) }
    if (!currentMedias[index + 1]) {
      nextButton.classList.add('hidden')
      nextButton.onclick = undefined
    }
    if (!currentMedias[index - 1]) {
      previousButton.classList.add('hidden')
      previousButton.onclick = undefined
    }
  }
}

// eslint-disable-next-line no-unused-vars
class Image extends Media {
  constructor ({ image, title }) {
    super({ title })
    this.src = `assets/media/${image}`
  }

  createHtml () {
    const itemPhoto = document.createElement('img')
    itemPhoto.setAttribute('src', this.src)
    itemPhoto.setAttribute('aria-label', this.title)
    itemPhoto.setAttribute('alt', this.title)
    itemPhoto.addEventListener('click', () => openMediaModal(this))

    itemPhoto.addEventListener('keydown', function (event) {
      if (event.code === 'Enter') {
        return openMediaModal(this)
      }
    }, true)
    return itemPhoto
  }

  displayContent (currentMedias) {
    const index = currentMedias.findIndex(media => {
      return media.src === this.src
    })
    this.updatePreviousAndNextButton(currentMedias, index)
    this.img.style.display = 'block'
    this.video.style.display = 'none'
    this.img.setAttribute('src', this.src)
  }
}
// eslint-disable-next-line no-unused-vars
class Video extends Media {
  constructor ({ video, title }) {
    super({ title })
    this.src = `assets/media/${video}`
  }

  createHtml () {
    const itemVideo = document.createElement('video')
    itemVideo.setAttribute('src', this.src)
    itemVideo.addEventListener('click', () => openMediaModal(this))
    itemVideo.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        openMediaModal(this)
      }
    }, true)
    itemVideo.textContent = this.title
    return itemVideo
  }

  displayContent (currentMedias) {
    const index = currentMedias.findIndex(media => {
      return media.src === this.src
    })
    this.updatePreviousAndNextButton(currentMedias, index)
    this.video.style.display = 'block'
    this.img.style.display = 'none'
    this.video.setAttribute('controls', false)
    this.video.setAttribute('src', this.src)
  }
}
