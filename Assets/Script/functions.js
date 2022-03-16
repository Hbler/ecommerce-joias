import { imgSrc, Gallery, Cart, WhishList, Products } from "./support.js";

//// Global variables
const typeNav = document.getElementById("type");
const tagsNav = document.getElementById("tags");
const display = document.getElementById("display");
const cartItems = document.getElementById("cart-items");
const cartSum = document.getElementById("summary");
const allTypes = [];
const allTags = [];

//// Conditioning data
/// Types and Tags
for (let p in Products) {
  let type = Products[`${p}`].type;
  let tagsList = Products[`${p}`].tags;

  if (!allTypes.includes(type)) {
    allTypes.push(type);
  }

  for (let tag of tagsList) {
    if (!allTags.includes(tag)) {
      allTags.push(tag);
    }
  }
}
/// Preload Images
function preloadImage(url) {
  let img = new Image();
  img.src = url;
}
for (let src of imgSrc) {
  preloadImage(src);
}

//// Display Management
/// Create Fitlers
function buildFilter(name, fItem, arr, parent1, parent2, child, func) {
  let container = document.createElement(parent2);
  container.name = name;
  let all = document.createElement(child);
  all.innerText = fItem;
  all.classList.add("active");
  all.addEventListener("click", func);
  container.appendChild(all);
  for (let element of arr) {
    let newChild = document.createElement(child);
    newChild.innerText = `${
      element.slice(0, 1).toUpperCase() + element.slice(1)
    }`;
    newChild.addEventListener("click", func);
    container.appendChild(newChild);
  }
  parent1.appendChild(container);
}
buildFilter("types", "Todos", allTypes.sort(), typeNav, "ul", "li", setFilters);
buildFilter("tags", "Todas", allTags, tagsNav, "ul", "li", setFilters);

/// Create product card
function buildProductCard(obj, parent) {
  // card
  const card = document.createElement("article");
  // obj
  const self = document.createElement("q");
  self.style.display = "none";
  self.innerText = obj.id;
  // images
  const pic = document.createElement("div");
  pic.classList.add("pic");
  for (let i of obj.src) {
    let imgTag = document.createElement("img");
    imgTag.src = i;
    imgTag.alt = `${obj.name.toLowerCase()}`;
    pic.appendChild(imgTag);
  }
  // tags
  const tagCont = document.createElement("div");
  const typeTag = document.createElement("small");
  typeTag.innerText = obj.type;
  tagCont.appendChild(typeTag);
  for (let t of obj.tags) {
    let tagTag = document.createElement("small");
    tagTag.innerText = t;
    tagCont.appendChild(tagTag);
  }
  // name
  const name = document.createElement("h3");
  name.innerText = obj.name;
  // description
  const info = document.createElement("p");
  info.innerText = obj.info;
  // cost
  const price = document.createElement("h4");
  price.innerText = obj.value;
  /// buttons
  // wish
  const wish = document.createElement("button");
  wish.classList.add("wish");
  const icon = document.createElement("i");
  icon.classList.add("fa-regular");
  icon.classList.add("fa-heart");
  wish.appendChild(icon);
  // add to cart
  const cartB = document.createElement("button");
  cartB.classList.add("add-cart");
  cartB.innerText = "Adicionar ao carrinho";
  cartB.addEventListener("click", addToCart);
  // combine all
  card.appendChild(self);
  card.appendChild(pic);
  card.appendChild(tagCont);
  card.appendChild(name);
  card.appendChild(info);
  card.appendChild(price);
  card.appendChild(wish);
  card.appendChild(cartB);
  parent.appendChild(card);
}

/// Filter
// Get filters
function setFilters() {
  const Types = typeNav.childNodes[0].childNodes;
  const Tags = tagsNav.childNodes[0].childNodes;

  if (this.innerText !== "Todos" && this.innerText !== "Todas") {
    this.classList.toggle("active");
    if (this.parentElement.name === "types") {
      Types[0].classList.remove("active");
    }
    if (this.parentElement.name === "tags") {
      Tags[0].classList.remove("active");
    }
  }
  if (this.innerText === "Todos") {
    this.classList.toggle("active");
    Types.forEach((x) => {
      if (x.innerText !== "Todos") {
        x.classList.remove("active");
      }
    });
  }
  if (this.innerText === "Todas") {
    this.classList.toggle("active");
    Tags.forEach((x) => {
      if (x.innerText !== "Todas") {
        x.classList.remove("active");
      }
    });
  }

  filterProducts();
}
// Apply filters
function filterProducts() {
  // empty gallery
  Gallery.splice(0, Gallery.length);
  // empty display
  display.innerHTML = "";
  //variables
  const Types = typeNav.childNodes[0].childNodes;
  const Tags = tagsNav.childNodes[0].childNodes;
  const fTypes = [];
  const fTags = [];

  // get active filters
  Types.forEach((x) => {
    if (x.classList.contains("active")) {
      fTypes.push(x.innerText.toLowerCase());
    }
  });
  Tags.forEach((x) => {
    if (x.classList.contains("active")) {
      fTags.push(x.innerText.toLowerCase());
    }
  });

  // check for empty lists or if "display all" is active
  if (fTypes.length === 0 || fTypes.includes("todos")) {
    fTypes.push(...allTypes);
    if (!Types[0].classList.contains("active"))
      Types[0].classList.toggle("active");
  }
  if (fTags.length === 0 || fTags.includes("todas")) {
    fTags.push(...allTags);
    if (!Tags[0].classList.contains("active"))
      Tags[0].classList.toggle("active");
  }

  // aplly filters
  for (let product in Products) {
    let p = Products[`${product}`];

    // filter tags
    let hasTag = fTags.some((x) => p.tags.includes(x));
    // filter type
    if (fTypes.includes(p.type) && hasTag) {
      Gallery.push(p);
    }
  }

  for (let p of Gallery) {
    buildProductCard(p, display);
  }
}

filterProducts();

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
  const product = this.parentElement.childNodes[0].innerText;
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
    txt2.innerText = "Adicione peças";
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

displayCart();

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
