import { dElements, map_formElements, messages, movableTag } from "./variables.js";

/*Classe: RegistrationModal
  
  Cette classe est entièrement dédiée à la gestion de la fenêtre modale qui présente le formulaire d'inscription.
  Elle gère son affichage, la validation des entrées du formulaire, les effets visuels liés à la validation,
  les messages d'ereurs informant de la validité des entrées et la gestion des données en sortie une fois le
  formulaire envoyé. */

export class RegistrationModal {

  // Création d'un objet "answers" pour stocker les réponses définitives du formulaire.
  answers = { firstName: "", lastName: "", eMail: "", birthdate: "",
              quantity: "", location: "", terms: true, newsLetters: false }

  constructor() {

    this.#modalDialogBox.initStyle();
    this.#modalDialogBox.initEvents();
    this.#form.initEvents();
    this.#form.initMessages();
  }

  #modalDialogBox = {

    closingTime: 500,

    initStyle: () => {

      dElements.modalBackground.style.transition = `opacity ${this.#modalDialogBox.closingTime}ms`;
      dElements.modalContent.style.transition = `opacity ${this.#modalDialogBox.closingTime}ms`;
    },

    initEvents: () => {

      dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#modalDialogBox.display.bind(this, true)));
      dElements.closeModalButton.addEventListener("click", this.#modalDialogBox.display.bind(this, false));
    },

    display: (isTrue) => {

      if(isTrue) {

        dElements.modalBackground.style.display = "block";
        dElements.modalBackground.style.opacity = "1";
        dElements.modalContent.style.opacity = "1";
      } else {
  
        dElements.modalBackground.style.opacity = "0";
        dElements.modalContent.style.opacity = "0";
  
        setTimeout(function() {
          dElements.modalBackground.style.display = "none";
        }, this.#modalDialogBox.closingTime);
      }
    }
  }

  #form = {

    message: {

      text: new movableTag("p"),
      checkBoxsList: new movableTag("p"),
      checkBox: new movableTag("p")
    },

    initEvents: () => {
      
      map_formElements.get("submitButton").element.addEventListener("mouseenter", () => {

        let value = this.#form.test.validity();
        if(typeof(value) != 'undefined') {
          if(value.type = "text") { value.element.focus(); }
        }
      });
    
      dElements.form.onsubmit = (e) => {
  
        e.preventDefault();
  
        this.#setAnswers();
        this.#form.showSuccessMessage();
  
        dElements.form.dispatchEvent(new Event('afterSubmission'));
      }

      for(let value of map_formElements.values()) {

        switch(value.type) {
  
          case 'text':

            this.#form.test.input_text(value);
            value.element.addEventListener("input", this.#form.test.input_text.bind(this, value));
            value.element.addEventListener("focus", this.#form.test.focus_text.bind(this, value, true));
            value.element.addEventListener("blur", this.#form.test.focus_text.bind(this, value, false));
            break;
  
          case 'checkboxlist':

            this.#form.test.input_checkBoxsList(value);
            value.element.forEach((checkbox) => checkbox.addEventListener("input", this.#form.test.input_checkBoxsList.bind(this, value)));
            break;
  
          case 'checkbox':

            this.#form.test.input_checkBox(value);
            value.element.addEventListener("input", this.#form.test.input_checkBox.bind(this, value));
            break; 
        }
      }
    },

    initMessages: () => {

      this.#form.message.checkBoxsList.setContent(messages.checkBoxsLocation);
      this.#form.message.checkBoxsList.setplace(map_formElements.get("checkBoxsLocation").element[0].parentElement);

      this.#form.message.checkBox.setContent(messages.checkBoxTerms);
      this.#form.message.checkBox.setplace(map_formElements.get("checkBoxTerms").element.parentElement);
    },

    showSuccessMessage: () => {

      dElements.form.style.display = "none";
      
      const successMsg = document.createElement("p");

      successMsg.textContent = `Félicitation ${this.answers.firstName} 
                                  ! Votre inscription au tournoi de ${this.answers.location} à bien été prise en compte. 
                                  Vous recevrez rapidement un mail de confirmation à l'adresse : ${this.answers.eMail}.`;

      successMsg.style.paddingTop = "225px";
      successMsg.style.paddingBottom = "325px";
      successMsg.style.paddingLeft = "50px";
      successMsg.style.paddingRight = "50px";
      successMsg.style.textAlign = "center";

      dElements.modalContent.appendChild(successMsg);
    },

    test: {

      validity: () => {

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
      },

      input_text: (elementData) => {

        if(elementData.element.value != "" && elementData.regularExpression.test(elementData.element.value)) {

          elementData.element.style.color = "black";
          elementData.element.style.border = "0px";
          elementData.validated = true;
          this.#form.message.text.hide();
        } else {
    
          elementData.element.style.color = "#fe142f";
          elementData.element.style.border = "2px solid #fe142f";
          elementData.validated = false;
          this.#form.message.text.show();
        }
    
        this.#form.test.validity();
      },

      focus_text: (elementData, isFocused) => {

        if(isFocused) {
      
          if(elementData.required) {
            
            this.#form.message.text.setContent(messages[elementData.message]);
            this.#form.message.text.setplace(elementData.element);
            
            if(elementData.validated == false) {
              this.#form.message.text.show();
            } else {
              this.#form.message.text.hide();
            }
          }
        } else {
    
          this.#form.message.text.remove();
        }
      },

      input_checkBoxsList: (elementData) => {

        elementData.validated = false;
        this.#form.message.checkBoxsList.show();

        elementData.element.forEach((checkbox) => { if(checkbox.checked) {
          elementData.validated = true;
          this.#form.message.checkBoxsList.hide();
        }});

        this.#form.test.validity();
      },

      input_checkBox: (elementData) => {

        elementData.validated = elementData.element.checked;

        if(elementData.validated == false) { 
          
          this.#form.message.checkBox.show(); 
        } else { 
          
          this.#form.message.checkBox.hide(); 
        }

        this.#form.test.validity();
      }
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
}