let productContainer = document.getElementById("products-section");

let products = [];
const url = "/api/items";

onload = () => {
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
              ${product.name} $${product.price} <button onclick="deleteItem(event)" Id2=${product.imageId} id=${product._id}>Delete Item</button>
              </p> </span
            ><span class="details"
              ><h3>product details:</h3>
              <p>${product.description}</p></span
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

function deleteItem(event) {
  let id = event.target.id;
  let image_id = event.target.Id2;
  console.log(event.target);
  console.log(image_id);
  console.log("this fired");
  const selectedItem = document.getElementById(id);
  selectedItem.style.backgroundColor = "#e63946";
  selectedItem.innerHTML = "Deleting...";
  data = { id, image_id };

  fetch("", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      window.location.reload();
    })
    .catch((err) => console.log(err));
}
