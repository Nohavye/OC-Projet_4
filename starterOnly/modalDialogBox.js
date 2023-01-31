import { dElements, map_formElements, messages, MovableTag } from "./variables.js";

export class ModalDialogBox {

  /*Classe: RegistrationModal
  
    Cette classe est entièrement dédiée à la gestion de la fenêtre modale qui présente le formulaire d'inscription.
    Elle gère son affichage, la validation des entrées du formulaire, les effets visuels liés à la validation,
    les messages d'erreurs informant de la validité des entrées et la gestion des données en sortie une fois le
    formulaire envoyé. */

  // Création d'un objet "answers" pour stocker les réponses définitives du formulaire.
  answers = { firstName: "", lastName: "", eMail: "", birthdate: "",
              quantity: "", location: "", terms: true, newsLetters: false }

  constructor() {

    /*Le constructeur appel les différentes méthodes d'initialisation de la classe liées
      à la fenêtre modale et au formilaire. */

    this.#modalDialogBox.initStyle();
    this.#modalDialogBox.initEvents();
    this.#form.initEvents();
    this.#form.initMessages();
  }

  /*Les méthodes et fonctions de la classe sont placées dans une structure de propriétés
    et sous-propriétés. Ici nous regroupons celle liées à la fenêtre modale. */

  #modalDialogBox = {

    // Timing pour la fermeture de la fenêtre (en millisecondes).
    closingTime: 500,

    initStyle: () => {

      /*Ajout de propriétés CSS à la fenêtre modale: Ici on ajoute un fondu pour une
        fermeture moins brutale de la modale. */

      dElements.modalBackground.style.transition = `opacity ${this.#modalDialogBox.closingTime}ms`;
      dElements.modalContent.style.transition = `opacity ${this.#modalDialogBox.closingTime}ms`;
    },

    initEvents: () => {

      /*Initialisation des évenement de la modale: j'utilise une même méthode pour
        l'ouverture et la fermeture de la fenêtre. */

      dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#modalDialogBox.display.bind(this, true)));
      dElements.closeModalButton.addEventListener("click", this.#modalDialogBox.display.bind(this, false));
    },

    display: (isTrue) => {

      /*Méthode pour l'affichage de la modale: Prend en argument "true" pour
        l'ouverture et "false" pour la fermeture. */

      if(isTrue) {

        // Overture de la modale.
        dElements.modalBackground.style.display = "block";
        dElements.modalBackground.style.opacity = "1";
        dElements.modalContent.style.opacity = "1";
      } else {
  
        // Fermeture de la modale.
        dElements.modalBackground.style.opacity = "0";
        dElements.modalContent.style.opacity = "0";
  
        /*Lors de la fermeture on induit un temps de pause de 500ms avant de
          fermer définitivement la modalde de façon à laisser le temps au fondu
          de s'effectuer. */

        setTimeout(function() {
          dElements.modalBackground.style.display = "none";
        }, this.#modalDialogBox.closingTime);
      }
    }
  }

  /*Ici nous regroupons les méthodes et fonctions liées au formulaire
    d'inscription */

  #form = {

    messageElements: {

      /*Creation de 3 instance de classe "MovableTag" pour l'affichage
        des messages d'erreurs. */

      text: new MovableTag("p"),
      checkBoxsList: new MovableTag("p"),
      checkBox: new MovableTag("p")
    },

    initEvents: () => {

      /*Initialisation des évènement liés au formulaire d'inscription:
      
        Évènements de soumission du formulaire:
        */
      
      map_formElements.get("submitButton").element.addEventListener("mouseenter", () => {

        /*Ici lorsque l'utilisateur passe la souris sur le bouton de soumission
          on utilise la fonction #form.test.validity() pour tester la validité du formulaire
          et récupérer le premier élément en erreur. Si le formulaire n'est pas validé,
          le focus est assigné au premier élément en erreur. */

        let value = this.#form.test.validity();
        if(typeof(value) != 'undefined') {
          if(value.type = "text") { value.element.focus(); }
        }
      });
    
      dElements.form.onsubmit = (e) => {

        /*Sur l'évènement 'onsubmit' du formulaire on récupère les données et
          on créé le message de validation d'inscription. Un évenement est diffusé
          pour indiquer que les données sont disponibles. (answers) */
  
        e.preventDefault();
  
        this.#setAnswers();
        this.#form.showSuccessMessage();
  
        dElements.form.dispatchEvent(new Event('afterSubmission'));
      }

      for(let value of map_formElements.values()) {

        /*Dans cette boucle on parcours la map_formElements pour initialiser les évènements
          des entrées du formulaire à contrôler. J'utilise "switch" pour renvoyer les évènement
          vers les méthodes de contrôle appropriées en fonction du type d'entrées. */

        switch(value.type) {
  
          case 'text':

            /*Les entrées de type texte: Le prénom, le nom, l'email, la date de naissance
              et le nombre de tournoi déjà fait. Ici on surveillera donc la modification
              du contenu des entrées et le focus. */

            this.#form.test.input_text(value);
            value.element.addEventListener("input", this.#form.test.input_text.bind(this, value));
            value.element.addEventListener("focus", this.#form.test.focus_text.bind(this, value, true));
            value.element.addEventListener("blur", this.#form.test.focus_text.bind(this, value, false));
            break;
  
          case 'checkboxlist':

            /*Choix du lieu du tournoi représenté sous la forme d'une liste à cocher.
              On contrôle la selection d'une option. */

            this.#form.test.input_checkBoxsList(value);
            value.element.forEach((checkbox) => checkbox.addEventListener("input", this.#form.test.input_checkBoxsList.bind(this, value)));
            break;
  
          case 'checkbox':

            /*Les termes et conditions: on contrôle que la case soit bien cochée.
              */

            this.#form.test.input_checkBox(value);
            value.element.addEventListener("input", this.#form.test.input_checkBox.bind(this, value));
            break;
        }
      }
    },

    initMessages: () => {

      /*Initialisation des messages d'erreurs pour le lieu du tournoi et les termes et conditions.
         */

      this.#form.messageElements.checkBoxsList.setContent(messages.checkBoxsLocation);
      this.#form.messageElements.checkBoxsList.setplace(map_formElements.get("checkBoxsLocation").element[0].parentElement);

      this.#form.messageElements.checkBox.setContent(messages.checkBoxTerms);
      this.#form.messageElements.checkBox.setplace(map_formElements.get("checkBoxTerms").element.parentElement);
    },

    showSuccessMessage: () => {

      /*Méthode permettant l'affichage du message de validation après soumission du
        formulaire. J'utilse la même modale dont je modifie le contenu. */

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

    /*Sous-propriété #form.test dans laquelle sont rangées les méthode
      et fonction de contrôle des entrées du formulaire. */

    test: {

      validity: () => {

        /*Fonction: Contrôle la validité du formulaire en testant les propriétés
          "validated" de chaque objets de la map_formElements requis pour la
          validation.
          
          Si le formulaire n'est pas validé, la fonction renvoi la première entrée
          qui n'est pas valide. */

        let formIsValid = true;
        let unvalidValue;
  
        // Boucle sur map_formElements.
        for(let value of map_formElements.values()) {
          if(value.required) {
            if(!value.validated) {
              formIsValid = false;
              unvalidValue = value;
              break;
            }
          }
        }
  
        // Gestion du style du bouton de soumission.
        const submitButton = map_formElements.get("submitButton").element;
  
        if(formIsValid) {
  
          // Bouton activé.
          submitButton.style.opacity = "1";
          submitButton.disabled = false;
        } else {
  
          //bouton désactivé.
          submitButton.style.opacity = "0.25";
          submitButton.disabled = true;

          // Retour négatif
          return unvalidValue;
        }
      },

      input_text: (elementData) => {

        /*Méthode de contrôle pour le contenu des entrées de type texte sur l'évènement
          "input". Ici on récupère l'expression régulière permettant de contrôler le
          contenu de l'entrée. */

        if(elementData.element.value != "" && elementData.regularExpression.test(elementData.element.value)) {

          // Style de l'entrée.
          elementData.element.style.color = "black";
          elementData.element.style.border = "0px";

          // Actualisation de la propriété "validated" dans objet map_formElements.
          elementData.validated = true;

          // Cacher le message d'erreur.
          this.#form.messageElements.text.hide();
        } else {
    
          // Style de l'entrée.
          elementData.element.style.color = "#fe142f";
          elementData.element.style.border = "2px solid #fe142f";

          // Actualisation de la propriété "validated" dans objet map_formElements.
          elementData.validated = false;

          // Afficher le message d'erreur.
          this.#form.messageElements.text.show();
        }

        // Teste de la validité du formulaire.
        this.#form.test.validity();
      },

      focus_text: (elementData, isFocused) => {

        /*Méthode de contrôle du focus des entrées de type texte sur évènements
          "focus" / "blur". */

        if(isFocused) {
      
          if(elementData.required) {

            /*On paramétre le contenu du message d'erreur et son positionnement
              dans le document. */
            
            this.#form.messageElements.text.setContent(messages[elementData.message]);
            this.#form.messageElements.text.setplace(elementData.element);
            
            if(elementData.validated == false) {

              // Afficher le message d'erreur.
              this.#form.messageElements.text.show();
            } else {

              // Cacher le message d'erreur.
              this.#form.messageElements.text.hide();
            }
          }
        } else {
    
          // Supprimer le message d'erreur.
          this.#form.messageElements.text.remove();
        }
      },

      input_checkBoxsList: (elementData) => {

        /*Méthode de contrôle pour les entrées de type checkBoxsList sur
          l'évènement "input". On contrôle ici qu'un élément de la liste à
          bien été coché. */

        /*On réinitialise la valeur de "validated" à "false" 
          On affiche le message d'erreur. */

        elementData.validated = false;
        this.#form.messageElements.checkBoxsList.show();

        /*Ensuite on parcours toutes les options de la liste pour en trouver une
          de cochée. */

        elementData.element.forEach((checkbox) => { if(checkbox.checked) {

          // Validation de l'entrée. Masquer le message d'erreur.
          elementData.validated = true;
          this.#form.messageElements.checkBoxsList.hide();
        }});

        // Teste de la validité du formulaire.
        this.#form.test.validity();
      },

      input_checkBox: (elementData) => {

        /*Méthode de contrôle pour l'entrée de type checkBox sur
          l'évènement "input". On contrôle ici la coche sur les termes
          et conditions. */

        elementData.validated = elementData.element.checked;

        // Message d'erreurs
        if(elementData.validated == false) { 
          
          this.#form.messageElements.checkBox.show(); 
        } else { 
          
          this.#form.messageElements.checkBox.hide(); 
        }

        // Teste de la validité du formulaire.
        this.#form.test.validity();
      }
    }
  }
  
  #setAnswers() {

    /*Méthode setAnswers: Récupère les données du formulaire pour les stocker
      dans la propriété "answers" de la classe. */

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