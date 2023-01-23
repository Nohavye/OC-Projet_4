const dElements = {

  // Modal Elements
  modalBackground: document.querySelector(".bground"),
  modalContent: document.querySelector(".content"),
  openModalButtons: document.querySelectorAll(".modal-btn"),
  closeModalButton: document.querySelector(".close"),

  // Form Elements
  firstNameInput: document.querySelector(".text-first"),
  lastNameInput: document.querySelector(".text-last"),
  emailInput: document.querySelector(".text-email"),
  birthdateInput: document.querySelector(".text-birthdate"),
  quantityInput: document.querySelector(".text-quantity"),
  checkBoxInput: document.querySelectorAll(".checkbox-input")
}

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
    this.#testInput(dElements.firstNameInput, /^[a-zA-z]{2}/);
    this.#testInput(dElements.lastNameInput, /^[a-zA-z]{2}/);
    this.#testInput(dElements.emailInput, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    this.#testInput(dElements.birthdateInput, /.{1}/);
    this.#testInput(dElements.quantityInput, /^[0-9]/);

    dElements.firstNameInput.addEventListener("input", this.#testInput.bind(this, dElements.firstNameInput, /^[a-zA-z]{2}/));
    dElements.lastNameInput.addEventListener("input", this.#testInput.bind(this, dElements.lastNameInput, /^[a-zA-z]{2}/));
    dElements.emailInput.addEventListener("input", this.#testInput.bind(this, dElements.emailInput, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
    dElements.birthdateInput.addEventListener("input", this.#testInput.bind(this, dElements.birthdateInput, /.{1}/));
    dElements.quantityInput.addEventListener("input", this.#testInput.bind(this, dElements.quantityInput, /^[0-9]/));

    dElements.checkBoxInput.forEach((checkbox) => checkbox.addEventListener("input", this.#testCheckBoxInputs));
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

  #testInput(inputElement, regularExpression) {

    if(inputElement.value != "" && this.#validateInputContent(inputElement.value, regularExpression)) {
      inputElement.style.color = "black";
      inputElement.style.border = "0px";
    } else {
      inputElement.style.color = "red";
      inputElement.style.border = "2px solid red";
    }
  }

  #validateInputContent(inputContent, regularExpression) {
    return regularExpression.test(inputContent);
  }

  #test() {
    return true;
  }

  #testCheckBoxInputs() {
    
    let oneIsChecked = false;
    let checkbox;

    for(let i = 1; i < 7; i++) {

      checkbox = document.querySelector(`#location${i}`);
      
      if(checkbox.checked) {
        console.log(`#location${i} is checked`);
        oneIsChecked = true;
        break;
      }
    }

    return oneIsChecked;
  }

}