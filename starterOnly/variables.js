export const dElements = {

    // Modal Elements
    modalBackground: document.querySelector(".bground"),
    modalContent: document.querySelector(".content"),
    openModalButtons: document.querySelectorAll(".modal-btn"),
    closeModalButton: document.querySelector(".close"),
}
  
export let map_formElements = new Map([
  
    ["firstName", { 
        element: document.querySelector(".text-first"),
        type: 'text', 
        regularExpression: /^[a-zA-z]{2}/, 
        message: "firstName",
        required: true, 
        validated: false 
    }],
  
    ["lastName", { 
        element: document.querySelector(".text-last"),
        type: 'text', 
        regularExpression: /^[a-zA-z]{2}/, 
        message: "lastName",
        required: true, 
        validated: false 
    }],
  
    ["eMail", { 
        element: document.querySelector(".text-email"),
        type: 'text', 
        regularExpression: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        message: "eMail",
        required: true, 
        validated: false 
    }],

    ["birthdate", { 
        element: document.querySelector(".text-birthdate"),
        type: 'text', 
        regularExpression: /.{1}/, 
        message: "birthdate",
        required: true, 
        validated: false 
    }],

    ["quantity", { 
        element: document.querySelector(".text-quantity"),
        type: 'text', 
        regularExpression: /^[0-9]/, 
        message: "quantity",
        required: true, 
        validated: false 
    }],

    ["checkBoxsLocation", { 
        element: document.querySelectorAll(".checkbox-input-location"),
        type: 'checkboxlist', 
        message: "checkBoxsLocation",
        required: true, 
        validated: false 
    }],

    ["checkBoxTerms", { 
        element: document.querySelector(".checkbox-input-terms"),
        type: 'checkbox', 
        message: "checkBoxTerms",
        required: true, 
        validated: false 
    }],

    ["checkBoxNewsLetters", { 
        element: document.querySelector(".checkbox-input-newsletters"),
        required: false, 
        validated: false 
    }],

    ["submitButton", { 
        element: document.querySelector(".btn-submit"),
        required: false, 
        validated: false 
    }]
  ]);

  export const messages = {
    firstName: "Veuillez entrer 2 caractères minimum pour votre prénom.",
    lastName: "Veuillez entrer 2 caractères minimum pour votre nom.",
    eMail: "Veuillez entrer un email valide.",
    birthdate: "Veuillez saisir votre date de naissance.",
    quantity: "Veuillez entrer un chiffre.",
    checkBoxsLocation: "Veuillez choisir une option.",
    checkBoxTerms: "Veullez accepter les termes et conditions."
  }

  export class movableTag {

    constructor(tagName) {

        this.tagName = tagName;

        this.element = document.createElement(this.tagName);
        this.#setStyle();
    }

    #setStyle() {

        this.element.style.display = "block";
        this.element.style.padding = "2px";
        this.element.style.color = "#fe142f";
        this.element.style.fontSize = "13px";
        this.element.style.fontWeight = "lighter";
        this.element.style.textAlign = "right";
    }

    setplace(elementBefore) {

        elementBefore.parentNode.insertBefore(this.element, elementBefore.nextSibling);
    }

    setContent(content) {

        this.element.innerText = content;
    }

    show() {

        this.element.style.display = "block";
    }

    hide() {

        this.element.style.display = "none";
    }

    remove() {

        this.element.remove();
    }
  }