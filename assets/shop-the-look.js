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

LottieInteractivity.create({
  player: '#lottie-loading',
  mode: 'scroll',
  container: '#lottie-container',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 90],
    },
  ],
});
