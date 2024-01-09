const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const datepicker = document.getElementById("date-picker");

const countdown = document.getElementById("countdown");
const countdowntitle = document.getElementById("countdown-title");
const countdownbutton = document.getElementById("countdown-button");
const timeEls = document.querySelectorAll("span");

const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdowActive;
const today = new Date().toISOString().split("T")[0];
datepicker.setAttribute("min", today);

function updateDOM() {
  countdowActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / d);
    const hours = Math.floor((distance % d) / h);
    const minutes = Math.floor((distance % h) / m);
    const second = Math.floor((distance % m) / s);
    countdowntitle.textContent = `${countdownTitle}`;
    timeEls[0].textContent = `${days}`;
    timeEls[1].textContent = `${hours}`;
    timeEls[2].textContent = `${minutes}`;
    timeEls[3].textContent = `${second}`;
    inputContainer.hidden = true;
    countdown.hidden = false;
  }, s);
}

function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  savedCountData = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(savedCountData));
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
}

function reset() {
  countdown.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countdowActive);
  countdownTitle = "";
  countdownDate = "";
}
countdownForm.addEventListener("submit", updateCountdown);
countdownbutton.addEventListener("click", reset);
