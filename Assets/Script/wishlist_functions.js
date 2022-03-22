//// Imports
import { Cart, Wishes, Products } from "./support.js";
import { filterProducts } from "./layout_functions.js";
import { displayCart } from "./cart_functions.js";

//// Global Variables
const wishlist = document.getElementById("wish-list");
const wishItems = document.getElementById("wish-items");
const wishButton = document.getElementById("wish-button");

//// Wishlist Management
/// create whish card
function buildWish(obj, parent) {
  // card
  const card = document.createElement("div");
  card.classList.add("wish-card");
  // self
  const self = document.createElement("q");
  self.style.display = "none";
  self.innerText = obj.id;
  // image
  const imgTag = document.createElement("img");
  imgTag.src = obj.src[0];
  imgTag.alt = `${obj.name.toLowerCase()}`;
  // name
  const nameContainer = document.createElement("div");
  const name = document.createElement("h5");
  name.innerText = obj.name;
  nameContainer.appendChild(name);
  // remove item button
  const button = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-xmark");
  button.appendChild(icon);
  button.addEventListener("click", cancelWish);
  // combine all
  card.appendChild(self);
  card.appendChild(imgTag);
  card.appendChild(nameContainer);
  card.appendChild(button);
  parent.appendChild(card);
}

/// send to Whishes
function addWish() {
  const product = this.parentElement.parentElement.childNodes[0].innerText;
  if (!Wishes.includes(`P${product}`)) Wishes.push(`P${product}`);
  showWishes();
}

/// remove from Whishes
function cancelWish() {
  const product =
    this.parentElement.childNodes[0].innerText ||
    this.parentElement.parentElement.childNodes[0].innerText;
  let index = Wishes.indexOf(`P${product}`);
  Wishes.splice(index, 1);
  showWishes();
}

/// display wishlist
function showWishes() {
  // empty wishlist
  wishItems.innerHTML = "";
  // check if cart is empty
  if (Wishes.length === 0) {
    if (!wishlist.classList.contains("clear")) {
      wishlist.classList.toggle("clear");
    }
    filterProducts(display);
    return;
  }
  if (wishlist.classList.contains("clear")) {
    wishlist.classList.toggle("clear");
  }

  for (const p of Wishes) {
    const product = Products[`${p}`];
    buildWish(product, wishItems);
  }

  filterProducts(display);
}

/// send to Cart
function wishesToCart() {
  // add wishes to cart
  Cart.push(...Wishes);
  // clear wishes
  Wishes.splice(0, Wishes.length);
  showWishes();
  // refresh cart
  displayCart();
}

export { wishButton, buildWish, addWish, cancelWish, showWishes, wishesToCart };
