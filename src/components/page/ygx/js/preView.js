const PhotoSwipe = require('photoswipe/dist/photoswipe')
const PhotoSwipeUI_Default = require('photoswipe/dist/photoswipe-ui-default')

export function preView () {
  var div = document.createElement("div")
  div.setAttribute('id', 'rootPreview')
  div.innerHTML =
    '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">' +
    '    <div class="pswp__bg"></div>' +
    '    <div class="pswp__scroll-wrap">' +
    '        <div class="pswp__container">' +
    '            <div class="pswp__item"></div>' +
    '            <div class="pswp__item"></div>' +
    '            <div class="pswp__item"></div>' +
    '        </div>' +
    '        <div class="pswp__ui pswp__ui--hidden">' +
    '            <div class="pswp__top-bar">' +
    '                <div class="pswp__counter"></div>' +
    '                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>' +
    '                <button class="pswp__button pswp__button--share" title="Share"></button>' +
    '                <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>' +
    '                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>' +
    '                <div class="pswp__preloader">' +
    '                    <div class="pswp__preloader__icn">' +
    '                      <div class="pswp__preloader__cut">' +
    '                        <div class="pswp__preloader__donut"></div>' +
    '                      </div>' +
    '                    </div>' +
    '                </div>' +
    '            </div>' +
    '            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">\n' +
    '                <div class="pswp__share-tooltip"></div>' +
    '            </div>' +
    '            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">' +
    '            </button>' +
    '            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">' +
    '            </button>' +
    '            <div class="pswp__caption">' +
    '                <div class="pswp__caption__center"></div>' +
    '            </div>' +
    '        </div>' +
    '    </div>' +
    '</div>'
  document.body.appendChild(div)
  var pswpElement = document.querySelectorAll('.pswp')[0]

  var items = [
    {
      src: 'https://placekitten.com/600/400'
    },
    {
      src: 'https://placekitten.com/1200/900'
    }
  ]

  var options = {
    index: 0
  };

// Initializes and opens PhotoSwipe
  var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
  gallery.init();
}
