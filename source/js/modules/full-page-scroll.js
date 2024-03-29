import throttle from 'lodash/throttle';
import timer, {clearTimer} from './timer.js';
import PrizeCountAnimation from './prize-count-animation.js';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;
    this.PRIZES_SCREEN_INDEX = 2;
    this.STORY_SCREEN_INDEX = 1;
    this.GAME_SCREEN_INDEX = 4;
    this.GAMER_TIMER_INITIAL_VALUE = 5;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);
    this.bodyEl = document.getElementsByTagName(`body`)[0];

    this.activeScreen = 0;
    this.previousScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.prizeAnimationStart = false;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    if (this.activeScreen === this.STORY_SCREEN_INDEX) {
      this.bodyEl.classList.add(`theming`);
    } else {
      this.bodyEl.classList.remove(`theming`);
    }

    if (this.activeScreen === this.GAME_SCREEN_INDEX) {
      timer(this.GAMER_TIMER_INITIAL_VALUE);
    }

    if (this.previousScreen === this.GAME_SCREEN_INDEX) {
      clearTimer(this.GAMER_TIMER_INITIAL_VALUE);
    }

    if (this.activeScreen === this.PRIZES_SCREEN_INDEX) {
      if (!this.prizeAnimationStart) {
        this.prizeAnimationStart = true;
        const prizesAnimation = new PrizeCountAnimation();
        prizesAnimation.start();
      }
    }

    if (this.previousScreen === this.STORY_SCREEN_INDEX && this.activeScreen === this.PRIZES_SCREEN_INDEX) {
      this.screenElements[this.previousScreen].classList.add(`has-transition`);
    } else {
      this.screenElements.forEach((screen) => {
        screen.classList.add(`screen--hidden`);
        screen.classList.remove(`active`);
      });
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
