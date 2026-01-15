import { get } from "../api/api.js";
import { modalFn } from "../api/modal.js";
import { render } from "./render.js";
import { productInit, productSearch,productPriceFilter } from "./product.js";
import { getById } from "../api/api.js";

let id = localStorage.getItem('id')
async function init() {
  try {
    const data = await get();
    const hasCardBox = document.querySelector('.cardBox');
    if (hasCardBox) {
      render(data);
    }
    const hasSidebar = document.querySelector('.sidebar');
    if (hasSidebar) {
      productInit();
      productSearch();
      productPriceFilter();
    }
    if(document.querySelector('.product')) getById(id)
    
  

    modalFn();
  } catch (error) {
    console.error(error);
  }
}

init()
