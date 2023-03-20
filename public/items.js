let productContainer = document.getElementById("products-section");

let products = [];
const url = "/api/items";

onload = (event) => {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      products = data;
      let productToDisplay = products.map((product) => {
        return `
            <div class="product-display">
            <span class="">
              <img
                class="products"
                src=${product.image}
                alt=${product.alt}
              />
              <p>
              ${product.name.toUpperCase()} $${
          product.price
        } <button onclick="addToCart(event)" id=${
          product._id
        } class="add_to_cart">Add to cart</button>
              </p> </span
            ><span class="details"
              ><h3>product details:</h3>
              <p>${product.description}.</p></span
            >
          </div>
            `;
      });

      productContainer.innerHTML = productToDisplay.join("");
    })
    .catch((err) => {
      productContainer.innerHTML =
        "SORRY, NO PRODUCTS AT THE MOMENT...TRY AGAIN LATER";
      console.log(err);
    });
};

let cart = [];
function addToCart(event) {
  let id = event.target.id;
  const addToCartBtn = document.getElementById(id);
  addToCartBtn.style.backgroundColor = "#e63946";
  addToCartBtn.innerHTML = "Added";
  setTimeout(() => {
    addToCartBtn.style.backgroundColor = "#457b9d";
    addToCartBtn.innerHTML = "Add to Cart";
  }, 600);
  let index = products.findIndex((product) => product._id === id);
  if (index > -1) {
    let product = products[index];
    products[index] = product;
    let duplicate = cart.some((cartItem) => cartItem._id === id);
    if (duplicate) {
      product.quantity += 1;
    } else {
      product.quantity += 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
