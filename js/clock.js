// Set year in footer
document.getElementById("current_year").textContent = new Date().getFullYear();

// Set clock
function getTimeRemaining(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((t / 1000) % 60);
  const minutes = Math.floor((t / 1000 / 60) % 60);
  const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  const days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function updateClock(id, end) {
  const clock = document.getElementById(id);
  const day = clock.querySelector('.days');
  const hour = clock.querySelector('.hours');
  const minute = clock.querySelector('.minutes');
  const second = clock.querySelector('.seconds');
  const t = getTimeRemaining(end);

  day.innerHTML = t.days;
  hour.innerHTML = ('0' + t.hours).slice(-2);
  minute.innerHTML = ('0' + t.minutes).slice(-2);
  second.innerHTML = ('0' + t.seconds).slice(-2);

  if (t.total <= 0) {
    clearInterval(timeInterval);
  }
}

// Clock for remaining time to enroll
const enroll_deadline = new Date(2021, 10, 29, 23, 59, 59);
let timeInterval = setInterval("updateClock('enroll_clock', enroll_deadline)", 1000);

// Clock for website launch
// const reveal_deadline = new Date(2021, 10, 24, 18, 30);
// let timeInterval = setInterval("updateClock('countdown_clock', reveal_deadline)", 1000);
