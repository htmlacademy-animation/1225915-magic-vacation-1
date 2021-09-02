const updatePrizeSrc = (selector, imagePath) => {
  const prizeEl = document.querySelector(selector);
  prizeEl.querySelector(`img`).setAttribute(`src`, imagePath);
};

export default () => {
  let header = document.querySelector(`.js-header`);
  let menuToggler = document.querySelector(`.js-menu-toggler`);
  let menuLinks = document.querySelectorAll(`.js-menu-link`);

  if (menuToggler) {
    menuToggler.addEventListener(`click`, function () {
      if (header.classList.contains(`page-header--menu-opened`)) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      } else {
        header.classList.add(`page-header--menu-opened`);
        document.body.classList.add(`menu-opened`);
      }
    });
  }

  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener(`click`, function () {
      if (window.innerWidth < 1025) {
        header.classList.remove(`page-header--menu-opened`);
        document.body.classList.remove(`menu-opened`);
      }

      updatePrizeSrc(`.prizes__item--journeys`, `img/module-3/img/primary-award.svg`);
      updatePrizeSrc(`.prizes__item--cases`, `img/second-award.svg`);
      updatePrizeSrc(`.prizes__item--codes`, `img/additional-award.svg`);
    });
  }
};
