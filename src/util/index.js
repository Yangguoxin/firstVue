/**
 * 设置title
 * @param {*} title
 */
export function setMetaTitle (title) {
    document.title = title
    let mobile = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(mobile)) {
        let iframe = document.createElement('iframe')
        iframe.style.visibility = 'hidden'
        iframe.style.display = 'none'
        iframe.setAttribute('src', '//static.blackfish.cn/index.html')
        let iframeCallback = function () {
            setTimeout(function () {
                iframe.removeEventListener('load', iframeCallback)
                document.body.removeChild(iframe)
            }, 0)
        }
        iframe.addEventListener('load', iframeCallback)
        document.body.appendChild(iframe)
    }
}
