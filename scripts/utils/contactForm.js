const main = document.getElementById("main");
function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
    main.style.display="none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    main.style.display="block";
}



const sendContact = (event) => {
    event.preventDefault();
    const firstname=document.getElementById("firstname");
    const name=document.getElementById("name");
    const email=document.getElementById("email");
    const message=document.getElementById("message");
    console.log("Votre prénom : "+firstname.value);
    console.log("Votre nom : "+name.value);
    console.log("Votre email : "+email.value);
    console.log("Votre message : "+message.value);
};
const contactForm = document.getElementById("contact-form");
  if(!!contactForm){
    contactForm.addEventListener("submit", sendContact);
  }