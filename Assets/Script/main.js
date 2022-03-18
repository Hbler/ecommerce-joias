//// Imports
import { imgSrc } from "./support.js";
import {
  allTypes,
  allTags,
  buildFilter,
  setFilters,
  filterProducts,
} from "./layout_functions.js";
import { displayCart } from "./cart_functions.js";
import { showWishes } from "./wishlist_functions.js";
import {
  sMobile,
  bMobile,
  sBar,
  sButton,
  newSearch,
} from "./search_functions.js";
//// Global Variables
const typeNav = document.getElementById("type");
const tagsNav = document.getElementById("tags");
const display = document.getElementById("display");

//// Data conditioning
/// Preload Images
function preloadImage(url) {
  let img = new Image();
  img.src = url;
}
for (let src of imgSrc) {
  preloadImage(src);
}

//// Listeners
document.addEventListener("keydown", (e) => {
  const keyName = e.key;
  if (keyName === "Enter") {
    e.preventDefault();
    const path = e.path || (e.composedPath && e.composedPath());
    if (path) {
      const where = path[0].id;
      if (where === "mobile-search-bar") newSearch(sMobile);
      else newSearch(sBar);
    } else {
      return;
    }
  }
});
bMobile.addEventListener("click", () => {
  newSearch(sMobile);
});

sButton.addEventListener("click", () => {
  newSearch(sBar);
});

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
