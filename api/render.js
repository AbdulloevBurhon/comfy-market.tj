export function render(data) {
  const cardBox = document.querySelector(".cardBox");

  const sreeCard = location.href.includes("home.html")
    ? data.slice(0, 3)
    : data;
  if (!cardBox)  return;
  

  cardBox.innerHTML = "";

  sreeCard.forEach((element) => {
  

    const card = document.createElement("div");
  



    const cardImage = document.createElement("div");


    const cardActions = document.createElement("div");

    
    cardActions.className = "card__actions";
        cardImage.className = "card__image";
      card.className = "card";
  
    const btnInfo = document.createElement("button");
    btnInfo.textContent = "Info";
    btnInfo.onclick = () => {
      localStorage.setItem("id", element.id);
      window.location.href = "./productid.html";
    };

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add";
    btnAdd.onclick = () => addToCart(element);


    const img = document.createElement("img");
    img.src = element.fields.image[0].url;
    img.alt = element.fields.name;

  
    const cardContent = document.createElement("div");
    cardContent.className = "card__content";

    const title = document.createElement("h3");
    title.textContent = element.fields.name;

    const price = document.createElement("p");
    price.textContent = `$${element.fields.price}`;


    cardActions.append(btnInfo, btnAdd);
    cardImage.append(cardActions, img);
    cardContent.append(title, price);

    card.append(cardImage, cardContent);
    cardBox.append(card);
  });
}

function addToCart(product) {

  let productsToCarts = JSON.parse(localStorage.getItem("productsToCarts")) || [];


  const item = productsToCarts.find((i) => i.id === product.id);

  if (item) {
    item.quantity++; 
  } else {
    productsToCarts.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("productsToCarts", JSON.stringify(productsToCarts));

}