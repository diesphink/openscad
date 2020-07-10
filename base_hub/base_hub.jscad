include('../libs/align.js')
include('../libs/split.js')

base_hub = (function() {
  "use strict"

  var x = 0; var y = 1; var z = 2

  var paredes = 2

  var dim = [130, 78, 23]
  var dim_menor = [20, 15, dim[z]]
  var dim_maior = [20, dim[y], dim[z]]
  var dim_ligacao = [dim[x], paredes, 10]
  var dim_suporte = [6, 15, 3]



  function hub() {
    return cube({size:dim, center: [1, 1, 0]})//.setColor([0.8, 0.3, 0.3, 0.5])
  }

  function suporte_parafuso() {
    var suporte_parafuso = cylinder({r: 1, h: 1, center: [true, true, false]}).scale([dim_suporte[x], dim_suporte[y]/2, dim_suporte[z]])
    var buraco_parafuso = cylinder({r: 1.5, h: 5, center: [false, true, false]}).translate([(dim_suporte[x]-3)/2, 0, 0])

    return suporte_parafuso.subtract(buraco_parafuso).splitX()[1]

  }

  function base_hub() {
    var ohub = hub()

    var menor = cube({size: [dim_menor[x], dim_menor[y], dim_menor[z] + paredes]})
    .align(ohub, {
      begin: [1, 1, 1],
      gaps: [-paredes, -paredes, 0]
    }).subtract(ohub)

    var maior = cube({size: [dim_maior[x], dim_maior[y] + paredes, dim_maior[z] + paredes]})
    .align(ohub, {
      end: [1, 0, 0],
      begin: [0, 1, 1],
      gaps: [-paredes, -paredes, 0]
    }).subtract(ohub)

    var ligacao = cube({size: dim_ligacao})
    .align(ohub, {
      begin: [1, 1, 1],
      gaps: [0, -paredes, 0]
    })

    var s1 = suporte_parafuso().scale([-1, 1, 1])
    .align(menor, {
      endToBegin: [1, 0, 0],
      begin: [0, 1, 1]
    })

    var s2 = suporte_parafuso()
    .align(maior, {
      beginToEnd: [1, 0, 0],
      begin: [0, 1, 1]
    })

    var s3 = suporte_parafuso()
    .align(maior, {
      beginToEnd: [1, 0, 0],
      begin: [0, 0, 1],
      end: [0, 1, 0]
    })

    return menor
      .union(maior)
      .union(ligacao)
      .union(s1)
      .union(s2)
      .union(s3)
      .rotateX(90).translate([0, 0, dim[y]/2 + paredes])
  }

  return {base_hub, hub}
})()

main = function() {

  align.init()
  split.init()

  return base_hub.base_hub();
}
