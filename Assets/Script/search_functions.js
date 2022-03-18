//// Imports
import { Search, Gallery, Products } from "./support.js";
import { buildProductCard } from "./layout_functions.js";

//// Global Variables
const sMobile = document.getElementById("mobile-search-bar");
const bMobile = document.getElementById("mobile-search-button");
const display = document.getElementById("display");
const sBar = document.getElementById("search-bar");
const sButton = document.getElementById("search-button");

//// Preform Search
/// Get input
function newSearch(origin) {
  // clear search
  Search.splice(0, Search.length);
  // get input
  const str = origin.value;
  if (str === "") return;
  // conditioning data
  Search.push(...str.toLowerCase().split(" "));
  // start search
  searchProducts(display);
}

/// Search products
function searchProducts(parent) {
  // empty gallery
  Gallery.splice(0, Gallery.length);
  // empty display
  parent.innerHTML = "";
  // find products
  for (let product in Products) {
    let p = Products[`${product}`];
    let name = p.name.toLowerCase().split(" ");
    let tags = p.tags.join(" ").split(" ");
    let type = p.type;

    if (Search.includes("todos") || Search.includes("todas")) {
      Gallery.push(p);
    } else {
      for (let w of Search) {
        if (name.includes(w) || tags.includes(w) || type === w) {
          Gallery.push(p);
        }
      }
    }
  }
  for (let p of Gallery) {
    buildProductCard(p, parent);
  }
}

//// Data Condidioning

export { sMobile, bMobile, sBar, sButton, newSearch };
