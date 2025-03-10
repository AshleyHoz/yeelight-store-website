/**
 *  @class
 *  @function ProductSlideShow
 */
if (!customElements.get('product-slideshow')) {
  class ProductSlideShow extends HTMLElement {
    constructor(e) {
      super();
      this.addEventListener('click', this.onChangeBackground);
      const currentEle = this.getElementsByClassName('product-slideshow-buttons-bg')[0];
      const button1 = this.getElementsByClassName('product-slideshow-buttons_item')[0];
      if (!currentEle) return;
      currentEle.style.width = button1.offsetWidth + 'px';
      currentEle.style.height = button1.offsetHeight + 'px';
      button1.classList.add('active');
    }
    // onChangeBackground(e) {
    //   if (
    //     e.target.className === 'product-slideshow-buttons_item-content' ||
    //     e.target.parentNode.className === 'product-slideshow-buttons_item-content'
    //   ) {
    //     const coverEle = this.getElementsByClassName('product-slideshow-buttons-bg')[0];
    //     const currentEle =
    //       e.target.className === 'product-slideshow-buttons_item-content' ? e.target : e.target.parentNode;
    //     const containerEle = this.getElementsByClassName('product-slideshow-buttons')[0];
    //     const buttonsEle = this.getElementsByClassName('product-slideshow-buttons_item');
    //     const buttonItemEle = currentEle.parentNode;
    //     const currentRect = currentEle.getBoundingClientRect();
    //     const containerRect = containerEle.getBoundingClientRect();
    //     const offSetX = currentRect.left - containerRect.left;
    //     coverEle.style.width = currentEle.offsetWidth + 'px';
    //     coverEle.style.height = currentEle.offsetHeight + 'px';
    //     coverEle.style.position = 'absolute';
    //     coverEle.style.top = 0;
    //     coverEle.style.left = 0;
    //     coverEle.style.transform = 'translateX(' + offSetX + 'px)';
    //     for (let i = 0; i < buttonsEle.length; i++) {
    //       buttonsEle[i].classList.remove('active');
    //     }
    //     buttonItemEle.classList.add('active');
    //   }
    // }

    onChangeBackground(e) {
      const coverEle = this.getElementsByClassName('product-slideshow-buttons-bg')[0];
      const currentEle = this.getElementsByClassName('product-slideshow-buttons_item is-selected')[0];
      const containerEle = this.getElementsByClassName('product-slideshow-buttons')[0];
      const buttonsEle = this.getElementsByClassName('product-slideshow-buttons_item');
      const currentRect = currentEle.getBoundingClientRect();
      const containerRect = containerEle.getBoundingClientRect();
      const offSetX = currentRect.left - containerRect.left;
      coverEle.style.width = currentEle.offsetWidth + 'px';
      coverEle.style.height = currentEle.offsetHeight + 'px';
      coverEle.style.position = 'absolute';
      coverEle.style.top = 0;
      coverEle.style.left = 0;
      coverEle.style.transform = 'translateX(' + offSetX + 'px)';
      for (let i = 0; i < buttonsEle.length; i++) {
        buttonsEle[i].classList.remove('active');
      }
      currentEle.classList.add('active');
    }
    connectedCallback() {}
  }
  customElements.define('product-slideshow', ProductSlideShow);
}
