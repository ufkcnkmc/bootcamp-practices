let counter;
let timeValue;

const timeInput = document.getElementById("time");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const counterElement = document.getElementById("counter");

startButton.addEventListener("click", () => {
  timeValue = parseInt(timeInput.value);

  if (isNaN(timeValue) || timeValue <= 0) {
    alert("Lütfen geçerli bir süre giriniz!");
    return;
  }

  counterElement.textContent = timeValue;

  counter = setInterval(() => {
    timeValue--;
    counterElement.textContent = timeValue;

    if (timeValue <= 0) {
      clearInterval(counter);
      counterElement.textContent = "Süre doldu!";
    }
  }, 1000);
});

resetButton.addEventListener("click", () => {
  if (counter) {
    clearInterval(counter);
  }

  timeValue = 0;
  counterElement.textContent = "0";
  timeInput.value = "";
});
