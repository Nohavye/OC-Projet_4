import { RegistrationModal } from "./registrationForm.js";

document.querySelector(".icon").onclick = () => {

  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {

    x.className += " responsive";
  } else {
    
    x.className = "topnav";
  }
}

const modal = new RegistrationModal;