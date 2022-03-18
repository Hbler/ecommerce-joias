//// Imports
import { Wishes } from "./support.js";
import { Products, Gallery } from "./support.js";
import { addWish } from "./wishlist_functions.js";
import { addToCart } from "./cart_functions.js";

//// Global Variables
const typeNav = document.getElementById("type");
const tagsNav = document.getElementById("tags");
const display = document.getElementById("display");
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
    newChild.addEventListener("click", (e) => {
      func(e.target);
    });
    container.appendChild(newChild);
  }
  parent1.appendChild(container);
}

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
  if (Wishes.includes(`P${obj.id}`)) icon.classList.add("fa-solid");
  else icon.classList.add("fa-regular");
  icon.classList.add("fa-heart");
  wish.appendChild(icon);
  wish.addEventListener("click", addWish);
  // add to cart
  const cartB = document.createElement("button");
  cartB.classList.add("add-cart");
  cartB.innerText = "Adicionar ao carrinho";
  cartB.addEventListener("click", addToCart);
  // arrange buttons
  const bDiv = document.createElement("div");
  bDiv.appendChild(wish);
  bDiv.appendChild(cartB);
  // combine all
  card.appendChild(self);
  card.appendChild(pic);
  card.appendChild(tagCont);
  card.appendChild(name);
  card.appendChild(info);
  card.appendChild(price);
  card.appendChild(bDiv);
  parent.appendChild(card);
}

/// Filter
// Get filters
function setFilters(element) {
  const Types = typeNav.childNodes[0].childNodes;
  const Tags = tagsNav.childNodes[0].childNodes;

  if (element.innerText !== "Todos" && element.innerText !== "Todas") {
    element.classList.toggle("active");
    if (element.parentElement.name === "types") {
      Types[0].classList.remove("active");
    }
    if (element.parentElement.name === "tags") {
      Tags[0].classList.remove("active");
    }
  }
  if (element.innerText === "Todos") {
    element.classList.toggle("active");
    Types.forEach((x) => {
      if (x.innerText !== "Todos") {
        x.classList.remove("active");
      }
    });
  }
  if (element.innerText === "Todas") {
    element.classList.toggle("active");
    Tags.forEach((x) => {
      if (x.innerText !== "Todas") {
        x.classList.remove("active");
      }
    });
  }

  filterProducts(display);
}
// Apply filters
function filterProducts(parent) {
  // empty gallery
  Gallery.splice(0, Gallery.length);
  // empty display
  parent.innerHTML = "";
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
    buildProductCard(p, parent);
  }
}

export {
  allTypes,
  allTags,
  buildFilter,
  buildProductCard,
  setFilters,
  filterProducts,
};
