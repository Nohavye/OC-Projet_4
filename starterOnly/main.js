import { RegistrationModal } from "./registrationForm.js";
import { dElements } from "./variables.js";

document.querySelector(".icon").onclick = () => {

  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {

    x.className += " responsive";
  } else {
    
    x.className = "topnav";
  }
}

const modal = new RegistrationModal;

dElements.registrationForm.addEventListener('afterSubmission', () => {

  console.log(`Prénom: ${modal.answers.firstName}`);
  console.log(`Nom: ${modal.answers.lastName}`);
  console.log(`Email: ${modal.answers.eMail}`);
  console.log(`Date de naissance: ${modal.answers.birthdate}`);
  console.log(`Nombre de tournoi déjà fait: ${modal.answers.quantity}`);
  console.log(`Lieu du tournoi d'inscription: ${modal.answers.location}`);
  console.log(`Termes et conditions: ${modal.answers.terms}`);
  console.log(`Renseignements: ${modal.answers.newsLetters}`);
});
