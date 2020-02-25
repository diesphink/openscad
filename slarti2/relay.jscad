include('common.js')
include('align.js')
include('m3.jscad')
include('caixa.js')

relay = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim
  dim.placa = [26, 33.7, 8]
  dim.buraco = [8, 10, 3]
  dim.posicao_buraco = [5, 33.7, 3 + dim.placa[z]]
  dim.espaco_buraco = 1.9

  function relay() {
    var suporte = caixa({
      size: [dim.placa[x] + 2, dim.placa[y] + 2, dim.placa[z]],
      walls: [5, 0, 0],
      center: [1, 1, 0]
    }).caixa

    var parafuso = cylinder({r: 1.5, h: dim.placa[z]})

    var buracos_parafusos = align({
      obj: parafuso,
      ref: suporte,
      begin: [1, 1, 1],
      gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]
    }).union(align({
      obj: parafuso,
      ref: suporte,
      begin: [1, 0, 1],
      end: [0, 1, 0],
      gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]
    })).union(align({
      obj: parafuso,
      ref: suporte,
      begin: [0, 1, 1],
      end: [1, 0, 0],
      gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]
    })).union(align({
      obj: parafuso,
      ref: suporte,
      begin: [0, 0, 1],
      end: [1, 1, 0],
      gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]
    }))

    suporte.properties.buraco = align({
        obj: cube({size: dim.buraco }),
        ref: suporte,
        begin: [1, 1, 1],
        gaps: dim.posicao_buraco
      })


    return suporte.subtract(buracos_parafusos)
  }

  return relay
})()

main = function() {
  return relay()
}
