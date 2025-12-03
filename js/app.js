export class Cart {
  constructor(products = []) {
    this.products = products;
  }

  addProduct(product) {
    const existing = this.products.find(p => p.art === product.art);
    if (existing && existing.amount < 40) {
      existing.amount += 1;
    } else if (existing && existing.amount > 40) {
      console.log("Maximum amount of products reached");
    } else {
      this.products.push(product);
    }

    this.save();
  }

  removeProduct(art) {
    this.products = this.products.filter(p => p.art !== art);
    this.save();
  }

  async createOrder() {
    let total = this.calculateTotal();
    let payment = new Payment();
    return new Order(1, Date.now(), total, "Processing", payment, this);
  }

  save() {
    localStorage.setItem("cart", JSON.stringify(this));
  }

  static load() {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (!data) return new Cart();
    return new Cart(data.products);
  }

  async calculateTotal() {
    let temp = this.products.reduce((sum, product) => sum + product.price * product.amount, 0);
    return Number(temp.toFixed(2));
  }
}

export class User {
  constructor(fullname, phone) {
    this.fullname = fullname;
    this.phone = phone;
  }
}

export class Order {
  constructor(id, date, totalAmount, status, payment, cart, user, comment) {
    this.date = date;
    this.totalAmount = totalAmount;
    this.status = status;
    this.id = id;
    this.payment = payment;
    this.cart = cart;
    this.user = user;
    this.comment = comment;
  }
  changeStatus(newStatus) {
    this.status = newStatus;
  }
}


export class Payment {
  constructor(method, amount, status) {
    this.method = method;
    this.amount = amount;
    this.status = status;
  }

  async process() {
    console.log("Processing");
  }
  refund() {
    console.log("Refund");
  }
}


export class Product {
  constructor(art, name, price, category, brand, amount, size, imageUrl, pageUrl) {
    this.art = art;
    this.name = name;
    this.price = Number(price);
    this.category = category;
    this.brand = brand;
    this.amount = amount;
    this.size = size;
    this.imageUrl = imageUrl;
    this.pageUrl = pageUrl;
  }
}
