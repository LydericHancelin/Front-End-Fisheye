const main = document.getElementById('main')
const buttonOpenModal = document.getElementById('contact_modal_open')
const buttonCloseModal = document.getElementById('contact_modal_close')

function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'flex'
  main.style.display = 'none'
}

function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
  main.style.display = 'block'
}

buttonOpenModal.addEventListener('click', displayModal)
buttonCloseModal.addEventListener('click', closeModal)

const sendContact = (event) => {
  event.preventDefault()
  const firstname = document.getElementById('firstname')
  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const message = document.getElementById('message')
  console.log('Votre prénom : ' + firstname.value)
  console.log('Votre nom : ' + name.value)
  console.log('Votre email : ' + email.value)
  console.log('Votre message : ' + message.value)
}
const contactForm = document.getElementById('contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', sendContact)
}
