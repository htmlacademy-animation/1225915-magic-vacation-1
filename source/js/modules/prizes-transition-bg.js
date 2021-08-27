export default () => {
  const prizesTransitionBg = document.querySelector(`.prizes-transition-bg`);
  const prizes = document.querySelector(`.screen--prizes`);
  const story = document.querySelector(`.screen--story`);


  prizesTransitionBg.addEventListener(`transitionend`, () => {
    story.classList.remove(`has-transition`);
    story.classList.add(`screen--hidden`);
    story.classList.remove(`active`);

    prizes.classList.remove(`screen--hidden`);
    prizes.classList.add(`active`);
  });
};
