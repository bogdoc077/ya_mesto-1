class CardList {
  constructor(rootSection) {
    this.rootSection = rootSection;
  }

  render(newArrayInitial) {
    newArrayInitial.forEach((elem) => this.addCard(elem));
  }

  addCard(card) {
    this.rootSection.appendChild(card);
  }
}