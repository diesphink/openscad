include('common.js')
include('align.js')
include('m3.jscad')

conector110v = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim
  dim.c110v = [20, 10, 13]
  dim.c110v_espacamento = 26

  function c110v() {

    var principal = cube({
      size: dim.c110v,
      center: [1, 1, 0]
    })

    var m3s = m3({espacamento: dim.c110v_espacamento}).buraco.rotateZ(90).rotateX(90)
    m3s = align({
      obj: m3s,
      ref: principal,
      center: [1, 1, 1]
    })


    return principal.union(m3s)
  }

  return c110v
})()

main = function() {
  return conector110v()
}
