//место, куда записываем карточки
const container = document.querySelector(".root");
const rootSection = document.querySelector('.places-list');
const placeCard = rootSection.querySelector(".place-card");

const newCardList = new CardList(rootSection);

//работа с данными о пользователе
const formInfo = document.forms.info;
const userInfoText = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoImages = document.querySelector('.user-info__photo');
const userInfo = new UserInfo(formInfo, userInfoText, userInfoJob);
userInfo.updateUserInfo();

//добавление карточки из формы
const formNew = document.forms.new;

//валидация форм
const popupNewValid = new FormValidator(formNew);
const popupInfoValid = new FormValidator(formInfo);

//PopUp Добавление карточки
const popupButton = container.querySelector(".user-info__button");
const addButton = container.querySelector(".button__add");
const popupOpenAdd = container.querySelector(".add");
const popupCloseAdd = container.querySelector(".addclose");

const addPopup = new Popup(popupOpenAdd);
function openAddPopup() {
  addButton.setAttribute('disabled', true);
  addButton.classList.remove('popup__button_active');

  addPopup.open();
}
popupButton.addEventListener('click', openAddPopup);
popupCloseAdd.addEventListener('click', () => {
  formNew.reset();
  popupNewValid.setSubmitButtonState();
  addPopup.close();
});

//PopUp Редактирования профиля
const popupEdit = container.querySelector(".user-info__edbutton");
const editButton = container.querySelector(".button__editsave");
const popupOpenEdit = container.querySelector(".edit");
const popupCloseEdit = container.querySelector(".editclose");

const editPopup = new Popup(popupOpenEdit);
function openEditPopup() {
  editButton.removeAttribute('disabled');
  editButton.classList.add('popup__button_active');

  document.querySelector("#error-firstLastName").textContent = '';
  document.querySelector("#error-about").textContent = '';

  popupInfoValid.setSubmitButtonState();
  editPopup.open();
}
popupEdit.addEventListener('click', openEditPopup);
popupCloseEdit.addEventListener('click', () => {
  formInfo.reset();
  editPopup.close();
});

//PopUp Открытие картинки
const popupOpenImg = container.querySelector(".imgpopup");
const popupCloseImg = container.querySelector(".imageclose");

const imgPopup = new Popup(popupOpenImg);
function openImgPopup(event) {
  if (event.target.closest('.place-card__image')) {
    const popupImg = document.querySelector('.popup__images');
    let linkImg = event.target.style.backgroundImage;
    popupImg.style.backgroundImage = linkImg;
    imgPopup.open();
  }
}
rootSection.addEventListener('click', openImgPopup);
popupCloseImg.addEventListener('click', () => {
  imgPopup.close();
});

//API Class
const apiClass = new Api({
  basUrl: 'https://praktikum.tk/cohort10',
  headers: {
    authorization: '252989a9-c329-4b9a-8712-5e471d643906',
      'Content-Type': 'application/json'
  }

});

//API UserInfo
apiClass.getUserInfo()
  .then((result) => {
    userInfo.updateUserInfo(result.name, result.about);
    userInfo.setAva(userInfoImages, result.avatar);
  }).catch((err) => {
    console.log(err);
  });

//API Вывод карточек
apiClass.getCards()
  .then((result) => {
    const newArrayInitial = result.map((card) =>  {
      new Card(card.name, card.link).createCard();
      /*
       Можно лучше:
       - Лишний вызов класса, нужно оставить один из двух вариантов
       */
      const newCard = new Card(card.name, card.link);
      return resultCard = newCard.createCard();
      /*
         Можно лучше:
         - Возвращать нужно сразу newCard.crateCard()
       */
    });
    newCardList.render(newArrayInitial);
  }).catch((err) => {
    console.log(err);
  });

//API Редактирование профиля
formInfo.addEventListener('submit', (event) => {
  event.preventDefault();

  apiClass.editProfile(formInfo.firstLastName.value, formInfo.about.value)
    .then((result) => {
      userInfo.updateUserInfo(result.name, result.about);
      editPopup.close();
      formInfo.reset();
    }).catch((err) => {
      console.log(err);
    });
});

//API Добавления карточки
formNew.addEventListener('submit', function (event) {
  event.preventDefault();

  apiClass.addCard(formNew.name.value, formNew.link.value)
    .then((result) => {
      const newCard = new Card(result.name, result.link);
      newCardList.addCard(newCard.createCard());
      formNew.reset();
      addPopup.close();
    }).catch((err) => {
    console.log(err);
  });
});