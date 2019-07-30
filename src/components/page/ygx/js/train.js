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
