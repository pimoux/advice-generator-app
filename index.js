const baseUrl = "https://api.adviceslip.com/advice";

const adviceNumberElt = document.querySelector(".advice-id");
const adviceElt = document.querySelector(".advice");
const dividerElt = document.querySelector(".divider");
const diceElt = document.querySelector(".dice");
let isFetchingData = false;

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomId = randomIntFromInterval(1, 224);

const makeRequest = async (id) => {
  if (!isFetchingData) {
    isFetchingData = true;
    adviceElt.classList.add("down");
    adviceNumberElt.classList.add("down");
    dividerElt.classList.add("down");

    const response = await fetch(`${baseUrl}/${id}`);
    const json = await response.json();

    setTimeout(() => {
      adviceNumberElt.textContent = `ADVICE #${json.slip.id}`;
      adviceElt.textContent = `${json.slip.advice}`;
    }, 1000);

    setTimeout(() => {
      adviceElt.classList.remove("down");
      adviceNumberElt.classList.remove("down");
      dividerElt.classList.remove("down");
    }, 2000);

    setTimeout(() => {
      isFetchingData = false;
    }, 3000);
  }
};

diceElt.addEventListener("click", async () => {
  const randomId = randomIntFromInterval(1, 224);
  await makeRequest(randomId);
});
