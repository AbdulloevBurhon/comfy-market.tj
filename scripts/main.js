import { get, getById } from '../scripts/api.js'
import { modalFn } from '../scripts/modal.js'
import { productInit, productPriceFilter, productSearch } from './product.js'
import { render } from './render.js'

let id = localStorage.getItem('id')
async function init() {
 try {
  const data = await get()
  const hasCardBox = document.querySelector('.cardBox')
  if (hasCardBox) {
   render(data)
  }
  const hasSidebar = document.querySelector('.sidebar')
  if (hasSidebar) {
   productInit()
   productSearch()
   productPriceFilter()
  }
  if (document.querySelector('.product')) getById(id)

  modalFn()
 } catch (error) {
  console.error(error)
 }
}

init()
