import { render } from "./render.js";
import { get } from "./api.js";
let allData = []; 
export async function productInit() {
  const searchInput = document.querySelector(".sidebar__search");
  const boxBtnCompany = document.querySelector('.sidebar__buttons');
  allData = await get(); 
  console.log(allData);
  const companies = ['all', ...new Set(allData.map((product) => {
    console.log(product);
    return product.fields.company;
  }))];
let ar= []
  let arr = [1,2,3]
  arr[0]=[...ar]
  console.log(arr);
  console.log(ar);
  console.log(companies);
  companies.forEach(company => {
    let btn = document.createElement('button');
    btn.innerHTML = company.charAt(0).toUpperCase() + company.slice(1);
    btn.value = company;
    btn.classList.add('sidebar__btn');
    boxBtnCompany.append(btn);
    
    btn.onclick = () => {
      if(btn.value == 'all'){
        render(allData);
      } else {
        const filtered = allData.filter((item) => {
          return item.fields.company == btn.value;
        });
        render(filtered);
      }
    };
  });
}

export function productSearch(){
  const searchInput = document.querySelector('.sidebar__search');
  
  searchInput.oninput = () => {
    const value = searchInput.value.toLowerCase();
    const filtered = allData.filter(item => {
      return item.fields.name.toLowerCase().includes(value);
    });
    render(filtered);
  };
}

export function productPriceFilter() {
  const priceRange = document.querySelector('.inpRange');
  const rangeValue = document.querySelector('#valueRange');

  if (!priceRange) return;

  priceRange.oninput = () => {
    const maxPrice = +priceRange.value;
    rangeValue.textContent = maxPrice;

    const filtered = allData.filter(item => {
      return item.fields.price <= maxPrice;
    });
// console.log(filtered);
    render(filtered);
  };
}