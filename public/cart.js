let cartContainer = document.getElementById("itemsCart");
let cart = JSON.parse(localStorage.getItem("cart"));
let totalContainer = document.getElementById("total");
let deliveryFee = document.getElementById("delivery");
let checkoutOptions = document.getElementById("checkout-options");
function loadCart() {
  let cartItems = cart.map((cartItem) => {
    let subtotal = cartItem.quantity * cartItem.price;

    return `<span class="singleItem">
    <b class="item-name">${cartItem.name.toUpperCase()}</b><br/>
    <img class="cart-image" src="${cartItem.image}" alt="${cartItem.alt}"/>
    <br/>
    price: $${cartItem.price}<br/>
    quantity: <input style="width: 33px; border: 0;" min="1" onchange="inputMonitor(event)" value="${
      cartItem.quantity
    }" id="${cartItem._id}" type="number"><br/>
    subtotal: ${subtotal}<br/>
    <button onclick="removeFromCart(event)" id=${
      cartItem._id
    } >Remove Item</button><br><br/>
    
    </span>
          `;
  });
  cartContainer.innerHTML = cartItems.join("");
  let total = cart.reduce((accumulator, item) => {
    return accumulator + item.quantity * item.price;
  }, 0);
  totalContainer.innerHTML = `Total: $${total}`;
}
onload = (event) => {
  loadCart();
};
if (cart) {
  checkoutOptions.innerHTML = `
  <p>Proceed To Payment:</p>
  <button onclick="checkOut()">Check Out</button>
  <button onclick="cancelCheckout()">Empty Cart</button>`;
}
function inputMonitor(event) {
  let qty = event.target.value;
  let id = event.target.id;
  let i = cart.findIndex((item) => item._id == id);
  cart[i].quantity = qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}
function removeFromCart(event) {
  let id = event.target.id;
  let i;
  for (i = 0; i < cart.length; i++) {
    if (cart[i]._id == id) {
      break;
    }
  }
  cart.splice(i, 1);
  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");
    alert("Cart Emptied!!!");
  }
  location.reload();
}
function checkOut() {
  if (cart) {
    fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.location.href = data.url;
      })
      .catch((err) => console.log(err));
  } else alert("First add items to cart");
}
function cancelCheckout() {
  if (cart) {
    localStorage.removeItem("cart");
    location.reload();
    alert("Cart Emptied!!!");
  }
}
