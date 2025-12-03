import { Cart, Order, Product, User, Payment } from "./app.js";

let totalPriceBlock = document.getElementById("totalPrice");
let formBlock = document.getElementById("form");
let cartItemsElem = document.getElementById("cartItems");
let noItems = document.getElementById("noItems");
let clearCartBtn = document.getElementById("clear-cart");
let totalPriceElem = document.getElementById("total-price-value");

totalPriceBlock.style.display = "none";
formBlock.style.display = "none";
clearCartBtn.style.display = "none";


let cart = Cart.load();
renderCart(cart, cartItemsElem);


let fullname = document.getElementById("fullname");
let phone = document.getElementById("phone");
let comment = document.getElementById("comment").value;
let submitForm = document.getElementById("submit-form");
let saveInfo = document.getElementById("save-info");

let currentPayment = new Payment("COD", await cart.calculateTotal(), "Pending");

let formDataRaw = localStorage.getItem("userInfo");
let formData = null;

try {
  formData = formDataRaw ? JSON.parse(formDataRaw) : null;
} catch (e) {
  formData = null;
}

if (formData) {
  fullname.value = formData.fullname;
  phone.value = formData.phone;
}

document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', async () => {
    currentPayment.method = radio.value;

    currentPayment.amount = await cart.calculateTotal();

    console.log(currentPayment);
  });
});

clearCartBtn.addEventListener("click", () => {
  cart.products = [];
  cart.save();
  renderCart(cart, cartItemsElem);
})

submitForm.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!fullname.value.trim()) {
    alert("Please enter your fullname");
    fullname.focus();
    return;
  }

  if (!phone.value.trim()) {
    alert("Please enter your phone number");
    phone.focus();
    return;
  }

  const phoneRegex = /^\+?\d{7,15}$/;
  if (!phoneRegex.test(phone.value.trim())) {
    alert("Please enter a valid phone number");
    phone.focus();
    return;
  }

  const user = new User(
    fullname.value.trim(),
    phone.value.trim()
  );

  const order = new Order(
    Date.now(),
    new Date().toISOString(),
    await cart.calculateTotal(),
    "Processing",
    currentPayment,
    cart,
    user,
    comment
  );

  await fetch('http://rocketfuel.mywebcommunity.org/shop/place_order.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  })

  console.log("Order created:", order);

  if (saveInfo.checked) {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  cart.products = [];
  cart.save();
  renderCart(cart, cartItemsElem);
});



async function renderCart(cart, cartItemsElem) {
  if (cart.products.length > 0) {
    cartItemsElem.style.display = "flex";
    totalPriceBlock.style.display = "flex";
    formBlock.style.display = "block";
    noItems.style.display = "none";
    clearCartBtn.style.display = "block";

    for (let i = 0; i < cart.products.length; i++) {
      let newElem = await createCartItem(cart.products[i])
      cartItemsElem.appendChild(newElem);
    }

    const total = await cart.calculateTotal();
    totalPriceElem.textContent = total.toString();
  }
  else {
    cartItemsElem.style.display = "none";
    totalPriceBlock.style.display = "none";
    formBlock.style.display = "none";
    noItems.style.display = "block";
    clearCartBtn.style.display = "none";
  }
}

async function createCartItem(product) {
  const {
    art,
    name,
    price,
    category,
    brand,
    amount,
    size,
    imageUrl,
    pageUrl
  } = product;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const hrTop = document.createElement("hr");
  const hrBottom = document.createElement("hr");

  const itemInner = document.createElement("div");
  itemInner.classList.add("item-inner");

  // image
  const imgWrap = document.createElement("div");
  imgWrap.classList.add("item-image-wrapper");

  const image = document.createElement("img");
  image.classList.add("item-image");
  image.src = imageUrl;
  image.alt = "img";

  imgWrap.appendChild(image);

  // details
  const details = document.createElement("div");
  details.classList.add("item-details");

  const titleP = document.createElement("p");
  titleP.classList.add("details-title");

  const linkEl = document.createElement("a");
  linkEl.classList.add("page-link");
  linkEl.href = pageUrl || "#";
  linkEl.textContent = name;

  titleP.appendChild(linkEl);

  const artWrap = document.createElement("div");
  artWrap.classList.add("art-wrapper");

  const artTitle = document.createElement("p");
  artTitle.classList.add("art-title");
  artTitle.textContent = "art";

  const artDivider = document.createElement("p");
  artDivider.classList.add("art-divider");
  artDivider.textContent = ":";

  const artValue = document.createElement("p");
  artValue.classList.add("art-value");
  artValue.textContent = art;

  artWrap.append(artTitle, artDivider, artValue);

  const sizeWrap = document.createElement("div");
  sizeWrap.classList.add("size-wrapper");

  const sizeTitle = document.createElement("p");
  sizeTitle.classList.add("size-title");
  sizeTitle.textContent = "size";

  const sizeDivider = document.createElement("p");
  sizeDivider.classList.add("size-divider");
  sizeDivider.textContent = ":";

  const sizeValue = document.createElement("p");
  sizeValue.classList.add("size-value");
  sizeValue.textContent = size;

  sizeWrap.append(sizeTitle, sizeDivider, sizeValue);

  details.append(titleP, artWrap, sizeWrap);

  // count
  const count = document.createElement("div");
  count.classList.add("count");

  const btnPlus = document.createElement("button");
  btnPlus.classList.add("count-button");
  btnPlus.textContent = "+";

  const spanVal = document.createElement("span");
  spanVal.classList.add("count-span");
  spanVal.textContent = (amount || 1).toString();

  const btnMinus = document.createElement("button");
  btnMinus.classList.add("count-button");
  btnMinus.textContent = "-";

  btnPlus.addEventListener("click", async () => {
    if (product.amount < 40) {
      product.amount += 1;
      spanVal.textContent = product.amount;
      cart.save();
      const total = await cart.calculateTotal();
      totalPriceElem.textContent = total.toFixed(2);

      currentPayment.amount = total;
    }
  });

  btnMinus.addEventListener("click", async () => {
    if (product.amount > 1) {
      product.amount -= 1;
      spanVal.textContent = product.amount;
      cart.save();
      const total = await cart.calculateTotal();
      totalPriceElem.textContent = total.toFixed(2);

      currentPayment.amount = total;
    }
  });

  count.append(btnPlus, spanVal, btnMinus);

  // price wrapper
  const priceWrap = document.createElement("div");
  priceWrap.classList.add("price-wrapper");

  const priceP = document.createElement("p");
  priceP.classList.add("price");
  priceP.textContent = price;

  const currency = document.createElement("p");
  currency.classList.add("price-currency");
  currency.textContent = "$";

  priceWrap.append(priceP, currency);

  itemInner.append(imgWrap, details, count, priceWrap);

  cartItem.append(hrTop, itemInner, hrBottom);

  return cartItem;
}
