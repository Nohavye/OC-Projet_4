import { RegistrationModal } from "./registrationForm.js";

const dElements = {
  formData: document.querySelectorAll(".formData")
}

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const modal = new RegistrationModal;