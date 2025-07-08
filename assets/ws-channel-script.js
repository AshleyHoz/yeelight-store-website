if (!window.bhAsyncInit) {
  window.bhAsyncInit = [];
} else if (!Array.isArray(window.bhAsyncInit)) {
  window.bhAsyncInit = [window.bhAsyncInit];
}

window.bhAsyncInit.push(function () {
  window.BH.init({
    debug: false,
    renderImmediately: true,
    widgets: [{id: 'wa.meetbot-widget-wachat-1lfj',type: 'WaChat',style: 'GREEN_CIRCLE_SMALL',right: 35,bottom:100,mobileRight: 30,mobileBottom: 90,waLink: 'https://wa.me/13313084934',guideText: '10% OFF!',sendText: 'I\'d like to inquire about the discount and campaign.',needSendPage: false,guideTextHideTime: 2},
{id: 'wa.meetbot-widget-wachat-1lee',type: 'WaChat',style: 'GREEN_SMALL',right: 20,bottom:30,mobileRight: 20,mobileBottom: 30,waLink: 'https://wa.me/13313084934',guideText: 'Click to chat with us on WhatsApp',sendText: 'I\'d like to inquire about this product',needSendPage: false,guideTextHideTime: null},
{id: 'wa.meetbot-widget-wachat-1lfh',type: 'WaChat',style: 'GREEN_LARGE',right: 20,bottom:30,mobileRight: 20,mobileBottom: 30,waLink: 'https://wa.me/13313084934',guideText: 'Click to chat with us on WhatsApp',sendText: 'I\'d like to inquire about this product',needSendPage: false,guideTextHideTime: null},
{id: 'wa.meetbot-widget-wachat-1lg5',type: 'WaChat',style: 'GREEN_LARGE',right: 20,bottom:30,mobileRight: 20,mobileBottom: 30,waLink: 'https://wa.me/13313084934',guideText: 'Click to chat with us on WhatsApp',sendText: 'I\'d like to inquire about this product',needSendPage: false,guideTextHideTime: null},
{id: 'wa.meetbot-widget-wachat-1lgz',type: 'WaChat',style: 'GREEN_LARGE',right: 20,bottom:30,mobileRight: 20,mobileBottom: 30,waLink: 'https://wa.me/13313084934',guideText: 'Click to chat with us on WhatsApp',sendText: 'I\'d like to inquire about this product',needSendPage: false,guideTextHideTime: null}]
  });
});

(function (d) {
  var js,
    id = 'meetbot-jssdk';
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement('script');
  js.id = id;
  js.defer = true;
  js.src = 'https://static.meetbot.com/sdk/sdk-3.0.2.js';
  d.getElementsByTagName('head')[0].appendChild(js);
})(document);