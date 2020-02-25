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
    }).setColor([0.4, 0.1, 0.1, 0.5])

    var m3s = m3().rotateZ(90).rotateX(90)
    var m3s = m3s.union(m3s.translate([dim.c110v_espacamento, 0, 0]))

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
