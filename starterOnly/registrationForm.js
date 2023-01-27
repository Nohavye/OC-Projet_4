import { dElements, map_formElements, messages, movableTag } from "./variables.js";

export class RegistrationModal {

  #timeOutClosing = 500;
  #messageElement = new movableTag("p");
  #messageElement_CheckBoxsList = new movableTag("p");
  #messageElement_CheckBox = new movableTag("p");

  answers = {

    firstName: "",
    lastName: "",
    eMail: "",
    birthdate: "",
    quantity: "",
    location: "",
    terms: true,
    newsLetters: false
  }

  

  constructor() {

    // Modal Style
    dElements.modalBackground.style.transition = `opacity ${this.#timeOutClosing}ms`;
    dElements.modalContent.style.transition = `opacity ${this.#timeOutClosing}ms`;

    // Modal Events
    dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#visibleModal.bind(this, true)));
    dElements.closeModalButton.addEventListener("click", this.#visibleModal.bind(this, false));
    map_formElements.get("submitButton").element.addEventListener("mouseenter", this.#submitButton_click.bind(this));
    
    dElements.registrationForm.onsubmit = (e) => {

      e.preventDefault();

      this.#setAnswers();
      this.#showSuccesfulMessage();

      dElements.registrationForm.dispatchEvent(new Event('afterSubmission'));
    }

    // Form Events
    for(let value of map_formElements.values()) {

      switch(value.type) {

        case 'text':
          this.#testInput_text(value);
          value.element.addEventListener("input", this.#testInput_text.bind(this, value));
          value.element.addEventListener("focus", this.#testMessage_text.bind(this, value, true));
          value.element.addEventListener("blur", this.#testMessage_text.bind(this, value, false));
          break;

        case 'checkboxlist':
          this.#testInput_checkBoxsList(value);
          value.element.forEach((checkbox) => checkbox.addEventListener("input", this.#testInput_checkBoxsList.bind(this, value)));

          this.#messageElement_CheckBoxsList.setContent(messages.checkBoxsLocation);
          this.#messageElement_CheckBoxsList.setplace(value.element[0].parentElement);


          break;

        case 'checkbox':
          this.#testInput_checkBox(value);
          value.element.addEventListener("input", this.#testInput_checkBox.bind(this, value));

          this.#messageElement_CheckBox.setContent(messages.checkBoxTerms);
          this.#messageElement_CheckBox.setplace(value.element.parentElement);

          break; 
      }
    }
  }

  #submitButton_click() {
    let value = this.#checkFormValidity();
    if(typeof(value) != 'undefined') {
      if(value.type = "text") { value.element.focus(); }
    }
  }
  
  #setAnswers() {

    const getLocationReply = () => {

      for(let checkbox of map_formElements.get("checkBoxsLocation").element) {
        if(checkbox.checked) {
          return checkbox.value;
        }
      }
    }

    this.answers.firstName = first.value.charAt(0).toUpperCase() + first.value.slice(1);
    this.answers.lastName = last.value.charAt(0).toUpperCase() + last.value.slice(1);
    this.answers.eMail = email.value;
    this.answers.birthdate = birthdate.value;
    this.answers.quantity = quantity.value;

    this.answers.location = getLocationReply();

    this.answers.terms = checkbox1.checked;
    this.answers.newsLetters = checkbox2.checked;
  }

  #showSuccesfulMessage() {

    dElements.registrationForm.style.display = "none";
      
    const successfulMsg = document.createElement("p");

    successfulMsg.textContent = `Félicitation ${this.answers.firstName} 
                                ! Votre inscription au tournoi de ${this.answers.location} à bien été prise en compte. 
                                Vous recevrez rapidement un mail de confirmation à l'adresse : ${this.answers.eMail}.`;

    successfulMsg.style.paddingTop = "225px";
    successfulMsg.style.paddingBottom = "325px";
    successfulMsg.style.paddingLeft = "50px";
    successfulMsg.style.paddingRight = "50px";
    successfulMsg.style.textAlign = "center";

    dElements.modalContent.appendChild(successfulMsg);
  }

  #testMessage_text(elementData, isFocused) {

    if(isFocused) {
      
      if(elementData.required) {
        
        this.#messageElement.setContent(messages[elementData.message]);
        this.#messageElement.setplace(elementData.element);
        
        if(elementData.validated == false) {
          this.#messageElement.show();
        } else {
          this.#messageElement.hide();
        }
      }
    } else {

      this.#messageElement.remove();
    }
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
      }, this.#timeOutClosing);
    }
  }

  #testInput_text(elementData) {

    if(elementData.element.value != "" && elementData.regularExpression.test(elementData.element.value)) {

      elementData.element.style.color = "black";
      elementData.element.style.border = "0px";
      elementData.validated = true;
      this.#messageElement.hide();
    } else {

      elementData.element.style.color = "#fe142f";
      elementData.element.style.border = "2px solid #fe142f";
      elementData.validated = false;
      this.#messageElement.show();
    }

    this.#checkFormValidity();
  }

  #testInput_checkBoxsList(elementData) {

    elementData.validated = false;
    this.#messageElement_CheckBoxsList.show();

    elementData.element.forEach((checkbox) => { if(checkbox.checked) {
      elementData.validated = true;
      this.#messageElement_CheckBoxsList.hide();
    }});

    this.#checkFormValidity();
  }

  #testInput_checkBox(elementData) {

    elementData.validated = elementData.element.checked;

    if(elementData.validated == false) { 
      
      this.#messageElement_CheckBox.show(); 
    } else { 
      
      this.#messageElement_CheckBox.hide(); 
    }

    this.#checkFormValidity();
  }

  #checkFormValidity() {

    let formIsValid = true;
    let unvalidValue;

    for(let value of map_formElements.values()) {
      if(value.required) {
        if(!value.validated) {
          formIsValid = false;
          unvalidValue = value;
          break;
        }
      }
    }

    const submitButton = map_formElements.get("submitButton").element;

    if(formIsValid) {

      submitButton.style.opacity = "1";
      submitButton.disabled = false;
    } else {

      submitButton.style.opacity = "0.25";
      submitButton.disabled = true;
      return unvalidValue;
    }
  }
}