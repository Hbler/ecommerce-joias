//// Imports
import { Cart, Products } from "./support.js";

//// Global variables
const cartItems = document.getElementById("cart-items");
const cartSum = document.getElementById("summary");

//// Cart Management
/// Create cart card
function buildCartCard(obj, qtty, parent) {
  // card
  const card = document.createElement("div");
  card.classList.add("cart-card");
  // self
  const self = document.createElement("q");
  self.style.display = "none";
  self.innerText = obj.id;
  // image
  const imgTag = document.createElement("img");
  imgTag.src = obj.src[0];
  imgTag.alt = `${obj.name.toLowerCase()}`;
  // name + price
  const namePrice = document.createElement("div");
  const name = document.createElement("h5");
  name.innerText = obj.name;
  const price = document.createElement("p");
  price.innerText = obj.value;
  namePrice.appendChild(name);
  namePrice.appendChild(price);
  // quantity
  const amount = document.createElement("div");
  const txt = document.createElement("p");
  txt.innerText = "Qtd";
  const quantity = document.createElement("p");
  quantity.innerText = `x${qtty}`;
  amount.appendChild(txt);
  amount.appendChild(quantity);
  // remove item button
  const button = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  button.appendChild(icon);
  button.addEventListener("click", takeFromCart);
  // combine all
  card.appendChild(self);
  card.appendChild(imgTag);
  card.appendChild(namePrice);
  card.appendChild(amount);
  card.appendChild(button);
  parent.appendChild(card);
}

/// send to Cart list
function addToCart() {
  const product = this.parentElement.parentElement.childNodes[0].innerText;
  console.log(product);
  Cart.push(`P${product}`);
  displayCart();
}

/// remove from Cart list
function takeFromCart() {
  const product = this.parentElement.childNodes[0].innerText;
  while (Cart.includes(`P${product}`)) {
    let index = Cart.indexOf(`P${product}`);
    Cart.splice(index, 1);
  }
  displayCart();
}

/// display products
function displayCart() {
  // clean list
  cartItems.innerHTML = "";
  // check if empty
  if (Cart.length === 0) {
    const empty = document.createElement("div");
    empty.classList.add("empty-card");
    const txt = document.createElement("h5");
    txt.innerText = "Sua bag está vazia";
    const txt2 = document.createElement("p");
    txt2.innerText = "adicione peças";
    empty.appendChild(txt);
    empty.appendChild(txt2);
    cartItems.appendChild(empty);
  } else {
    // limit card quantity
    const toShow = new Set(Cart);
    // create card and add to cart list
    for (const p of toShow) {
      const product = Products[`${p}`];
      const qtty = Cart.filter((x) => x === p).length;
      buildCartCard(product, qtty, cartItems);
    }
  }
  cartSummary();
}

/// cart summary
// create summary
function buildSummary(arr, parent) {
  // total amout of items
  const itemAmount = document.createElement("div");
  const items = document.createElement("p");
  items.innerText = "Peças:";
  const amount = document.createElement("p");
  amount.innerText = `${arr.length}`;
  itemAmount.appendChild(items);
  itemAmount.appendChild(amount);
  // total value of items
  const totalValue = document.createElement("div");
  const total = document.createElement("p");
  total.innerText = "Total:";
  const value = document.createElement("p");
  let cost = 0;
  for (let product of arr) {
    let p = Products[`${product}`];
    cost += p.price;
  }
  value.innerText = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cost);
  totalValue.appendChild(total);
  totalValue.appendChild(value);
  // buy button
  const button = document.createElement("button");
  button.innerText = "Comprar";
  // combine all
  parent.appendChild(itemAmount);
  parent.appendChild(totalValue);
  parent.appendChild(button);
}

// display summary
function cartSummary() {
  // empty summary
  cartSum.innerHTML = "";
  // check if cart is empty
  if (Cart.length === 0) {
    if (!cartSum.classList.contains("clear")) cartSum.classList.toggle("clear");
    return;
  }
  if (cartSum.classList.contains("clear")) {
    cartSum.classList.toggle("clear");
  }

  buildSummary(Cart, cartSum);
}

export {
  buildCartCard,
  addToCart,
  takeFromCart,
  displayCart,
  buildSummary,
  cartSummary,
};
