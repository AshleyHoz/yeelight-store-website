/**
 *  @class
 *  @function ShopTheLookSlider
 */
if (!customElements.get('shop-the-look-slider')) {
  class ShopTheLookSlider extends HTMLElement {
    constructor(e) {
      super();
      this.addEventListener('click', this.onChangeBackground);
      // const coverEle = this.getElementsByClassName('shop-look-slider-buttons-bg')[0];
      const button1 = this.getElementsByClassName('shop-look-slider-buttons_item')[0];
      // if (!coverEle) return;
      // coverEle.style.width = button1.offsetWidth + 'px';
      // coverEle.style.height = button1.offsetHeight * 0.5 + 'px';
      button1.classList.add('active');
      const hotpotsEle = this.getElementsByClassName('shop-the-look-slider--area');
      hotpotsEle[0].classList.add('is-selected');

      const removeEles = document.getElementsByClassName('shop-look-slider-buttons-container');
      console.log(document.getElementsByClassName('shop-look-slider-buttons-container'));
      for (let i = 0; i < removeEles.length; i++) {
        const removeEle = removeEles[i];
        const parentEle = removeEle.parentNode;
        parentEle.removeChild(removeEle);
        parentEle.appendChild(removeEle);
      }
    }
    onChangeBackground(e) {
      console.log('e', e);

      // const coverEle = this.getElementsByClassName('shop-look-slider-buttons-bg')[0];
      const currentEle = this.getElementsByClassName('shop-look-slider-buttons_item is-selected')[0];
      // const containerEle = this.getElementsByClassName('shop-look-slider-buttons')[0];
      const buttonsEle = this.getElementsByClassName('shop-look-slider-buttons_item');
      const index = Array.from(buttonsEle).indexOf(currentEle);
      console.log(index);
      // const currentRect = currentEle.getBoundingClientRect();
      // const containerRect = containerEle.getBoundingClientRect();
      // const offSetX = currentRect.left - containerRect.left;
      // coverEle.style.width = currentEle.offsetWidth + 'px';
      // coverEle.style.height = currentEle.offsetHeight + 'px';
      // coverEle.style.position = 'absolute';
      // coverEle.style.top = '25%';
      // coverEle.style.left = '50%';
      // coverEle.style.transform = 'translateX(' + offSetX + 'px)';

      for (let i = 0; i < buttonsEle.length; i++) {
        buttonsEle[i].classList.remove('active');
      }
      currentEle.classList.add('active');

      const hotpotsEle = this.getElementsByClassName('shop-the-look-slider--area');
      for (let i = 0; i < hotpotsEle.length; i++) {
        hotpotsEle[i].classList.remove('is-selected');
      }
      hotpotsEle[index].classList.add('is-selected');
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look-slider', ShopTheLookSlider);
}
