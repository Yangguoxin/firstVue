export default function (opt = {}) {
  opt = opt || {}
  opt.url = opt.url || ''
  opt.method = (opt.method).toUpperCase() || 'POST'
  opt.data = opt.data || {}
  opt.sync = opt.sync || false
  opt.success = opt.success || function () {}
  opt.failed = opt.failed || function () {}
  let xmlHttp = null
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  let postData = []
  for(let key in opt.data) {
    postData.push(key + '=' + opt.data[key])
  }
  let postDataStr = postData.join('&')
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      opt.success(xmlHttp.responseText)
    }else {
      opt.failed(xmlHttp.responseText)
    }
  }
  if (opt.method === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async)
    xmlHttp.setRequestHeader('Content-type', 'application/json')
    xmlHttp.send(JSON.stringify(opt.data))
  } else {
    xmlHttp.open(opt.method, opt.url + '?' + postDataStr, opt.async)
    xmlHttp.close()
  }
}
