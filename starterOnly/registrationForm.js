import { map_formElements, dElements } from "./variables.js";

export class RegistrationModal {

  #timeOutClosing = 500;

  constructor() {

    // Modal Style
    dElements.modalBackground.style.transition = `opacity ${this.#timeOutClosing}ms`;
    dElements.modalContent.style.transition = `opacity ${this.#timeOutClosing}ms`;

    // Modal Events
    dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#visibleModal.bind(this, true)));
    dElements.closeModalButton.addEventListener("click", this.#visibleModal.bind(this, false));

    // Form Events
    for(let value of map_formElements.values()) {

      switch(value.type) {

        case 'text':
          this.#testInput_text(value);
          value.element.addEventListener("input", this.#testInput_text.bind(this, value));
          break;

        case 'checkboxlist':
          this.#testInput_checkBoxList(value);
          value.element.forEach((checkbox) => checkbox.addEventListener("input", this.#testInput_checkBoxList.bind(this, value)));
          break;

        case 'checkbox':
          this.#testInput_checkBox(value);
          value.element.addEventListener("input", this.#testInput_checkBox.bind(this, value));
          break; 
      }
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
    } else {

      elementData.element.style.color = "red";
      elementData.element.style.border = "2px solid red";
      elementData.validated = false;
    }

    this.#checkFormValidity();
  }

  #testInput_checkBoxList(elementData) {

    elementData.validated = false;

    elementData.element.forEach((checkbox) => { if(checkbox.checked) {
      elementData.validated = true;
    }});

    this.#checkFormValidity();
  }

  #testInput_checkBox(elementData) {

    elementData.validated = elementData.element.checked;
    this.#checkFormValidity();
  }

  #checkFormValidity() {

    let formIsValid = true;

    for(let value of map_formElements.values()) {
      if(value.required) {
        if(!value.validated) {
          formIsValid = false;
          break;
        }
      }
    }

    const submitButton = map_formElements.get("submitButton").element;

    if(formIsValid) {

      submitButton.style.opacity = "1";
    } else {

      submitButton.style.opacity = "0.25";
    }
  }
}