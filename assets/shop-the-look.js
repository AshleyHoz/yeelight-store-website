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
  const currentEle = document.getElementsByClassName('shop-look-buttons-bg')[0];
  const containerEle = document.getElementsByClassName('shop-look-buttons')[0];
  const currentRect = currentEle.getBoundingClientRect();
  const containerRect = containerEle.getBoundingClientRect();
  console.log(e, currentEle, containerEle);
  currentEle.style.width = e.offsetWidth + 'px';
  currentEle.style.height = e.offsetHeight + 'px';
  const offSetX = currentRect.left - containerRect.left;
  currentEle.style.left = offSetX + 'px';
  currentEle.style.transform = 'translateX(' + offSetX + 'px)';
}
