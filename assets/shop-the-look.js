/**
 *  @class
 *  @function ShopTheLook
 */
if (!customElements.get('shop-the-look')) {
  class ShopTheLook extends HTMLElement {
    constructor(e) {
      super();
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look', ShopTheLook);
}

function onChangeBackground(e) {
  console.log(1, e);
  const buttons = document.querySelectorAll('.shop-look-buttons_item');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  e.target.classList.add('active');
}

const btn1 = document.getElementById('button-1');
const btn2 = document.getElementById('button-2');
const btn3 = document.getElementById('button-3');
const btn4 = document.getElementById('button-4');
const btn5 = document.getElementById('button-5');
