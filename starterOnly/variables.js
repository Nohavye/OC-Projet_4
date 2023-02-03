export const dElements = {

    /*  Objet littéral simple contenant les elements du DOM relatifs à la
        fenêtre modal.*/

    modalBackground: document.querySelector(".bground"),
    modalContent: document.querySelector(".content"),
    openModalButtons: document.querySelectorAll(".modal-btn"),
    closeModalButton: document.querySelector(".close"),
    form: document.querySelector(".registrationForm")
}
  
export let map_formElements = new Map([
  
    /*  Création d'un objet Map() contenant les données permettant de tester
        la validité de chaque entrées du formulaire d'inscription. Cette map
        est une série de clés / objets structurée de la façon suivante:
        
        "clé" (string désignant un entrée spécifique du formulaire), {

            element: element du DOM représentant l'entrée visée,
            type: le type d'entrée (string), servant à diriger les données vers la fonction de teste appropriée,
            regularExpression: Expression régulière permetant de tester la validité de l'entrée,
            required: indique si l'entée est requise pour valider le formulaire,
            validated: indique si l'entrée est valide.
        }

        Initialement, chaque propriétés "validated" prend la valeur "false"
        à l'exeption de la coche relative au termes et conditions puisque celle-ci
        est pré-cochée.*/

    ["firstName", { 
        
        element: document.querySelector(".text-first"),
        type: 'text', 
        regularExpression: /^[a-z ,.'-]{2,}$/,
        message: "firstName",
        required: true, 
        validated: false 
    }],
  
    ["lastName", { 
        
        element: document.querySelector(".text-last"),
        type: 'text', 
        regularExpression: /^[a-z ,.'-]{2,}$/, 
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

    /*  Objet littéral simple contenant les message d'erreur liés à la
        validation du formulaire.*/

    firstName: "Veuillez entrer 2 caractères minimum.",
    lastName: "Veuillez entrer 2 caractères minimum.",
    eMail: "Veuillez entrer un email valide.",
    birthdate: "Veuillez saisir votre date de naissance.",
    quantity: "Veuillez entrer un chiffre.",
    checkBoxsLocation: "Veuillez choisir une option.",
    checkBoxTerms: "Veullez accepter les termes et conditions."
  }

  export class MovableTag {

    /*  Classe: MovableTag
        
        Cette classe permet la création d'une nouvelle balise dans le html cible.
        Grâce au méthodes de cette classe, cette balise peut être déplacée, cachée
        ou supprimer, on peut aussi en modifier le contenu.*/

    constructor(tagName) {

        /*  Le constructeur prend un nom de balise html en argument, créé l'élément
            dans le document et définit son style.*/

        this.tagName = tagName;

        this.element = document.createElement(this.tagName);
        this.#initStyle();
    }

    //  Initialisation du style de la balise
    #initStyle() {

        this.element.style.display = "block";
        this.element.style.padding = "2px";
        this.element.style.color = "#fe142f";
        this.element.style.fontSize = "13px";
        this.element.style.fontWeight = "lighter";
        this.element.style.textAlign = "right";
    }

    /*  Methode permentant de définir ou de modifier la position de la balise dans la
        structure html par rapport à un élément qui le le précède. Notre balise sera
        donc placée après "elementBefore".*/

    setplace(elementBefore) {

        elementBefore.parentNode.insertBefore(this.element, elementBefore.nextSibling);
    }

    //  Définir ou modifier le contenu de la balise.
    setContent(content) {

        this.element.innerText = content;
    }

    //  Afficher la balise.
    show() {

        this.element.style.display = "block";
    }

    // Cacher la balise.
    hide() {

        this.element.style.display = "none";
    }

    //  Supprimer la balise.
    remove() {

        this.element.remove();
    }
  }