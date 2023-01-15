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
    <select name="property" id="property">
        <option>${cartItem.property}</option>
        </select>
    </span>
          `;
  });
  cartContainer.innerHTML = cartItems;
  let total = cart.reduce((accumulator, object) => {
    return accumulator + object.quantity * object.price;
  }, 0);
  totalContainer.innerHTML = `$${total}`;
  if (total < 1000) {
    deliveryFee.innerHTML = `Delivery fee: $${total * 0.1}`;
  } else {
    deliveryFee.innerHTML = `Delivery is free.`;
  }
};
