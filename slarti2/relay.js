include('common.js')
include('../libs/align.js')
include('m3.js')
include('caixa.js')

relay = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim
  dim.placa = [26, 33.7, 8]
  dim.buraco = [10, 10, 5]
  dim.posicao_buraco = [5, 33.7, 3 + dim.placa[z]]
  dim.espaco_buraco = 1.9

  function relay() {
    var suporte = caixa({
      size: [dim.placa[x] + 2, dim.placa[y] + 2, dim.placa[z]],
      walls: [6, 0, 0],
      center: [1, 1, 0]
    })

    var parafuso = cylinder({r: 1.5, h: dim.placa[z]})

    var buracos_parafusos = parafuso.align(suporte, { begin: [1, 1, 1], gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]})
    .union(parafuso.align(suporte, { begin: [1, 0, 1], end: [0, 1, 0], gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]}))
    .union(parafuso.align(suporte, { begin: [0, 1, 1], end: [1, 0, 0], gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]}))
    .union(parafuso.align(suporte, { begin: [0, 0, 1], end: [1, 1, 0], gaps: [dim.espaco_buraco, dim.espaco_buraco, 0]}))

    suporte.properties.buraco = cube({size: dim.buraco })
    .align(suporte, { begin: [1, 1, 1], gaps: dim.posicao_buraco})
    .setColor([0.4, 0.1, 0.1, 0.5])


    return suporte.subtract(buracos_parafusos)
  }

  return relay
})()

main = function() {
  var r = relay()
  return r.union(r.properties.buraco)
}
