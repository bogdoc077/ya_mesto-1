class FormValidator {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector("button");
    this.setEventListeners();
  }
  
  checkInputValidity(element) {
    const errorElement = this.form.querySelector(`#error-${element.id}`);

    if (element.validity.valueMissing) {
        errorElement.textContent = 'Это поле обязательно для заполнения';
        this.activateError(element);
        return false;
    }

    if (element.validity.tooShort) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов';
        this.activateError(element);
        return false;
    }
    
    if (element.validity.typeMismatch) {
        errorElement.textContent = 'Здесь должна быть ссылка';
        this.activateError(element);
        return false;
    }

    this.resetError(element);
    return element;
  }
  
  setSubmitButtonState() {
    const inputs = Array.from(this.form.elements);
    let isValidForm = true;
    inputs.forEach((element) => {
      if (!this.checkInputValidity(element)) {
        isValidForm = false;
      }
    })

    if (isValidForm) {
      this.button.removeAttribute('disabled');
      this.button.classList.add('popup__button_active');
    } else {
      this.button.setAttribute('disabled', true);
      this.button.classList.remove('popup__button_active');
    }
  }

  activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
  }
  
  resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
  }

  setEventListeners() {
    this.form.addEventListener('input', () => {
      this.setSubmitButtonState();
    });
  } 
}