import { ModalDialogBox } from "./modalDialogBox.js";
import { dElements } from "./variables.js";

document.querySelector(".icon").onclick = () => {

  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {

    x.className += " responsive";
  } else {
    
    x.className = "topnav";
  }
}

// Création d'une instance de la classe ModalDialogBox.
const modalDialogBox = new ModalDialogBox;

/*Récupération des données du formulaire sur l'évenement 'afterSubmission'
  pour un éventuel envoi vers un serveur de données. */

dElements.form.addEventListener('afterSubmission', () => {

  console.log(`Prénom: ${modalDialogBox.answers.firstName}`);
  console.log(`Nom: ${modalDialogBox.answers.lastName}`);
  console.log(`Email: ${modalDialogBox.answers.eMail}`);
  console.log(`Date de naissance: ${modalDialogBox.answers.birthdate}`);
  console.log(`Nombre de tournoi déjà fait: ${modalDialogBox.answers.quantity}`);
  console.log(`Lieu du tournoi d'inscription: ${modalDialogBox.answers.location}`);
  console.log(`Termes et conditions: ${modalDialogBox.answers.terms}`);
  console.log(`Renseignements: ${modalDialogBox.answers.newsLetters}`);
});
