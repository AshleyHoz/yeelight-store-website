window.addEventListener('load', () => {
  document.addEventListener('shopify:section:load', function (event) {
    const section = event.target;

    if (typeof CartDrawer !== 'undefined') {
      new CartDrawer();
    }
    if (
      section.classList.contains('yee-product') ||
      section.classList.contains('yee-collection-tabs') ||
      section.classList.contains('yee-image-with-text-slideshow') ||
      section.classList.contains('yee-media-with-tabs') ||
      section.classList.contains('yee-customer-reviews') ||
      section.classList.contains('yee-testimonials')
    ) {
      window.dispatchEvent(new Event('resize'));
    }

    if (section.classList.contains('yee-slideshow')) {
      window.dispatchEvent(new Event('resize'));
    }

    let looxReviewsFrame = document.getElementById('looxReviewsFrame');

    looxReviewsFrame.body.getElementById('write').color = '#ffffff';
    looxReviewsFrame.body.getElementByTagName('path').stroke = '#ffffff';
    // This would turn the iframe blue.
  });
});
