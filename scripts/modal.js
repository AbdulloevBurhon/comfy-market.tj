export function modalFn() {
  const openModal = document.querySelector('.size-6');
    if (!openModal) return  

  const modal = document.createElement("div");
  modal.classList.add('modal');

  const modalContent = document.createElement("div");
  modalContent.classList.add('modal__content');

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal__close";
  closeBtn.textContent = "✕";

  const title = document.createElement("h2");
  title.classList.add('modal__title');
  title.textContent = 'Your Bag';

  const modalItems = document.createElement("div");
  modalItems.classList.add('modal__items');

  const footer = document.createElement("div");
  footer.classList.add('modal__footer');

  const total = document.createElement("div");
  total.className = "modal__total";

  const totalLabel = document.createElement("span");
  totalLabel.textContent = "Total:";

  const totalPrice = document.createElement("span");
  totalPrice.textContent = `0 $`;

  const checkoutBtn = document.createElement("button");
  checkoutBtn.className = "modal__checkout";
  checkoutBtn.textContent = "CHECKOUT";

  modal.append(modalContent);
  modalContent.append(closeBtn, title, modalItems, footer);
  footer.append(total, checkoutBtn);
  total.append(totalLabel, totalPrice);

  document.body.append(modal);
  modal.style.display = 'none';
  openModal.onclick = () => {
    modal.style.display = 'flex';
    renderCart();
  };
  closeBtn.onclick = () => modal.style.display = 'none';

  function renderCart() {
    let productsToCarts = JSON.parse(localStorage.getItem("productsToCarts")) || [];
    // console.log(JSON.parse(localStorage.getItem('productsToCarts')));
    modalItems.innerHTML = ""; 

    productsToCarts.forEach(element => {
      const modalItem = document.createElement("div");
      modalItem.classList.add('modal__item');

      const img = document.createElement("img");
      img.classList.add('modal__img');
      img.src = element.fields.image[0].url;
      img.alt = element.fields.name;

      const info = document.createElement("div");
      info.classList.add('modal__info');

      const name = document.createElement("p");
      name.classList.add('modal__name');
      name.textContent = element.fields.name;

      const price = document.createElement("p");
      price.classList.add('modal__price');
      price.textContent = element.fields.price;

      const countBox = document.createElement("div");
      countBox.classList.add('modal__count');

      const quantity = document.createElement("span");
      quantity.textContent = element.quantity;

      const plusBtn = document.createElement("button");
      plusBtn.textContent = '+';
plusBtn.onclick = () => {

  const product = productsToCarts.find(p => p.id === element.id);
  if (!product) return;
  product.quantity++;
  quantity.textContent = product.quantity;
  updateCart(productsToCarts);
};
      const minusBtn = document.createElement("button");
      minusBtn.textContent = '-';
minusBtn.onclick = () => {
  const product = productsToCarts.find(p => p.id === element.id);
  if (!product) return;
  product.quantity--;
  if (product.quantity <= 0) {
    productsToCarts = productsToCarts.filter(p => p.id !== element.id);
    modalItem.remove();
 
  } else {
    quantity.textContent = product.quantity;
  }
  updateCart(productsToCarts);
};

      const removeBtn = document.createElement("button");
      removeBtn.classList.add('modal__remove');
      removeBtn.textContent = '✕';
      removeBtn.onclick = () => {
        productsToCarts = productsToCarts.filter(p => p.id !== element.id);
        modalItem.remove();
        updateCart(productsToCarts);
      };

      countBox.append(minusBtn,quantity,plusBtn);
      info.append(name, price, countBox);
      modalItem.append(img, info, removeBtn);
      modalItems.append(modalItem);
    });

    updateCart(productsToCarts);
  }

  function updateCart(products) {
    localStorage.setItem("productsToCarts", JSON.stringify(products));
    const total = products.reduce((sum, p) => sum + p.fields.price * p.quantity, 0);
    totalPrice.textContent = `${total} $`;
  }
}