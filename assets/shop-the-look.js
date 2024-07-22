/**
 *  @class
 *  @function ShopTheLook
 */
import lottie from 'lottie-web';
import loadingJson from '../assets/loading.json';

if (!customElements.get('shop-the-look')) {
  class ShopTheLook extends HTMLElement {
    constructor(e) {
      super();
      console.log(e);
    }
    connectedCallback() {}
  }
  customElements.define('shop-the-look', ShopTheLook);
}
// function loadLottie() {
lottie.loadAnimation({
  container: document.getElementById('animation-container'), // 动画将在这个元素内部显示
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: loadingJson,
});
//   // setTimeout(function () {
//   //   lottie.stop('Loading');
//   // }, 5000);
// }

// document.onreadystatechange = function () {
//   console.log(1, 'lottie loaded');

//   if (document.readyState === 'complete') {
//     loadLottie();
//   }
// };

// window.onload = function () {
//   console.log(2, 'lottie loaded');
//   loadLottie();
// };

LottieInteractivity.create({
  player: '#lottie-loading',
  mode: 'scroll',
  container: '#lottie-animation',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 90],
    },
  ],
});
