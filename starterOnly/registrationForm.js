const dElements = {
  modalBackground: document.querySelector(".bground"),
  modalContent: document.querySelector(".content"),
  openModalButtons: document.querySelectorAll(".modal-btn"),
  closeModalButton: document.querySelector(".close"),
}

const timeoutClose = 500;

export class RegistrationModal {

  constructor() {
    dElements.modalBackground.style.transition = `opacity ${timeoutClose}ms`;
    dElements.modalContent.style.transition = `opacity ${timeoutClose}ms`;
    dElements.openModalButtons.forEach((btn) => btn.addEventListener("click", this.#visibleModal.bind(null, true)));
    dElements.closeModalButton.addEventListener("click", this.#visibleModal.bind(null, false));
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

}