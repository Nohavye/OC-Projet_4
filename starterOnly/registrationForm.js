const dElements = {

  // Modal Elements
  modalBackground: document.querySelector(".bground"),
  modalContent: document.querySelector(".content"),
  openModalButtons: document.querySelectorAll(".modal-btn"),
  closeModalButton: document.querySelector(".close"),
}

let map_formElements = new Map();

const firstName = document.querySelector(".text-first");
map_formElements.set(firstName, { type: 'text', regularExpression: /^[a-zA-z]{2}/, required: true, validated: false });

const lastName = document.querySelector(".text-last");
map_formElements.set(lastName, { type: 'text', regularExpression: /^[a-zA-z]{2}/, required: true, validated: false });

const eMail = document.querySelector(".text-email");
map_formElements.set(eMail, { type: 'text', regularExpression: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, required: true, validated: false });

const birthdate = document.querySelector(".text-birthdate");
map_formElements.set(birthdate, { type: 'text', regularExpression: /.{1}/, required: true, validated: false });

const quantity = document.querySelector(".text-quantity");
map_formElements.set(quantity, { type: 'text', regularExpression: /^[0-9]/, required: true, validated: false });

const checkBoxsLocation = document.querySelectorAll(".checkbox-input-location");
map_formElements.set(checkBoxsLocation, { type: 'checkboxlist', required: true, validated: false });

const checkBoxTerms = document.querySelector(".checkbox-input-terms");
map_formElements.set(checkBoxTerms, { type: 'checkbox', required: true, validated: false });

const checkBoxInputNewsLetters = document.querySelector(".checkbox-input-newsletters");
map_formElements.set(checkBoxInputNewsLetters, { required: false, validated: false });

const submitButton = document.querySelector(".btn-submit");
map_formElements.set(submitButton, { required: false, validated: false });

const timeoutClose = 500;


export class RegistrationModal {

  constructor() {

    // Modal Style
    dElements.modalBackground.style.transition = `opacity ${timeoutClose}ms`;
    dElements.modalContent.style.transition = `opacity ${timeoutClose}ms`;

    // Modal Events
    dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#visibleModal.bind(this, true)));
    dElements.closeModalButton.addEventListener("click", this.#visibleModal.bind(this, false));

    // Form Events
    map_formElements.forEach((value, key, map) => {

      switch(value.type) {

        case 'text':
          this.#testInput_text(key, value);
          key.addEventListener("input", this.#testInput_text.bind(this, key, value));
          break;

        case 'checkboxlist':
          this.#testInput_checkBoxList(key, value);
          key.forEach((checkbox) => checkbox.addEventListener("input", this.#testInput_checkBoxList.bind(this, key, value)));
          break;

        case 'checkbox':
          this.#testInput_checkBox(key, value);
          key.addEventListener("input", this.#testInput_checkBox.bind(this, key, value));
          break; 

        default:
          //console.log('default');
      }

    });


    // this.#formIsValid();
  }

  #visibleModal(isVisible) {

    if(isVisible) {

      dElements.modalBackground.style.display = "block";
      dElements.modalBackground.style.opacity = "1";
      dElements.modalContent.style.opacity = "1";
    } else {
  
      dElements.modalBackground.style.opacity = "0";
      dElements.modalContent.style.opacity = "0";
        
      setTimeout(function() {
        dElements.modalBackground.style.display = "none";
      }, timeoutClose);
    }
  }

  #testInput_text(key, value) {

    if(key.value != "" && value.regularExpression.test(key.value)) {
      key.style.color = "black";
      key.style.border = "0px";
      value.validated = true;
    } else {
      key.style.color = "red";
      key.style.border = "2px solid red";
      value.validated = false;
    }

    this.#checkFormValidity();
  }

  #testInput_checkBoxList(key, value) {

    value.validated = false;

    key.forEach((checkbox) => { if(checkbox.checked) {
      value.validated = true;
    }});

    this.#checkFormValidity();
  }

  #testInput_checkBox(key, value) {
    value.validated = key.checked;
    this.#checkFormValidity();
  }

  #checkFormValidity() {

    console.log('--------------------------------------------');
    console.log('--------------------------------------------');
    for(let value of map_formElements.values()) {
      if(value.required) { console.log(value); }
    }

    let formIsValid = true;

    for(let value of map_formElements.values()) {
      if(value.required) {
        if(!value.validated) {
          formIsValid = false;
          break;
        }
      }
    }

    if(formIsValid) {
      submitButton.style.opacity = "1";
    } else {
      submitButton.style.opacity = "0.25";
    }
  }
}