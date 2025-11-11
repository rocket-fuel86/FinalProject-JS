class System {
  constructor() {
    this.users = [];
    this.products = [];
    this.categories = [];
    this.suppliers = [];
  }

  start() {
    console.log("System started");
  }
  stop() {
    console.log("System stopped");
  }
}


class User {
  constructor(id, name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }

  login() {
    console.log("Logged in");
  }
  logout() {
    console.log("Logged out");
  }
  updateProfile() {
    console.log("Profile updated");
  }
}


class Admin extends User {
  constructor(id, name, email, password, level) {
    super(id, name, email, password);
    this.level = level;
  }

  addProduct() {
    console.log("Product added");
  }
  removeUser() {
    console.log("User removed");
  }
  login() {
    console.log("Admin logged in");
  }
  logout() {
    console.log("Admin logged out");
  }
  updateProfile() {
    console.log("Admin profile updated");
  }
}


class Customer extends User {
  constructor(id, name, email, password, address, phone) {
    super(id, name, email, password);
    this.address = address;
    this.phone = phone;
    this.cart = new Cart();
    this.orders = []
  }

  placeOrder() {
    console.log("Order placed");
  }
  addToCart() {
    console.log("Added to cart");
  }
  login() {
    console.log("Customer logged in");
  }
  logout() {
    console.log("Customer logged out");
  }
  updateProfile() {
    console.log("Customer profile updated");
  }
}


class Supplier {
  constructor(id, name, address, phone) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.id = id;
  }

  supplyProduct() {
    console.log("Product supplied");
  }
  updateInfo() {
    console.log("Info updated");
  }
}


class Cart {
  constructor(id, items, total) {
    this.items = items;
    this.total = total;
    this.id = id;
    this.products = [];
  }

  addItem() {
    console.log("Item added");
  }
  removeItem() {
    console.log("Item removed");
  }
  checkout() {
    console.log("Checkout");
  }
}


class Order {
  constructor(id, date, totalAmount, status, payment) {
    this.date = date;
    this.totalAmount = totalAmount;
    this.status = status;
    this.id = id;
    this.payment = payment;
  }

  calculateTotal() {
    console.log("Calculated");
  }
  changeStatus() {
    console.log("Status changed");
  }
}


class Payment {
  constructor(id, method, amount, status) {
    this.method = method;
    this.amount = amount;
    this.status = status;
    this.id = id;
  }

  process() {
    console.log("Processing");
  }
  refund() {
    console.log("Refund");
  }
}


class Product {
  constructor(id, name, price, stock, category, supplier) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.id = id;
    this.category = category;
    this.supplier = supplier;
  }

  updateStock() {
    console.log("Stock updated");
  }
  changePrice() {
    console.log("Price changed");
  }
}


class Category {
  constructor(id, name) {
    this.name = name;
    this.id = id;
    this.products = [];
  }

  addProduct() {
    console.log("Product added");
  }
  removeProduct() {
    console.log("Product removed");
  }
  showProducts() {
    console.log("--- Products ---");
  }
}
