export default class AnimationText {
  constructor(
      elementSelector,
      timer,
      initDelay,
  ) {
    this.elementSelector = elementSelector;
    this.timer = timer;
    this.elements = document.querySelectorAll(this.elementSelector);
    this.timeOffset = initDelay || 0;
    this.timeOffsetCurrent = 0;

    this.prePareText();
  }

  generatorDelay(offset, index) {
    let result = offset;
    if ((index + 1) % 3 === 1) {
      result += 90;
    }
    if ((index + 1) % 3 === 2) {
      result -= 45;
    }
    if ((index + 1) % 3 === 0) {
      result += 60;
    }
    return result;
  }

  createElement(letter, index) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.transition = `transform ${this.timer}ms ease-out ${this.timeOffsetCurrent}ms`;
    this.timeOffsetCurrent = this.generatorDelay(this.timeOffsetCurrent, index);
    return span;
  }

  prePareText() {
    if (!this.elements.length) {
      return;
    }

    this.elements.forEach((element) => {
      const text = element.textContent.trim().split(` `);
      this.timeOffsetCurrent = this.timeOffset;

      const content = text.reduce((fragmentParent, word, index) => {
        const wordElement = Array.from(word).reduce((fragment, latter, i) => {
          fragment.appendChild(this.createElement(latter, i));
          return fragment;
        }, document.createDocumentFragment());
        const wordContainer = document.createElement(`span`);
        wordContainer.classList.add(`per-letter-anim__word`);
        wordContainer.appendChild(wordElement);
        fragmentParent.appendChild(wordContainer);
        if (index !== text.length - 1) {
          const space = document.createTextNode(` `);
          fragmentParent.appendChild(space);
        }
        return fragmentParent;
      }, document.createDocumentFragment());

      element.innerHTML = ``;
      element.appendChild(content);
    });
  }
}
