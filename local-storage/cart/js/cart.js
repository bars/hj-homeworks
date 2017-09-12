'use strict';
let
  colourXhr = new XMLHttpRequest(),
  sizeXhr = new XMLHttpRequest(),
  cartXhr = new XMLHttpRequest(),
  colours = document.getElementById('colorSwatch'),
  sizes = document.getElementById('sizeSwatch'),
  cartSnip = document.getElementById('quick-cart'),
  addButton = document.getElementById('AddToCart'),
  cartForm = document.getElementById('AddToCartForm');
colourXhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
colourXhr.send();
sizeXhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
sizeXhr.send();
cartXhr.open('GET', 'https://neto-api.herokuapp.com/cart', true);
cartXhr.send();
if (localStorage.color === undefined)
{
  localStorage.color = 'blue';
}
if (localStorage.size === undefined)
{
  localStorage.size = 's';
}

colourXhr.addEventListener('load', (e) => {
  let colour = JSON.parse(colourXhr.response), 
      coloursContent = '',
      available = '',
      disabled = '',
      checked = '';
  
  colour.forEach(c => { 
    if (c.type === localStorage.color) 
    {
      checked = 'checked';
    }
    if (c.isAvailable) 
    {
      available = 'available';
      disabled = '';
    }
    else 
    {
      available = 'soldout'
      disabled = 'disabled'
    }    
    coloursContent += 
      `<div data-value=${c.type} class="swatch-element color ${c.type} ${available}">
          <div class="tooltip">${c.title}</div>
          <input quickbeam="color" id="swatch-1-${c.type}" type="radio" name="color" value=${c.type} ${checked} ${disabled}>
          <label for="swatch-1-${c.type}" style="border-color: ${c.type};">
            <span style="background-color: ${c.code};"></span>
            <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
          </label>
        </div>`;
    if (checked === 'checked')
    {
      checked = '';
    }
  });
  colours.innerHTML += coloursContent;
});

sizeXhr.addEventListener('load', (e) => {
  var size = JSON.parse(sizeXhr.response);  
  let sizeContent = '',
      available = '',
      disabled = '',
      checked = '';
  size.forEach(s => {
    if (s.type === localStorage.size) 
    {
      checked = 'checked';
    }
    if (s.isAvailable) 
    {
      available = 'available';  
      disabled = '';
    }
    else
    {
      available = 'soldout';
      disabled = 'disabled';
    }
    sizeContent += `    
      <div data-value=${s.type} class="swatch-element plain ${s.type} ${available}">
        <input id="swatch-0-${s.type}" type="radio" name="size" value=${s.type} ${disabled} ${checked}>
        <label for="swatch-0-${s.type}">
          ${s.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>`;
    if (checked === 'checked')
    {
      checked = '';
    }
  })
  sizes.innerHTML += sizeContent;
});

cartXhr.addEventListener('load', (e) => {
  var cart = JSON.parse(cartXhr.response);
  updateCart(cart);
});
function updateCart(cartData) 
{
  let items = '',
      cartContent = '',
      price = 0,
      open = 'open';
  if (cartData.length === 0) 
  {
    open = '';
  }
  cartData.forEach(item => {
    price += item.price * item.quantity;
    items += 
       `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
          <div class="quick-cart-product-wrap">
            <img src=${item.pic} title=${item.title}>
            <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
            <span class="s2"></span>
          </div>
          <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
          <span class="quick-cart-product-remove remove" data-id=${item.id}></span>
        </div>`;
  })
  cartContent = `
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$${price.toFixed(2)}</span>
      </span>
    </a>`
  cartSnip.innerHTML = items + cartContent;
  var cartRemove = document.getElementsByClassName('remove')[0];
}

addButton.addEventListener('click', () => { 
  event.preventDefault();
  let form = new FormData(cartForm);
  form.append('productId', cartForm.dataset.productId);
  cartXhr.open('POST', 'https://neto-api.herokuapp.com/cart');
  cartXhr.send(form);
  });

cartSnip.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) 
  {
    e.stopPropagation();
    let remove = new XMLHttpRequest(),
        form = new FormData();
    form.append('productId', e.target.dataset.id);
    remove.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    remove.send(form);
    remove.addEventListener('load', () => {
      updateCart(JSON.parse(remove.response));
    });
  }
})
cartForm.addEventListener('change', (e) => {
  localStorage.setItem(e.target.name, e.target.value);
})