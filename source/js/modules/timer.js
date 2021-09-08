const secondsNode = document.querySelector(`.js-game-sec`);
const minutesNode = document.querySelector(`.js-game-minutes`);

let requestId;

export const clearTimer = (sessionTimeInMinutes) => {
  cancelAnimationFrame(requestId);
  secondsNode.innerHTML = (`00`);

  if (sessionTimeInMinutes) {
    minutesNode.innerHTML = (`0` + sessionTimeInMinutes).slice(-2);
  } else {
    minutesNode.innerHTML = (`00`);
  }
};

export default (sessionTimeInMinutes = 5) => {
  const FPS = 1;
  const FPS_INTERVAL = 1000 / FPS;
  const START_TIMER = Date.now();
  const INITIAL_TIMER_VALUE = sessionTimeInMinutes * 60 * 1000 + 1000;

  let now;
  let then = Date.now();
  let elapsed;

  function getTimeRemaining() {
    const endTime = START_TIMER + INITIAL_TIMER_VALUE;
    const time = endTime - Date.now();
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);

    return {
      time,
      seconds,
      minutes
    };
  }

  function draw() {
    const timer = getTimeRemaining();

    if (timer.time <= 1000) {
      clearTimer();
    } else {
      secondsNode.innerHTML = (`0` + timer.seconds).slice(-2);
      minutesNode.innerHTML = (`0` + timer.minutes).slice(-2);
    }
  }

  function tick() {
    requestId = requestAnimationFrame(tick);

    now = Date.now();
    elapsed = now - then;

    if (elapsed > FPS_INTERVAL) {
      then = now - (elapsed % FPS_INTERVAL);

      draw();
    }
  }

  requestAnimationFrame(tick);
};
