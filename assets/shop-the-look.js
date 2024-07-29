/**
 *  @class
 *  @function ShopTheLook
 */
if (!customElements.get('shop-the-look')) {
  class ShopTheLook extends HTMLElement {
    constructor(e) {
      super();
      console.log(1, this);
      const currentEle = this.getElementsByClassName('shop-look-buttons-bg');
      const button1 = document.getElementsByClassName('shop-look-buttons_item')[0];
      console.log(currentEle);

      currentEle.forEach(item => {
        item.style.width = button1.offsetWidth + 'px';
        item.style.height = button1.offsetHeight + 'px';
      });
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look', ShopTheLook);
}

function onChangeBackground(e) {
  const currentEle = document.getElementsByClassName('shop-look-buttons-bg')[0];
  // const containerEle = document.getElementsByClassName('shop-look-buttons')[0];
  const containerEle = e.closest('.shop-look-buttons');
  console.log(containerEle);
  const currentRect = currentEle.getBoundingClientRect();
  const containerRect = containerEle.getBoundingClientRect();
  console.log(e, currentEle, containerEle, currentRect, containerRect);
  currentEle.style.width = e.offsetWidth + 'px';
  currentEle.style.height = e.offsetHeight + 'px';
  const offSetX = currentRect.left - containerRect.left;
  console.log(offSetX);
  currentEle.style.position = 'absolute';
  currentEle.style.top = 0;
  currentEle.style.left = offSetX + 'px';
  currentEle.style.transform = 'translateX(' + offSetX + 'px)';
}

// window.onload = function () {
//   const lookEle = document.getElementsById('shop_the_look_94Y4Bx');
//   console.log(lookEle);
//   const currentEle = document.getElementsByClassName('shop-look-buttons-bg');
//   const button1 = document.getElementsByClassName('shop-look-buttons_item')[0];
//   currentEle.forEach(item => {
//     item.style.width = button1.offsetWidth + 'px';
//     item.style.height = button1.offsetHeight + 'px';
//   });
// };
