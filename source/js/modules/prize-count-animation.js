export default class PrizeCountAnimation {
  constructor() {
    this.fps = 12;
    this.fpsInterval = 1000 / this.fps;
    this.now = null;
    this.then = Date.now();
    this.timeStart = Date.now();
    this.timeFromStart = 0;
    this.elapsed = null;

    this.counters = [
      {
        el: `.prizes__item--journeys`,
        start: 1,
        end: 3,
        startTime: 500,
        done: false
      },
      {
        el: `.prizes__item--cases`,
        start: 1,
        end: 7,
        startTime: 750,
        done: false
      },
      {
        el: `.prizes__item--codes`,
        start: 11,
        end: 900,
        startTime: 1000,
        done: false
      }
    ];

    this.start = this.start.bind(this);
  }

  drawPrizeNumbers() {
    this.counters.forEach((counter) => {
      if (this.timeFromStart > counter.startTime && !counter.done) {
        let numPlace = document.querySelector(counter.el + ` .prizes__desc b`);
        // eslint-disable-next-line radix
        let numNow = counter.start + parseInt((this.timeFromStart - counter.startTime) / 2);
        if (numNow > counter.end) {
          numNow = counter.end;
          counter.done = true;
        }
        numPlace.innerText = numNow;
      }
    });
  }

  start() {
    requestAnimationFrame(this.start);

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    this.timeFromStart = Date.now() - this.timeStart;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.drawPrizeNumbers();
    }
  }
}
