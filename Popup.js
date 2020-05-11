class Popup {
  constructor(popupElem) {
    this.popupElem = popupElem;
  }
  open() {
    this.popupElem.classList.toggle('popup_is-opened');     
  }
  close() {
    this.popupElem.classList.remove('popup_is-opened'); 
  }    
}
