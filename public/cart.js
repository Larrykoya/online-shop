let cartContainer = document.getElementById("itemsCart");
let cart = JSON.parse(localStorage.getItem("cart"));
let totalContainer = document.getElementById("total");
let deliveryFee = document.getElementById("delivery");
onload = (event) => {
  let cartItems = cart.map((cartItem) => {
    let subtotal = cartItem.quantity * cartItem.price;

    return `<span class="singleItem">
    <b>${cartItem.name}</b><br/><br/>
    price: $${cartItem.price}<br/>
    quantity: ${cartItem.quantity}<br/>
    subtotal: ${subtotal}<br/><br/>
    <button disabled >Added To Cart</button><br><br/>
    
    </span>
          `;
  });
  cartContainer.innerHTML = cartItems.join("");
  let total = cart.reduce((accumulator, object) => {
    return accumulator + object.quantity * object.price;
  }, 0);
  totalContainer.innerHTML = `Total: $${total}`;
  // if (total < 1000) {
  //   deliveryFee.innerHTML = `Delivery fee: $${total * 0.1}`;
  // } else {
  //   deliveryFee.innerHTML = `Delivery is free.`;
  // }
};

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
