let cartContainer = document.getElementById("itemsCart");
let cart = JSON.parse(localStorage.getItem("cart"));
let totalContainer = document.getElementById("total");
let deliveryFee = document.getElementById("delivery");
let checkoutOptions = document.getElementById("checkout-options");
onload = (event) => {
  let cartItems = cart.map((cartItem) => {
    let subtotal = cartItem.quantity * cartItem.price;

    return `<span class="singleItem">
    <b>${cartItem.name.toUpperCase()}</b><br/><br/>
    price: $${cartItem.price}<br/>
    quantity: ${cartItem.quantity}<br/>
    subtotal: ${subtotal}<br/><br/>
    <button onclick="removeFromCart(event)" id=${
      cartItem._id
    } >Remove Item</button><br><br/>
    
    </span>
          `;
  });
  cartContainer.innerHTML = cartItems.join("");
  let total = cart.reduce((accumulator, object) => {
    return accumulator + object.quantity * object.price;
  }, 0);
  totalContainer.innerHTML = `Total: $${total}`;
};
if (cart) {
  checkoutOptions.innerHTML = `
  <p>Proceed To Payment:</p>
  <button onclick="checkOut()">Check Out</button>
  <button onclick="cancelCheckout()">Empty Cart</button>`;
}
function removeFromCart(event) {
  const id = event.target.id;
  console.log(id);
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
  } else alert("Fisrt add items to cart");
}
function cancelCheckout() {
  if (cart) {
    localStorage.clear();
    location.reload();
    alert("Cart Emptied!!!");
  }
}
