class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

const itemNameInput = document.getElementById("itemNameInput");
const itemPriceInput = document.getElementById("itemPriceInput");
const itemList = document.getElementById("itemList");
const addItemBtn = document.getElementById("addItem");
const clearStorageBtn = document.getElementById("clearStorage");

function loadItems() {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.forEach(item => addItemToDOM(item));
}

function addItemToDOM(product) {
  const li = document.createElement("li");
  li.textContent = product.name + ": " + product.price;
  itemList.appendChild(li);
}

function saveItem(product) {
  const items = JSON.parse(localStorage.getItem("items") || "[]");
  items.push(product);
  localStorage.setItem("items", JSON.stringify(items));
  addItemToDOM(product);
}

addItemBtn.addEventListener("click", () => {
  const productName = itemNameInput.value.trim();
  const productPrice = itemPriceInput.value.trim();

  if (productName && productPrice) {
    const newProduct = new Product(productName, productPrice);
    saveItem(newProduct);
    itemPriceInput.value = "";
    itemNameInput.value = "";
  }
});

clearStorageBtn.addEventListener("click", () => {
  localStorage.removeItem("items");
  sessionStorage.clear();
  itemList.innerHTML = "";
});

loadItems();
