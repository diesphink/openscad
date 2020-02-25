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
  dim.base = [17, 12, 8]

  function conector(grossura_parede) {

    var base = cube({size: dim.base})

    var buraco_parafuso = align({
      obj: cylinder(dim.parafuso),
      ref: base,
      center: [1, 0, 0],
      end: [0, 1, 1],
      gaps: [0, 1, 0]
    })

    base.properties.buraco = align({
      obj: cube({size: dim.conector}),
      ref: base,
      center: [1, 0, 0],
      beginToEnd: [0, 1, 1]
    }).setColor([0.4, 0.1, 0.1, 0.5])

    return base.subtract(buraco_parafuso)
  }

  return conector
})()

main = function() {
  var c = conector_branco()
  return c.union(c.properties.buraco)
}
