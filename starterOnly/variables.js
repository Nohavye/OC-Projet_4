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
        required: true, 
        validated: false 
    }],
  
    ["lastName", { 
        element: document.querySelector(".text-last"),
        type: 'text', 
        regularExpression: /^[a-zA-z]{2}/, 
        required: true, 
        validated: false 
    }],
  
    ["eMail", { 
        element: document.querySelector(".text-email"),
        type: 'text', 
        regularExpression: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
        required: true, 
        validated: false 
    }],

    ["birthdate", { 
        element: document.querySelector(".text-birthdate"),
        type: 'text', 
        regularExpression: /.{1}/, 
        required: true, 
        validated: false 
    }],

    ["quantity", { 
        element: document.querySelector(".text-quantity"),
        type: 'text', 
        regularExpression: /^[0-9]/, 
        required: true, 
        validated: false 
    }],

    ["checkBoxsLocation", { 
        element: document.querySelectorAll(".checkbox-input-location"),
        type: 'checkboxlist', 
        required: true, 
        validated: false 
    }],

    ["checkBoxTerms", { 
        element: document.querySelector(".checkbox-input-terms"),
        type: 'checkbox', 
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