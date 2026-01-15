



export function getIDFn(user) {

 document.querySelector('#imgId').src = user.fields.image[0].url
 document.querySelector('.product__title').textContent = user.fields.name
  document.querySelector('.product__author').textContent = user.fields.company
  document.querySelector('.product__price').textContent = `${user.fields.price} $`
  document.querySelector('.color--red').style.background = user.fields.colors[0]
    document.querySelector('.color--black').style.background = user.fields.colors[1]
}