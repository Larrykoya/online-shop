let productContainer = document.getElementById("products-section");

const products = [
  {
    id: 1,
    image: "/images/freezer.webp",
    name: "FREEZER",
    price: 300,
    alt: "freezer image",
    property: "size",
    description:
      "Newest model fridge with smart technology, energy-conservation and ample storage. Efficient and sleek refrigerator for all your storage needs.",
    quantity: 0,
  },
  {
    id: 2,
    image: "/images/artwork1.jpg",
    name: "PORTRAIT 1",
    price: 200,
    alt: "art work image",
    property: "artist",
    description:
      "Expertly hand-painted, custom portrait of your loved ones to add elegance and personal touch to any room. A perfect gift for any occasion.",
    quantity: 0,
  },
  {
    id: 3,
    image: "/images/headphone.jpg",
    name: "HEADPHONE",
    price: 150,
    alt: "headphone image",
    property: "color",
    description:
      "High-quality, noise-canceling headphones with comfortable fit, perfect for music lovers and professionals.",
    quantity: 0,
  },
  {
    id: 4,
    image: "/images/tv.webp",
    name: '32" TV',
    price: 350,
    alt: "tv image",
    property: "product",
    description:
      "Latest model 4k Ultra HD TV with smart technology and vivid colors, perfect for movie lovers and gamers.",
    quantity: 0,
  },
  {
    id: 5,
    image: "/images/blender.png",
    name: "BLENDER",
    price: 75,
    alt: "blender image",
    property: "product-maker",
    description:
      "Powerful and versatile blender, perfect for smoothies, juices, and soups. Stainless steel blades and easy to clean.",
    quantity: 0,
  },
  {
    id: 6,
    image: "/images/cooker.jpg",
    name: "COOKER",
    price: 220,
    alt: "cooker image",
    property: "product-maker",
    description:
      "Multi-functional cooker with pressure, slow, saute and steaming function. Cooks food faster while preserving nutrients.",
    quantity: 0,
  },
  {
    id: 7,
    image: "/images/chair.jpg",
    name: "COUCH",
    price: 150,
    alt: "chair image",
    property: "size",
    description:
      "Luxurious and comfortable couch with premium materials and elegant design, perfect for any living room.",
    quantity: 0,
  },
  {
    id: 8,
    image: "/images/microwave.jpg",
    name: "MICROWAVE",
    price: 135,
    alt: "microwave image",
    property: "product-maker",
    description:
      "High-performance microwave oven with multiple cooking options, defrosting and reheating options, perfect for any kitchen.",
    quantity: 0,
  },
  {
    id: 9,
    image: "/images/artwork2.jpg",
    name: "ARTWORK",
    price: 200,
    alt: "art work image",
    property: "artist",
    description:
      "Stunning, one-of-a-kind artwork, created by a master artist, perfect for adding beauty and elegance to any room.",
    quantity: 0,
  },
  {
    id: 10,
    image: "/images/pot.jpg",
    name: "POT SET",
    price: 55,
    alt: "pot image",
    property: "color",
    description:
      "Complete set of high-quality pots, made of durable stainless steel, perfect for cooking a variety of dishes.",
    quantity: 0,
  },
  {
    id: 11,
    image: "/images/washingmachine.jpg",
    name: "WASHING MACHINE",
    price: 250,
    alt: "washing machine image",
    property: "company",
    description:
      "Efficient and high-performance washing machine with multiple cycle options, perfect for any household.",
    quantity: 0,
  },
  {
    id: 12,
    image: "/images/wine.jpg",
    name: "VINTAGE WINE",
    price: 150,
    alt: "wine image",
    property: "flavor",
    description:
      "Fine aged vintage wine, rich in taste and aroma, perfect for any occasion.",
    quantity: 0,
  },
];

let cart = [];
function addToCart(event) {
  alert("added to cart");
  let id = Number(event.target.id);
  console.log("my id", id);
  let index = products.findIndex((product) => product.id === id);
  if (index > -1) {
    let product = products[index];
    products[index] = product;
    let duplicate = cart.some((cartItem) => cartItem.id === id);
    if (duplicate) {
      product.quantity += 1;
    } else {
      product.quantity += 1;
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

onload = (event) => {
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
          ${product.name} $${product.price} <button onclick="addToCart(event)" id=${product.id} class="add_to_cart">Add to cart</button>
          </p> </span
        ><span class="details"
          ><h3>product details:</h3>
          <p>${product.description}</p></span
        >
      </div>
        `;
  });

  productContainer.innerHTML = productToDisplay;
};
