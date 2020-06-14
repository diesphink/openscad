include('common.js')
include('align.js')
include('caixa.js')

conector_dp = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim

  dim.y_buraco = [0, 0, 8, 10.5, 13, 16]
  dim.y_conector = [0, 0, 10.6, 13, 15.5, 18.2]


  dim.conector = [12, 6.5, 12]
  dim.espaco_conector = 4.5
  dim.paredes = 1
  dim.suporte1 = [3, dim.conector[y], 1.5]
  dim.suporte2 = [2.4, dim.conector[y], 3]
  dim.suporte1_offset = [1.6, 0, 0]
  dim.suporte_abas = [4, 1, 5]
  dim.suporte_frontal = [4, 3, 5]

  dim.buraco = [15, 8, 8]
  dim.buraco_offset = [-dim.suporte_frontal[x], 0, 0]
  dim.buraco_pino = [dim.buraco[x], 4, 3]

  function conector(qtd_pins = 2) {

    var incremento = (qtd_pins - 2) * 2.5
    dim.conector[y] = dim.conector[y] + incremento
    dim.suporte1[y] = dim.suporte1[y] + incremento
    dim.suporte2[y] = dim.suporte2[y] + incremento
    dim.buraco[y] = dim.buraco[y] + incremento

    var ref = cube({size: dim.conector})

    var suporte1 = align({
      obj: cube({size: dim.suporte1}),
      ref: ref,
      center: [0, 1, 0],
      end: [1, 0, 0],
      gaps: dim.suporte1_offset
    })

    var suporte2 = align({
      obj: cube({size: dim.suporte2}),
      ref: ref,
      center: [0, 1, 0],
      beginToEnd: [1, 0, 0]
    })

    var suporte_abas = align({
      obj: caixa({
        size: [dim.suporte_abas[x], dim.suporte_abas[y] * 2 + dim.conector[y], dim.suporte_abas[z]],
        walls: [0, dim.suporte_abas[y], 0]
      }),
      ref: suporte1,
      begin: [0, 0, 1],
      center: [0, 1, 0],
      end: [1, 0, 0],
    })

    var suporte_frontal = align({
      obj: cube({size: [dim.suporte_frontal[x], dim.suporte_frontal[y] * 2 + dim.buraco[y], dim.suporte_frontal[z]]}),
      ref: ref,
      begin: [1, 0, 1],
      center: [0, 1, 0],
    })

    var buraco = align({
      obj: cube({size: dim.buraco}),
      ref: ref,
      begin: [0, 0, 1],
      center: [0, 1, 0],
      endToBegin: [1, 0, 0],
      gaps: dim.buraco_offset
    })
    var buraco = buraco.union(align({
      obj: cube({size: dim.buraco_pino}),
      ref: buraco,
      center: [1, 1, 0],
      beginToEnd: [0, 0, 1],
      gaps:[0, 0, 0.2]
    })).setColor([0.4, 0.1, 0.1])


    var suporte = suporte1.union(suporte2).union(suporte_abas).union(suporte_frontal)
    suporte.properties.buraco = buraco

    return suporte
  }

  return conector
})()

main = function() {
  var caixa_simples = caixa({
    size: [16, 16, 15],
    walls: [0.5, 1, 1],
    center: [0, 1, 0]
  }).rotateZ(180)

  var c = align({
    obj: conector_dp(3),
    ref: caixa_simples,
    begin: [1, 0, 1],
    center: [0, 1, 0],
    gaps: [1, 0, 1]
  })


  return caixa_simples
  .union(c)
  .subtract(c.properties.buraco)
  // return c.union(c.properties.buraco)
}
