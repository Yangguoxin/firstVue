export function a() {
  console.log('33333')
}
export function b() {
  console.log('33333')
}

export function Person () {
  this.a = 1
  this.b = 2
}

Person.prototype.add = function () {
  console.log(this.a + this.b)
}

export default {
  test: 111,
  add: 222
}
// module.exports = {
//   a: a,
//   b: b
// }
