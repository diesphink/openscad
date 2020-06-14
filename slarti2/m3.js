include('common.js')
include('../libs/align.js')

m3 = (function() {
  "use strict"

  function m3({r = 1.5, h = 8, cabeca = {r: 3, h: 3}, protecao = {r: 4, h: 3}} = {}) {
    var m3 = cylinder({r, h}).setColor([0.4, 0.1, 0.1, 0.5])

    m3.properties.cabeca = align({
      obj: cylinder(cabeca),
      ref: m3,
      center: [1, 1, 0],
      beginToEnd: [0, 0, 1]
    }).setColor([0.4, 0.1, 0.1, 0.5])

    var p = cylinder({r: protecao.r, h: protecao.h, center: [1, 1, 0]})
      .subtract(cylinder({r: cabeca.r, h: protecao.h, center: [1, 1, 0]}))

    m3.properties.protecao = align({
      obj: p,
      ref: m3,
      center: [1, 1, 0],
      beginToEnd: [0, 0, 1]
    })

    m3.properties.dim = {cabeca, protecao, r, h}

    return m3
  }

  return m3
})()

main = function() {
  var m = m3()
  return m.union(m.properties.protecao)
}
