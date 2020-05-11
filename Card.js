class Card {
    constructor(name, link) {
      this.name = name;
      this.link = link;
    }
  
    createCard() {
      const cardContainer = document.createElement('div');
      const cardLinkElement = document.createElement('div');
      const cardDelButton = document.createElement('button');
      const cardDesContainer = document.createElement('div');
      const cardTitleElement = document.createElement('h3');
      const cardGroupLike = document.createElement('div');
      const cardLikeButton = document.createElement('button');
      const cardLikeNubmer = document.createElement('p');
  
      cardContainer.classList.add('place-card');
      cardLinkElement.classList.add('place-card__image');
      cardLinkElement.setAttribute('style', `background-image: url(${this.link})`);
      cardDelButton.classList.add('place-card__delete-icon');
      cardDesContainer.classList.add('place-card__description');
      cardTitleElement.classList.add('place-card__name');
      cardTitleElement.textContent = this.name;
      cardGroupLike.classList.add('place-card__group-like');
      cardLikeButton.classList.add('place-card__like-icon');
      cardLikeNubmer.classList.add('place-card__like-number');
      cardLikeNubmer.textContent = '0';
  
      cardContainer.appendChild(cardLinkElement);
      cardContainer.appendChild(cardDesContainer);
      cardLinkElement.appendChild(cardDelButton);
      cardDesContainer.appendChild(cardTitleElement);
      cardDesContainer.appendChild(cardGroupLike);
      cardGroupLike.appendChild(cardLikeButton);
      cardGroupLike.appendChild(cardLikeNubmer);
  
      this.cardElement = cardContainer;

      this.setEventListeners();
      return cardContainer;
    }
  
    setEventListeners() {
      this
        .cardElement
        .querySelector('.place-card__like-icon')
        .addEventListener('click', this.like);
  
      this
        .cardElement
        .querySelector('.place-card__delete-icon')
        .addEventListener('click', (event) => {
          this.remove(event)
      });
    }
  
    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }
  
    remove(event) {
      this.cardElement.remove();
      event.stopPropagation();
    }
  }