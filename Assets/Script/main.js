//// Imports
import { imgSrc, Products } from "./support.js";
import { buildFilter, setFilters, filterProducts } from "./layout_functions.js";
import { showWishes } from "./wishlist_functions.js";

import { displayCart } from "./cart_functions.js";

//// Global Variables
const typeNav = document.getElementById("type");
const tagsNav = document.getElementById("tags");
const display = document.getElementById("display");
const allTypes = [];
const allTags = [];

//// Data conditioning
/// Preload Images
function preloadImage(url) {
  let img = new Image();
  img.src = url;
}
for (let src of imgSrc) {
  preloadImage(src);
}
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
/// Create Filters
buildFilter("types", "Todos", allTypes.sort(), typeNav, "ul", "li", setFilters);
buildFilter("tags", "Todas", allTags, tagsNav, "ul", "li", setFilters);
/// Filter + Display Products
filterProducts(display);

//// Cart Management
displayCart();

//// Wishlist Management
showWishes();
