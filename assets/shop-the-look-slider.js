/**
 *  @class
 *  @function ShopTheLookSlider
 */
if (!customElements.get('shop-the-look-slider')) {
  class ShopTheLookSlider extends HTMLElement {
    constructor(e) {
      super();
      this.addEventListener('click', this.onChangeBackground);
      const coverEle = this.getElementsByClassName('shop-look-buttons-bg')[0];
      const button1 = this.getElementsByClassName('shop-look-buttons_item')[0];
      if (!coverEle) return;
      coverEle.style.width = button1.offsetWidth + 'px';
      coverEle.style.height = button1.offsetHeight * 0.5 + 'px';
      button1.classList.add('active');
    }
    onChangeBackground(e) {
      const coverEle = this.getElementsByClassName('shop-look-buttons-bg')[0];
      const currentEle = this.getElementsByClassName('shop-look-buttons_item is-selected')[0];
      const containerEle = this.getElementsByClassName('shop-look-buttons')[0];
      const buttonsEle = this.getElementsByClassName('shop-look-buttons_item');
      const currentRect = currentEle.getBoundingClientRect();
      const containerRect = containerEle.getBoundingClientRect();
      const offSetX = currentRect.left - containerRect.left;
      coverEle.style.width = currentEle.offsetWidth + 'px';
      coverEle.style.height = currentEle.offsetHeight + 'px';
      coverEle.style.position = 'absolute';
      coverEle.style.top = '25%';
      coverEle.style.left = '50%';
      coverEle.style.transform = 'translateX(' + offSetX + 'px)';
      for (let i = 0; i < buttonsEle.length; i++) {
        buttonsEle[i].classList.remove('active');
      }
      currentEle.classList.add('active');
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look-slider', ShopTheLookSlider);
}
