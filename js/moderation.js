let list = document.getElementById('list');

const response = await fetch('http://rocketfuel.mywebcommunity.org/shop/get_orders.php', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});

const orders = await response.json();

console.log(orders);

orders.forEach(order => {
  const item = document.createElement('li');
  item.classList.add('order-list-item');

  const date = new Date(order.date).toLocaleString();

  let html = `
    <p><b>Order ID:</b> ${order.id}</p>
    <p><b>Date:</b> ${date}</p>
    <p><b>Total Amount:</b> $${order.totalAmount}</p>
    <p><b>Status:</b> ${order.status}</p>

    <hr>

    <p><b>Customer:</b></p>
    <p> - Name: ${order.user.fullname}</p>
    <p> - Phone: ${order.user.phone}</p>

    <hr>

    <p><b>Payment:</b></p>
    <p> - Method: ${order.payment.method}</p>
    <p> - Amount: ${order.payment.amount}</p>
    <p> - Status: ${order.payment.status}</p>

    <hr>

    <p><b>Comment:</b></p>
    <p> - ${order.comment || "(empty)"}</p>

    <hr>

    <p><b>Products:</b></p>
  `;

  if (order.cart?.products?.length > 0) {
    order.cart.products.forEach(p => {
      html += `<p> - ${p.name} — $${p.price} (Qty: ${p.quantity || 1})</p>`;
    });
  } else {
    html += `<p> - No products</p>`;
  }

  item.innerHTML = html;
  list.appendChild(item);
});


