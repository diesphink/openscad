include('align.js')

main = function() {

  align.init()

  var b = new cube({size: [1, 1, 1], center: [true, true, true]}).setColor([1, 0, 0])
  var c = new cube({size: [2, 2, 2], center: [true, true, true]}).align(b, {beginToEnd: [0, 0, 1]})
  return c.union(b)
}
 
