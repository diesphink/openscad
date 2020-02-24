include('common.js')
include('align.js')
include('m3.jscad')

conector_branco = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim
  dim.conector = [17, 12, 12]
  dim.parafuso = {r: 1.5, h: 12}
  dim.porca = [6, 6, 2.5]
  dim.base = [17, 12, 8]

  function conector(grossura_parede) {

    var buraco_parede = cube({
      size: dim.conector,
      center: [1, 1, 0]
    })

    var buraco_porca = align({
      obj: cube({size: [dim.porca[x], dim.porca[y] + grossura_parede, dim.porca[z]]}),
      ref: buraco_parede,
      center: [1, 0, 0],
      begin: [0, 0, 1],
      end: [0, 1, 0],
      gaps: [0, 0, -4]
    })

    var buraco_parafuso = align({
      obj: cylinder(dim.parafuso),
      ref: buraco_porca,
      center: [1, 0, 0],
      begin: [0, 1, 1],
      gaps: [0, 0.5, -2]
    })

    var base = align({
      obj: cube({ size: dim.base}),
      ref: buraco_parede,
      center: [1, 0, 0],
      end: [0, 1, 0],
      endToBegin: [0, 0, 1]
    })



    return {
      buraco: buraco_parede.union(buraco_parafuso).union(buraco_porca),
      buraco_parede,
      buraco_parafuso,
      buraco_porca,
      base}

  }

  return conector
})()

main = function() {
  var c = conector_branco(2)
  return c.base.subtract(c.buraco)
}
