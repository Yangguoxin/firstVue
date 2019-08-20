function test1 () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({test: 1111})
      console.log(2222)
    },3000)
  })
}

async function test2 () {
  await test1()
  console.log(11111)
}

function test3 () {
  use 'struct'
  console.log(this.a + this.b)
}

(function test4 () {
  setTimeout(() => {
    console.log('挂起后执行')
  }, 0)
  new Promise((resolve, reject) => {
    console.log('定义promise')
    resolve('执行成功函数')
    reject('执行失败函数')
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  Person()
  for(let i = 0; i < 1000000000; i++) {
    if (i === 0) {
      console.log('循环开始')
    }
  }
  console.log('栈执行')
})()

async function a1 () {
  console.log('a1 start')
  await a2()
  await a2()
  await a2()
  await a2()
  console.log('a1 end')
}
async function a2 () {
  console.log('a2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
    console.log('promise3')
  })
})
console.log('script end')

/*****************类的继承******************/

function Person (a, b) {
  let d = 222
  this.a = a
  this.b = b
  console.log(a + b)
  let add = function () {
    return 111
  }
  this.addMethod = function () {
    console.log(add() + d)
  }
}

Person.prototype.c = 1

function newPerson () {
  Person.call(this, 1, 2)
}

let xiaomi = new newPerson()

console.log(xiaomi.c)

newPerson.prototype = new Person(1, 2)

let xiaomi = new newPerson()

console.log(xiaomi.c)

Function.prototype.test = function () {
  console.log(this)
}
function fun() {

}

let obj = {
  a: 1,
  b: 1,
  test: function f () {
    this.a + this.b
  }
}
let obj = {
  a: 3
}
function test(c, d, f) {
  console.log(c, d, f)
  console.log(this.a)
}
/***************call的实现***********************/
Function.prototype.call2 = function () {
  // 将调用方法本身复制给context对象一个fn属性
  // 相当于将要执行的方法赋值给context，这样fn中的this就指向了context对象
  let context = arguments[0] || window
  let arr = []
  // 遍历获取2-最后一个传参
  for(let i = 1; i < arguments.length; i++) {
    arr.push('arguments[' + i + ']')
  }
  context.fn = this
  // 采用eval来执行字符串脚本
  let result = eval('context.fn('+ arr + ')')
  delete context.fn
  // 如果有返回值，返回执行结果
  return result
}

/*****************apply的实现*******************/
Function.prototype.apply2 = function (context, arr) {
  context = context || window
  context.fn = this
  if (!arr) {
    let result = context.fn()
    delete context.fn
    return result
  }
  // 开始遍历参数
  let arrStr = []
  for (let i = 0; i < arr.length; i++) {
    arrStr.push('arr[' + i + ']')
  }
  let result = eval('context.fn(' + arrStr + ')')
  delete context.fn
  return result
}

/********************使用call和apply来实现类的继承*********************/
function Person (name, age) {
  this.name = name
  this.age = age
  this.outPut = function () {
    console.log(this.name)
    console.log(this.age)
  }
}

/**
 * 相当于在所要继承的对象中去绑定this并执行父类的构造函数
 *
 * */
function Student (name, age) {
  Person.call(this, name, age)
}

function Student (name, age) {
  Person.apply(this, [name, age])
}


/*****************实现new方法*/

function Person (name, age) {
  this.name = name
  this.age = age
  this.outPut = function () {
    console.log(this.name)
    console.log(this.age)
  }
}

Function.prototype.new2 = function () {
  let a = {}
  this.apply(a, arguments)
  return a
}

/********************bind的实现***********************/

function test() {
  console.log(this.a)
}


Function.prototype.bind2 = function () {
  let context = arguments[0] || window
  let outerArgs = arguments
  context.fn = this
  return function () {
    let arr = []
    // 遍历获取2-最后一个传参
    for(let i = 1; i < outerArgs.length; i++) {
      arr.push('outerArgs[' + i + ']')
    }
    // 采用eval来执行字符串脚本
    let result = eval('context.fn('+ arr + ')')
    delete context.fn
    // 如果有返回值，返回执行结果
    return result
  }
}

let a = test.bind2({a: 1})

/********************eval的使用**************************/

function test (a, c) {
  console.log(a)
}
let b = 100
eval('test(b)')

let arr = []
for(let i = 0; i < 10; i++) {
  arr.push('arguments[' + i + ']')
}

console.log(arr.toString())

/******************判断两个对象是否相等*******************/
function Person (name, age) {
  this.name = name
  this.age = age
  this.outPut = function () {
    console.log(this.name)
    console.log(this.age)
  }
}

let xiaoming = new Person('小明', '18')

let xiaoke = new Person('小明', '18')

/****************await和async********************/
async function test() {
  console.log('1111111')
}

async function test2() {
  let a = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('222222222')
      resolve('11111111')
    }, 3000)
  })
  console.log(a)
}

async function test3() {
  console.log('33333333')
}

async function test1 () {
  await test()
  await test2()
  await test3()
}

function test1 () {
  test().then(() => {
    test2().then(() => {
      test3()
    })
  })
}

async function test2() {
  setTimeout(() => {
    console.log('222222222')
  }, 3000)
}

/****************bind********************/
Function.prototype.bind2 = function (context) {
  var self = this
  return function () {
    return self.apply(context)
  }
}

/****************继承**********************/
function Person (name) {
  this.name = name
  this.list = ['a', 'b']
}

Person.prototype.showName = function () {
  console.log(this.name)
}

function Son() {

}

Son.prototype = new Person('小明')

let xiaoming = new Son()
let xiaohong = new Son()


/**********************采用********************/

function Person (name) {
  this.name = name
  this.list = ['a', 'b']
}

Person.prototype.showName = function () {
  console.log(this.name)
}

function Son(name, age) {
  Person.call(this, name)
  this.age = age
}

Son.prototype = new Person()

let xiaoming = new Son('小明')
let xiaohong = new Son('小红')

/*********************闭包********************/
var data = []
for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    return function() {
      console.log(i)
    }
  })(i)
}

/*****************节流函数******************/
function throttle(func, interval = 300) {
  let canRun = false
  return function () {
    if (canRun) {return}
    canRun = true
    setTimeout(() => {
      func.call(this, arguments)
      canRun = false
    }, interval)
  }
}

/***************方式二，不使用时间函数*************/

function throttle(func, interval = 300) {
  let timeNow = new Date().valueOf()
  let timeRun = new Date().valueOf()
  return function () {
    timeNow = new Date().valueOf()
    console.log(timeRun)
    if (timeNow - timeRun >= interval) {
      func.call(this, arguments)
      timeRun = timeNow
    }
  }
}

setInterval(throttle(function () {
  console.log('22222')
},1000),30)

/****************对象******************/
function Person () {
  this.a = 1
  this.b = 2
  this.c = 3
}

let xiaomi = new Person()

/***********************继承**************/
function Person () {
  this.a = {
    list: [1, 1, 1]
  }
}
Person.prototype.b = [1, 2, 3]

let xiaomi = new Person('xiaomi')
let xiaohong = new Person('xiaohong')

function Son () {

}

/************************手写call、apply、bind、new**************************/
let a = {
  name: '123',
  number: '456'
}

/*************call和apply的用法********************/
function test (fn) {
  return function () {
    let a = [...arguments]
    fn(a)
  }
}

function test1 (a, b, c) {
  console.log(a+b+c)
}

/************new实现***************/
function yNew (func) {
  let res = {}
  res.__proto__ = func.prototype
  let ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
  if (typeof ret === 'object' || typeof ret === 'function') {
    return ret
  }
  return res
}
/************bind实现**************/
Function.prototype.bind2 = function(obj) {
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  let _this = this
  let args = [...arguments].slice(1)
  let resFn = function () {
    return _this.apply(this instanceof resFn ? this: obj,args.concat(...arguments))
  }
  return resFn
}
/***********call实现************/
Function.prototype.call2 = function (obj=window) {
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = opj.fn(...args)
  delete obj.fn
  return res
}
/***********apply实现***********/
Function.prototype.apply2 = function (obj=window, arr) {
  obj.fn = this
  let res = null
  if (arr) {
    res = obj.fn(...arr)
  } else {
    res = obj.fn()
  }
  delete obj.fn
  return res
}
/**********深度拷贝采用递归算法*************/
/**********深度拷贝**************/
function deepCopy (obj) {
  let res = null
  if (typeof obj === 'object') {
    let res = obj.constructor === Array ? [] : {}
    for(let key in obj) {
      res[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  } else {
    res = obj
  }
  return res
}
/*****************call实现****************/
Function.prototype.call = function (obj = window) {
  obj.fn = this
  let args = [...arguments].slice(1)
  let result = obj.fn(...args)
  delete obj.fn
  return result
}
/****************apply实现*****************/
Function.prototype.apply2 = function (obj = window, arr) {
  obj.fn = this
  let res = null
  if (!arr) {
    res = obj.fn()
  } else {
    res = obj.fn(...arr)
  }
  delete obj.fn
  return res
}
/*******************bind实现*********************/
Function.prototype.bind2 = function (obj) {
  if (typeof this !== 'function') {
    throw Error('not a function')
  }
  let fn = this
  let args = [].slice.call(arguments, 1)
  let reFun = function () {
    return fn.apply(this instanceof reFun ? this : obj, args.concat(...arguments))
  }
  return reFun
}
/********************new实现********************/
function newF (context) {
  let obj = {}
  obj.__proto__ = context.prototype
  let args = [...arguments].slice(1)
  let res = context.apply(obj, args)
  if (typeof res === 'object') {
    return res
  }
  return obj
}
/*******************使arguments变为真实数组的几种方法**************/
function tranArgs () {
  let res = [...arguments].slice(1)
  let res1 = [].slice.apply(arguments, [1])
  let res2 = [].slice.call(arguments, 1)
  let res3 = Array.prototype.slice.call(arguments, 1)
  let res4 = Array.prototype.slice.apply(arguments, [1])
  console.log(res, res1, res2, res3, res4)
}
/******************实现深度拷贝*****************/
function deepCopy (obj) {
  if (typeof obj === 'object') {
    let res = obj.constructor === Array ? [] : {}
    for(let key in obj) {
      res[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
    return res
  }else {
    return obj
  }
}
/****************ajax请求*********************/
/**
 * 是采用XMLHttpRequest来完成如下过程
 * 1.打开一个连接
 * 2.添加请求头部
 * 3.发送数据
 * 分为post请求
 * 分为get请求
 *
 * */
function myAjax (opt) {
  opt = opt || {}
  opt.url = opt.url || ''
  opt.method = opt.method.toUpperCase() || 'POST'
  opt.async = opt.async || true
  opt.data = opt.data || null
  opt.success = opt.success || function () {}
  opt.fail = opt.fail || function () {}
  opt.complete = opt.complete || function () {}
  let xmlHttp = null
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  let params = []
  for (let key in opt.data) {
    params.push(key + '=' + opt.data[key])
  }
  let postData = params.join('&')
  if (opt.method === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async)
    xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8')
    xmlHttp.send(postData)
  } else if (opt.method === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async)
    xmlHttp.close()
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      opt.success(xmlHttp.responseText)
    }else {
      opt.fail(xmlHttp.responseText)
    }
  }
}
/*****************获取url的参数********************/
function getQueryUrl () {
  let firstArray = decodeURIComponent(window.location.href).split('?')
  let secondArray = firstArray[1] ? firstArray[1].split('&') : []
  let queryObj = {}
  secondArray.forEach((item, index) => {
    let thirdArray = item.split('=')
    queryObj[thirdArray[0]] = thirdArray[1]
  })
  return queryObj
}
/*******************深拷贝********************/
function deepCopy (obj) {
  if (typeof obj === 'object') {
    let res = obj.constructor === Array ? [] : {}
    for(let key in obj) {
      res[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
    return res
  } else {
    return obj
  }
}
/****************事件循环**************/
async function test () {
  console.log('1234')
  await test1()
  await test2()
  await test3()
  console.log('end')
}
async function test1 () {
  console.log('111111')
}
async function test2 () {
  console.log('222222')
}
async function test3 () {
  console.log('333333')
}
function test () {
  return new Promise((resolve) => {
    console.log('1234')
    test1().then(() => {
      test2().then(() => {
        test3().then(() => {
          console.log('end')
        })
      })
    })
  })
}
/***********bind**************/
Function.prototype.bind2 = function (obj) {
  let fn = this
  let args = [].slice.call(arguments, 1)
  let reFun = function () {
    return this.apply(this instanceof reFun ? this : obj,args.concat([...arguments]))
  }
  return reFun
}
/**************sum(1)(2)(3)()******************/
function sum () {
  let args = [].slice.call(arguments)
  if (arguments.length === 0) {
    return 0
  }
  let fn = function () {
    if (arguments.length === 0) {
      let sum = 0
      args.forEach((item) => {
        sum += item
      })
      return sum
    }
    args = args.concat([].slice.call(arguments))
    return fn
  }
  return fn
}
/***************bind******************/
Function.prototype.bind2 = function (obj) {
  let fn = this
  let args = [].slice.call(arguments, 1)
  let rfn = function () {
    return fn.apply(this instanceof rfn ? this : obj, args.concat(...arguments))
  }
  return rfn
}
/****************代理proxy的用法*************/
var proxy = new Proxy({}, {
  get: function () {
    return 100
  }
})
/***************实现封装ajax*****************/
function myAjax (option) {
  option = option || {}
  option.url = option.url || ''
  option.methods = option.methods || 'POST'
  option.params = option.params || {}
  option.async = option.async || 'true'
  option.success = option.success || function () {}
  let xmlHttp = null
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  let params = null
  for (let key in option.params) {
    params.push(key + '=' + option.params[key])
  }
  let postData = params.join('&')
  if (option.methods.toUpperCase() === 'POST') {
    xmlHttp.open(option.methods, option.url, option.async)
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    xmlHttp.send(postData)
  } else if (option.methods.toUpperCase() === 'GET') {
    xmlHttp.open(option.methods, option.url + '?' + postData, option.async)
    xmlHttp.send(null)
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      option.success(xmlHttp.responseText)
    }
  }
}

/******************队列执行结构**********************/
function Queue () {
  this.queueList = []
}

Queue.prototype.push = function (taskFn) {
  if (typeof taskFn !== 'Function') {
    throw error('请输入')
  }
  this.queueList.push(taskFn)
}

Queue.prototype.run = function () {
  forEach
}

/*****************去除字符串重复的字符，解析字符串*******************/
function  queryStr(str) {
  if (typeof str !== 'string') {
    throw '输入的不是字符串'
  }
  let arr = str.split('')
  let obj = {}
  arr.forEach((item) => {
    if (obj[item]) {
      obj[item] ++
      return
    }
    obj[item] = 1
  })
  let strTmp = ''
  for (let key in obj) {
    strTmp += key
  }
  return obj
}

/*******************call手写实现**********************/
Function.prototype.myCall = function (obj) {
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = obj.fn(...args)
  delete obj.fn
  if (res) {
    return res
  }
}
/********************New的手写实现********************/
function myNew (fn) {
  let obj = {}
  obj.prototype = fn.prototype
  let args = [].slice.call(arguments, 1)
  let res = fn.apply({}, args)
  if (res) {
    return res
  }
  return obj
}

/***************bind的手写实现***********************/
Function.prototype.myBind = function (obj) {
  let fn = this
  let args = [].slice.call(arguments, 1)
  let refn = function () {
    return fn.apply(this instanceof refn ? this : obj, args.concat([...arguments]))
  }
  return refn
}

/*****************深度拷贝********************/
function deepCopy (obj) {
  if (typeof obj === 'object') {
    let value = (obj.constructor === Array ? [] : {})
    for (let key in obj) {
      value[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
    return value
  } else {
    return obj
  }
}
/****************正则比较******************/
let str = 'aaaaaaaaaaaa'
str.replace(/a+/g, 'b')

/****************await和async相关，event loop******************/
async function a1 () {
  console.log('a1 start')
  await a2()
  await a2()
  await a2()
  await a2()
  console.log('a1 end')
}
async function a2 () {
  console.log('a2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise1')
})

a1()
let Animation = requestAnimationFrame(() => {
  console.log('Animation')
})

let promise2 = new Promise((resolve) => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then((res) => {
  console.log(res)
  Promise.resolve().then(() => {
    console.log('promise3')
    Promise.resolve().then(() => {
      console.log('promise4')
    })
  })
})
console.log('script end')

/*****************************节流和防抖************************/
function jieliu (fn, interval = 300) {
  let canRun = true
  return function () {
    if (!canRun) {
      return
    }
    canRun = false
    setTimeout(() => {
      fn.apply()
      canRun = true
    }, interval)
  }
}

function jieliu (fn, interval = 300) {
  let startTime = new Date().valueOf()
  let runTime = new Date().valueOf()
  return function () {
    runTime = new Date().valueOf()
    if (runTime - startTime >= interval) {
      fn.apply()
      startTime = runTime
    }
  }
}
window.addEventListener('scroll', jieliu(() => {
  console.log('11111111')
}, 300))
/**************************防抖*********************/
function fanDou (fn, interval = 300) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply()
    }, interval)
  }
}
window.addEventListener('scroll', fanDou(() => {
  console.log('11111111')
}, 300))

/********************call手写实现******************/
Function.prototype.myCall = function (obj) {
  obj = obj || window
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = obj.fn(...args)
  delete obj.fn
  return res
}
/***********************apply手写实现******************/
Function.prototype.myApplay = function (obj, arr) {
  obj = obj || window
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = obj.fn(...args)
  delete obj.fn
  return res
}
/**********************bind手写实现*********************/
Function.prototype.myBind = function (obj) {
  let args = [].slice.apply(arguments, [1])
  let fn = this
  let refn = function () {
    return fn.apply(this instanceof refn ? this : obj, args.concat([...arguments]))
  }
  return refn
}
/*********************new手写实现***********************/
function myNew (fn) {
  let obj = {}
  let args = Array.prototype.slice.call(arguments, 1)
  obj.__proto__ = fn.prototype
  fn.apply(obj, args)
  return obj
}
/*********************js中的对象相关**********************/
function Person () {
  this.name = 'yy'
  this.age = '18'
}
Person.prototype = {}
Person.prototype.add = function () {
  console.log(1 + 1)
}

let xiaoming = new Person()

xiaoming.__proto__ === Person.prototype

class Person {
  constructor () {
    this.name = 'yy'
    this.age = '18'
    this.add = function () {
      console.log(1 + 1)
    }
  }

  print () {
    console.log('xiaoming')
  }

}

/***************************ajax**********************/
function myAjax (opt) {
  opt = opt || {}
  opt.url = opt.url || ''
  opt.method = opt.method.toUpperCase() || 'POST'
  opt.params = opt.params || {}
  opt.async = opt.async || 'true'
  opt.success = opt.success || function() {}
  let xmlHttp = null
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest()
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  let params = []
  for(let key in opt.params) {
    params.push(key + '=' + opt.params[key])
  }
  let postData = params.join('&')
  if (opt.method === 'POST') {
    xmlHttp.open(opt.method, opt.url, opt.async)
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-from-urlencoded;charset=utf-8')
    xmlHttp.send(postData)
  } else if (opt.method === 'GET') {
    xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async)
    xmlHttp.send(null)
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      opt.success(xmlHttp.responseText)
    }
  }
}
/***************************JSON***************************/
function foo () {
  for (var i = 0; i < 5; i++) {
    setTimeout(((i) => {
      return function () {
        console.log(i)
      }
    })(i), 1000 * i)
  }
}
let xmlHttp = new X

/***********************FOR循环******************************/
let list = ['a', 'b', 'c', 'd', 'e']
for(var i = 0, b;b=list[i++];) {
  console.log(i)
  console.log(b)
}
for (var i = 0;list[i++];) {
  console.log(i)
}

/**************************观察者模式***********************/
function Publisher (name) {
  this.name = name
  this.bookerList = []
}
Publisher.prototype.bookHandle = function (key, fn) {
  if (!this.bookerList[key]) {
    this.bookerList[key] = []
  }
  this.bookerList[key].push(fn)
}

Publisher.prototype.messageHandle = function () {

  let res = {
    name: 1234
  }
  this.bookerList.forEach((item) => {
    item.call(this, res)
  })
}

/************************call2***************************/
Function.prototype.call2 = function (obj) {
  obj = window || obj
  obj.fn = this
  let args = [...arguments].slice(1)
  let res = obj.fn(...args)
  delete obj.fn
  if (res) {
    return res
  }
}
/***********************bind*************************/
Function.prototype.myBind = function (obj) {
  let fn = this
  let args = [].slice.call(arguments, 1)
  let refn = function () {
    fn.apply(this instanceof refn? this : obj, args.concat([...arguments]))
  }
  return refn
}


/***********************链式结构********************/
async function promise1 () {
  let a = 'promise1'
  return a
}

async function promise2 () {
  let a = 'promise2'
  return a
}

function test () {
  let res1 = promise2()
  let res2 = promise1()
  console.log(res1)
  console.log(res2)
}

/*********************发布订阅模式******************/

function Publisher (name = '无名报社') {
  this.list = []
  this.name = name
}

Publisher.prototype.bookHandle = function (fn) {
  this.list.push(fn)
}

Publisher.prototype.printHandle = function () {
  let res = {
    name: this.name,
    msg: 'go'
  }
  this.list.forEach((item) => {
    item.apply(this, [res])
  })
}

let publish1 = new Publisher('新华日报')
let publish2 = new Publisher('今日头条')

publish1.bookHandle(function (res) {
  console.log('小明订阅了', res.name, '报社给他说', res.go)
})

publish1.bookHandle(function (res) {
  console.log('国鑫订阅了', res.name, '报社给他说', res.go)
})

publish2.bookHandle(function (res) {
  console.log('小明订阅了', res.name, '报社给他说', res.go)
})

publish2.bookHandle(function (res) {
  console.log('国鑫订阅了', res.name, '报社给他说', res.go)
})

/*****************test****************/
function Publisher (name = '无名报社') {
  this.name = name
}

Publisher.prototype.printHandle = function () {
  let res = {
    name: this.name,
    msg: 'go'
  }
  console.log(res)
}

/***************实现一个异步回调*************/
function syncFn (fn) {
  this.a = 2222
  setTimeout(fn.bind({a: 3333}, arguments))
}
syncFn(function () {
  console.log(this.a)
})
console.log('begin')

/**************实现call***************/
Function.prototype.myCall = function (obj) {
  obj.fn = this
  var args = [...arguments].slice(1)
  var res = obj.fn(...args)
  delete obj.fn
  if (res) {
    return res
  }
}

function test (a, b, c) {
  console.log(this.ccc)
  console.log(a, b, c)
}

/**********闭包**************sum(1)(2)(3)()*/
function closer () {
  let args = [].slice.apply(arguments)
  if (args.length <= 0) {
    return 0
  }
  let fn = function () {
    let subArgs = [].slice.apply(arguments)
    let res = 0
    if (subArgs.length <= 0) {
      args.forEach((item) => {
        res += item
      })
      return res
    }
    args = args.concat(subArgs)
    return fn
  }
  return fn
}

/*********************判断数据是函数还是对象************************/
let test = function () {
  console.log('12232131')
}
let arr = []
let obj = {}
typeof arr
arr.toString()
obj.toString()

/*************深拷贝******************/
function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let tmp = obj.toString() === '[object Object]' ? {} : []
  for(let key in obj) {
    tmp[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
  }
  return tmp
}
/*******************深拷贝********************/
function deepCopy (obj) {
  if (typeof obj === 'object') {
    let tmp = obj.toString() === '[object Object]' ? {} : []
    for(let key in obj) {
      tmp[key] = typeof obj[key] === 'string' ? obj[key] : deepCopy(obj[key])
    }
    return tmp
  } else {
    return obj
  }
}
let url = `${MOD_ORDER_URL}/product/productDetail?productId=${productId}&bf_ai=${bf_ai}&hideNavigation=1&__bf_params=${encodeURIComponent(JSON.stringify({
  token: 'aaaaaaaaaaaaa',
  phoneNumber: 'bbbbbbbbbbbbb'
}))}`
/******************************************/
function test () {
  if ([]==false) {console.log('1111')}
  if ({}==false) {console.log('2222')}
  if ([]) {console.log('3333')}
  if ([1]==[2]) {console.log('4444')}
  [].slice.call(arguments, 0)
  [].slice.apply(arguments, [0])
  Array.slice.call(arguments, 0)
  Array.from(arguments)
  [...arguments]
}
if(JSON.stringify([1]) === JSON.stringify([1])){console.log(111111)}

/************************************arguments*********************/
function a () {
  for (var i = 0; i < 5; i++) {
    this.i = i
    setTimeout((function () {
      console.log(this.i)
    }).bind({i: i}), 0)
    console.log(this.i)
  }
}
/***********************前端路由测试**************************/
function urlHistry () {
  console.log(window.location.href)
  window.location.href = '../'
}

/******************对象中的函数执行和函数定义*******************/
function callback(res) {
  console.log('回调函数执行')
}
let name = `id_${(new Date()).getTime()}_${Math.random().toString().substr(2)}`
window[name] = function (res) {
  // 执行这个函数后，要销毁这个函数
  window[name] = undefined
  // 执行传入的的函数
  callback && typeof callback === 'function' && callback(res)
}

/*******************apply使用********************/
function test () {
  console.log(this.a)
  console.log([...arguments])
}

function fun () {
  test.Myapply({a:1}, arguments)
}

/*****************apply实现********************/
Function.prototype.Myapply = function (obj, arr) {
  obj = obj || window
  obj.fn = this
  let res
  if ([...arr].length < 0) {
    res = obj.fn()
  } else {
    res = obj.fn(...arr)
  }
  delete obj.fn
  return res
}

/***********实现深拷贝***************/
function deepCopy (obj) {
  if (typeof obj !== 'object') {
    return obj
  }
  let tmpObj = obj.toString() === '[object Object]' ? {} : []
  for (let key in obj) {
    tmpObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
  }
  return tmpObj
}

/********函数工厂********/
function Mynew () {
  let obj = new Object()
  let fn = [].shift.call(arguments)
  obj.__proto__ = fn.prototype
  let res = fn.apply(obj, arguments)
  return typeof res === 'object' ? res : obj
}

/*******bind*********/
Function.prototype.Mybind = function () {
  let fn = this
  let obj = [].shift.call(arguments)
  let args = [...arguments]
  let ret = function () {
    fn.apply(this instanceof ret ? this : obj, args.concat([...arguments]) )
  }
  return ret
}

let a = {
  name: 'xiaxia',
  fun: function () {
    console.log(this.name)
  }
}

/**************对象原型和原型链****************/
function Person () {
  this.a = '123'
  this.b = '234'
}
Person.prototype.age = 123
Person.prototype.fun = function () {
  console.log(this.a, this.b, this.age)
}

let xiaomin = new Person()

function Son () {
  this.eye = 222
  Person.apply(this, arguments)
}

Son.prototype = new Person()

let xiaoxiao = new Son()

/***************new实现*****************/
function myNew () {
  let fn = [].shift.call(arguments)
  let obj = new Object()
  obj.__proto__ = fn.prototype
  let ret = fn.apply(obj, arguments)
  return typeof ret === 'object' ? ret : obj
}

function a () {
  for (var i = 0; i < 5; i++) {
    this.i = i
    setTimeout((function () {
      console.log(this.i)
    }).bind({i: i}), 0)
    console.log(this.i)
  }
}

/***********************单例模式实现***************************/
var bindEvent = (function(){
  function() {
    document.body.addEventListener('click', function (e) {
      console.log('1234')
    }, false)
  }
})()
var render = function(){
    console.log( '开始渲染列表' )
    bindEvent()
}
render()

function singleFun (fn) {
  var result = null
  return function () {
    if (result) {
      return
    }
    result = fn.apply(this, arguments)
  }
}


/**********************表单检验*************************/
/*****算法类******/
var calculate = {
  add: function (value, msg) {
    if (value === 1) {
      return msg
    }
  },
  name: function (value, name, msg) {
    if (value < 10) {
      return msg
    }
  }
}

function Valuate () {
  this.cache = []
}

Valuate.prototype.add = function ( dom, value, msg) {
  this.cache.push(function () {
    let runNameArray = name.split(':')
    let runName = runNameArray.shift()
    runNameArray.unshift(value)
    runNameArray.push(msg)
    return calculate[runName].apply(dom, runNameArray)
  })
}

/*****************************缓存代理*************************/
var cachePorxy = (function () {
  let cache = []
  return function () {
    let args = Array.prototype.join.call(arguments, ',')
    if (cache[args]) {
      return cache[args]
    }
    return cache[args] = multFun.apply(this, arguments)
  }
})()

function multFun () {
  let res = 1
  for (var i = 1, value = arguments.length;i < value; i++) {
    res = arguments[i] * res
  }
  return res
}

/**********************发布订阅模式***********************/

var event = {
  eventList: [],
  listen: function (key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  },
  run: function () {
    let key = Array.prototype.shift.call(arguments)
    if (!this.eventList[key]) {
      return
    }
    for (var i = 0, value; value = this.eventList[key][i++];) {
      value.apply(this, arguments)
    }
  },
  remove: function (key, fn) {
    let fns = this.eventList[key]
    if (!fns) {
      return
    }
    if (!key) {
      this.eventList && (this.eventList.length = 0)
      return
    }
    for (var i = 0,l = fns.length; i < l-1; i++) {
      if (fn === fns[i]) {
        fns.splice(i, 1)
      }
    }
  }
}

event.listen('tab', function (res) {
  console.log(res)
})

event.run('tab', 123)

/********************正则表达转换*********************/
var event = (function () {
  let eventList = []
  let listen = function (key, fn) {
    if (!event.eventList[key]) {
      event.eventList[key] = []
    }
    event.eventList[key].push(fn)
  }
  let runEvent = function () {
    let key = Array.prototype.shift.apply(arguments)
    if (!event.eventList[key]) {
      return
    }
    for (var i = 0, value; value = event.eventList[key][i++];) {
      value.apply(this, arguments)
    }
  }
  let remove = function (key, fn) {
    if (!event.eventList[key]) {
      return
    }
    if (!fn) {
      event.eventList[key].length = 0
    }
    for (var i = 0, value; value = event.eventList[key][i++];) {
      if (value === fn) {
        event.eventList[key].splice(i, 1)
      }
    }
  }
  return {
    listen: listen,
    runEvent: runEvent,
    remove: remove
  }
})()

/*******************coffee OR tea********************/
var Beverage = function () {

}
Beverage.prototype.boilWater = function () {
  console.log('必须重写boilWater方法')
}
Beverage.prototype.braw = function () {
  console.log('必须重写braw方法')
}
Beverage.prototype.pourInCup = function () {
  console.log('必须重写pourInCup方法')
}
Beverage.prototype.addCondiments = function () {
  console.log('必须重写addCondiments方法')
}
Beverage.prototype.do = function () {
  this.boilWater()
  this.braw()
  this.pourInCup()
  this.addCondiments()
}

function Coffee () {
}
Coffee.prototype = new Beverage()

Coffee.prototype.boilWater = function () {
  console.log('煮沸水')
}

Coffee.prototype.braw = function () {
  console.log('放入咖啡')
}

Coffee.prototype.pourInCup = function () {
  console.log('开水倒入杯中')
}

Coffee.prototype.addCondiments = function () {
  console.log('加入牛奶和方糖')
}

/***************职责链模式*****************/
function fun1 (a) {
  console.log('进入我是函数1')
  if (a > 10 && a <= 20) {
    console.log('我是函数1，我处理了', a)
    return a
  }
  console.log('我是函数1，我处理不了', a)
  this.next(a)
}

function fun2 (a) {
  console.log('进入我是函数2')
  if (a > 20 && a <= 30) {
    console.log('我是函数2，我处理了', a)
    return a
  }
  setTimeout(() => {
    this.next(a)
  }, 2000)
  console.log('我是函数2，我处理不了', a)
}

function fun3 (a) {
  console.log('进入我是函数3')
  if (a > 30 && a < 40) {
    console.log('我是函数3，我处理了', a)
    return a
  }
  console.log('我是函数3，我处理不了', a)
}

function Chain (fn) {
  this.fn = fn
  this.successFun = null
}

Chain.prototype.passRequest = function () {
  let ret = this.fn.apply(this, arguments)
  return ret
}

Chain.prototype.setNextSuccessor = function (nextFun) {
  return this.successFun = nextFun
}

Chain.prototype.next = function () {
  return this.successFun && this.successFun.passRequest.apply(this.successFun, arguments)
}

let testChain1 = new Chain(fun1)

let testChain2 = new Chain(fun2)

let testChain3 = new Chain(fun3)

testChain1.setNextSuccessor(testChain2).setNextSuccessor(testChain3)

/**********************泡泡堂************************/
function Player (name, teamName) {
  this.name = name
  this.teamName = teamName
  this.status = 'alive'
}

Player.prototype.win = function () {
  console.log(this.name, 'win')
}

Player.prototype.lose = function () {
  console.log(this.name, 'lose')
}

Player.prototype.die = function () {
  this.status = 'dead'
  playerDirector.reciveMessage('playerDead', this)
}

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this)
}

Player.prototype.changeTeam = function (newName) {
  playerDirector.reciveMessage('changeTeam', this, newName)
}

function playerFactory (name, teamName) {
  var newPlayer = new Player(name, teamName)
  playerDirector.reciveMessage('addPlayer', newPlayer)
  return newPlayer
}

var playerDirector = (function () {
  var players = {}
  var operations = {}
  operations.addPlayer = function (player) {
    var teamName = player.teamName
    players[teamName] = players[teamName] || []
    players[teamName].push(player)
  }
  operations.removePlayer = function (player) {
    var teamName = player.teamName
    players[teamName] = players[teamName] || []
    for (var i = 0; i < players[teamName].length; i++) {
      if (players[teamName][i] === player) {
        players[teamName].splice(i, 1)
      }
    }
  }
  operations.changeTeam = function (player, newName) {
    operations.removePlayer(player)
    player.teamName = newName
    operations.addPlayer(player)
  }
  operations.playerDead = function (player) {
    var teamName = player.teamName
    var teamPlayers = players[teamName]
    var allDead = true
    player.status = 'dead'
    for (let i = 0; i < teamPlayers.length; i++) {
      if (teamPlayers[i].status !== 'dead') {
        allDead = false
        break
      }
    }
    if (allDead) {
      for (let i = 0; i < teamPlayers.length; i++) {
        teamPlayers[i].lose.apply(teamPlayers[i], arguments)
      }
      for (let i in players) {
        for (let j = 0; j < players[i].length; j++) {
          if (i !== teamName) {
            players[i][j].win.apply(players[i][j], arguments)
          }
        }
      }
    }
  }

  var reciveMessage = function () {
    let key = Array.prototype.shift.apply(arguments)
    operations[key].apply(this, arguments)
  }

  return {
    reciveMessage: reciveMessage
  }
})()

var player1 = playerFactory('小明', 'red'),
  player2 = playerFactory('小华', 'red'),
  player3 = playerFactory('小蓝', 'blue'),
  player4 = playerFactory('小松', 'blue')

/**********************状态机模式*************************/
/******先定义状态类********/

function offStatus (light) {
  this.light = light
}

offStatus.prototype.buttonPress = function () {
  console.log('关灯状态')
  this.light.setStatus(this.light.weakStatus)
}

function weakStatus (light) {
  this.light = light
}
weakStatus.prototype.buttonPress = function () {
  console.log('弱光状态')
  this.light.setStatus(this.light.strongStatus)
}

function strongStatus (light) {
  this.light = light
}
strongStatus.prototype.buttonPress = function () {
  console.log('强光状态')
  this.light.setStatus(this.light.superStatus)
}
function superStatus (light) {
  this.light = light
}
superStatus.prototype.buttonPress = function () {
  console.log('超级强光')
  this.light.setStatus(this.light.offStatus)
}

function Light () {
}

Light.prototype.setStatus = function (status) {
  this.currentStatus = status
}

Light.prototype.init = function () {
  this.offStatus = new offStatus(this)
  this.weakStatus = new weakStatus(this)
  this.strongStatus = new strongStatus(this)
  this.superStatus = new superStatus(this)
  this.currentStatus = this.offStatus
}

Light.prototype.run = function () {
  this.currentStatus.buttonPress()
}

/********************************正则************************************/

let reg = new RegExp('(,\\s)', 'g')
let str = '  apple, orange, cherry, peach.  '
let count = 0
reg.test(str)
str.match(reg)
str = str.replace(reg, function () {
  count++
  return count === 2 ? '8' : ','
})
let str = '  apple, orange, cherry, peach.  '
str = str.replace(/(^\s+)|(\s+$)/, '')

let str = '  apple, orange, cherry, peach.  '
let count = 0
str.match(/(,\s)/g)
str = str.replace(/(,\s)/g, function () {
  count++
  return count === 2 ? '8' : ','
})

/******************正则对象的定义方式**********************/
let str = ' abcd, sss, 333, 444  '
str = str.replace(/(^\s{1,})|(\s{1,}$)/g, '')

let str = ' abcd, sss, 333, 444  '
let reg = new RegExp('(^\\s+)|(\\s+$)', 'g')
str = str.replace(reg, '')

let str = ' abcd, sss, 333, 444 '
let reg = /(^\s+)|(\s+$)/g
let reg1 = /(,\s)/g
let count = 0
let matches = str.matchAll(reg1)
for (let item of matches) {
  console.log(item)
}

console.log(matches)
str = str.replace(reg, '').replace(reg1, function () {
  count++
  if (count >= 2) {
    return '.'
  }
  return '||'
})

/****************yield*******************/
function* ta() {
  yield 1;
  yield 2;
  yield 3;
}

for (let item of ta()) {
  console.log(item)
}
