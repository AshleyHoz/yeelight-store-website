/**
 *  @class
 *  @function ShopTheLook
 */
if (!customElements.get('shop-the-look')) {
  class ShopTheLook extends HTMLElement {
    constructor(e) {
      super();
      this.addEventListener('click', this.onChangeBackground);
      const currentEle = this.getElementsByClassName('shop-look-buttons-bg')[0];
      const button1 = this.getElementsByClassName('shop-look-buttons_item')[0];
      if (!currentEle) return;
      currentEle.style.width = button1.offsetWidth + 'px';
      currentEle.style.height = button1.offsetHeight + 'px';
      button1.classList.add('active');
    }
    onChangeBackground(e) {
      console.log(2, e);
      if (
        e.target.className === 'shop-look-buttons_item-content' ||
        e.target.parentNode.className === 'shop-look-buttons_item-content'
      ) {
        const coverEle = this.getElementsByClassName('shop-look-buttons-bg')[0];
        const currentEle = e.target.className === 'shop-look-buttons_item-content' ? e.target : e.target.parentNode;
        const containerEle = this.getElementsByClassName('shop-look-buttons')[0];
        const buttonsEle = this.getElementsByClassName('shop-look-buttons_item');
        const buttonItemEle = currentEle.parentNode;
        const currentRect = currentEle.getBoundingClientRect();
        const containerRect = containerEle.getBoundingClientRect();
        const offSetX = currentRect.left - containerRect.left;
        coverEle.style.width = currentEle.offsetWidth + 'px';
        coverEle.style.height = currentEle.offsetHeight + 'px';
        coverEle.style.position = 'absolute';
        coverEle.style.top = 0;
        coverEle.style.left = 0;
        coverEle.style.transform = 'translateX(' + offSetX + 'px)';
        console.log(buttonsEle, buttonItemEle, Array.isArray(buttonsEle));
        for (let i = 0; i < buttonsEle.length; i++) {
          buttonsEle[i].classList.remove('active');
        }
        buttonItemEle.classList.add('active');
      }
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look', ShopTheLook);
}

// function onChangeBackground(e) {
//   console.log(1, e);
//   const currentEle = e;
//   const coverEle = document.getElementsByClassName('shop-look-buttons-bg')[0];
//   // const containerEle = document.getElementsByClassName('shop-look-buttons')[0];
//   const containerEle = e.closest('.shop-look-buttons');
//   console.log(containerEle);
//   const currentRect = currentEle.getBoundingClientRect();
//   const containerRect = containerEle.getBoundingClientRect();
//   console.log(e, currentEle, containerEle, currentRect, containerRect);
//   currentEle.style.width = e.offsetWidth + 'px';
//   currentEle.style.height = e.offsetHeight + 'px';
//   const offSetX = currentRect.left - containerRect.left;
//   console.log(offSetX);
//   currentEle.style.position = 'absolute';
//   currentEle.style.top = 0;
//   currentEle.style.left = offSetX + 'px';
//   currentEle.style.transform = 'translateX(' + offSetX + 'px)';
// }

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
