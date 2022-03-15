import { Cart, WhishList, Products } from "./support.js";

//// Global variables
const typeNav = document.getElementById("type");
const tagsNav = document.getElementById("tags");
const display = document.getElementById("display");
const allTypes = [];
const allTags = [];

/// Conditioning data
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

//// Functions

/// Create Fitlers
function buildFilter(arr, parent1, parent2, child) {
  let container = document.createElement(parent2);
  let all = document.createElement(child);
  all.innerText = "Todas";
  container.appendChild(all);
  for (let element of arr) {
    let newChild = document.createElement(child);
    newChild.innerText = `${
      element.slice(0, 1).toUpperCase() + element.slice(1)
    }`;
    container.appendChild(newChild);
  }
  parent1.appendChild(container);
}

buildFilter(allTypes.sort(), typeNav, "ul", "li");
buildFilter(allTags, tagsNav, "ul", "li");

/// Create product card
function buildProductCard(obj, parent) {
  // card
  const article = document.createElement("article");
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
  // combine all
  article.appendChild(pic);
  article.appendChild(tagCont);
  article.appendChild(name);
  article.appendChild(info);
  article.appendChild(price);
  article.appendChild(wish);
  article.appendChild(cartB);
  parent.appendChild(article);
}

for (let p in Products) {
  let newP = Products[`${p}`];
  buildProductCard(newP, display);
}
