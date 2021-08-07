// 画图片
export const cutImg = (imgObj) => {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = 200
  canvas.height = 200
  let cutInfo = getImgInfo(imgObj)
  ctx.drawImage(imgObj, cutInfo.startX, cutInfo.startY, cutInfo.endX, cutInfo.endY, 0, 0, 200, 200)
  let dataURL = canvas.toDataURL('image/png')
  return dataURL
}
// 获取图片尺寸
const getImgInfo = (imgObj) => {
  let height = imgObj.height
  let width = imgObj.width
  let position = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  }
  // 是一张长图
  if (width > height) {
    position.startX = (width - height) * 0.5
    position.endX = height
    position.startY = 0
    position.endY = height
    return position
  }
  position.startY = (height - width) * 0.5
  position.endY = width
  position.startX = 0
  position.endX = width
  return position
}
// 转换图片
export const loadingImg = (URL) => {
  let promise = new Promise((resolve, reject) => {
    let _IMG = new Image()
    _IMG.crossOrigin = 'Anonymous'
    let xhr = new XMLHttpRequest()
    xhr.onload = function () {
      let url = window.URL.createObjectURL(this.response)
      _IMG.onload = function () {
        let imgBase64 = cutImg(_IMG)
        resolve(imgBase64)
        window.URL.revokeObjectURL(url)
      }
      _IMG.src = url
    }
    xhr.open('GET', URL, true)
    xhr.responseType = 'blob'
    xhr.send()
  })
  return promise
}
