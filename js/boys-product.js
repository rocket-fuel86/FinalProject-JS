import { Product, Cart } from './app.js';

const name = document.getElementById("name").textContent;
const price = parseFloat(document.getElementById("price").textContent.replace("$", ""));
const art = document.getElementById("art").textContent.split(": ")[1];
const category = document.getElementById("category").textContent.split(": ")[1];
const brand = document.getElementById("brand").textContent.split(": ")[1];
const size = document.getElementById("size").textContent;

const imageUrl = `img/boys/${art}.jpeg`;
const pageUrl = `products/boys/${art}.html`;

const buyButton = document.getElementById("button");

let cart = Cart.load();

buyButton.addEventListener("click", () => {
  let product = new Product(art, name, price, category, brand, 1, size, imageUrl, pageUrl);

  cart.addProduct(product);

  console.log(product);
})
