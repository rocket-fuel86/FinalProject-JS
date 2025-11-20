function updateInfo(countElement, priceElement, newCount, newPrice) {
  countElement.innerText = `${count}`;
  priceElement.innerText = `${count * defaultPrice} $`;
}

const countElem = document.getElementById('countVal');
const countAdd = document.getElementById('countAdd');
const countSub = document.getElementById('countSub');
const priceElem = document.getElementById('price');

const fullnameInput = document.getElementById('fullname');
const phoneInput = document.getElementById('phone');
const submitButton = document.getElementById('submit');

let count = 1;
let defaultPrice = 169;

countElem.innerText = `${count}`;
priceElem.innerText = `${count * defaultPrice} $`;

countSub.addEventListener('click', (e) => {
  if (count !== 1) {
    count--;
    updateInfo(countElem, priceElem, count, defaultPrice);
  }
})

countAdd.addEventListener('click', (e) => {
  count++;
  updateInfo(countElem, priceElem, count, defaultPrice);
})

submitButton.addEventListener('click', (e) => {
    if (fullnameInput.value !== '' || phoneInput.value !== '+380') {
      console.log("Test");
    }
    else {
      console.log("Test2");
    }
})
