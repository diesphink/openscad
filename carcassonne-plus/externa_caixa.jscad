include('common.js')

externa_caixa = (function() {
  "use strict"

  var dim = common.dim

  dim.externa = {
    papelao: 3,
    z: 54,
    bottom: 1,
    overlid: 10,
    wall: 3,
    folga: 1,
    papelao_extra_y: 4,
    radius: 3,
    r_buraco_dedo: 10
  }

  function lateral_de_caixa({
      x, y, z, folga = 1, radius = 3, r_buraco = 10, overlid = 10,
      papelao = 3, wall = 3, bottom = 1, papelao_extra_y = 4} = {}) {

    var medidas_caixa = [
      x + papelao*2 + wall*2 + folga,
      wall + papelao_extra_y + overlid + radius,
      bottom + papelao*2 + z + folga
    ]

    var medida_papelao_base = [x + folga, y + folga]
    var medida_papelao_lateral = [y + folga + papelao_extra_y*2, z + papelao*2 + folga]

    console.log(`Base:    ${medida_papelao_base[0]} x ${medida_papelao_base[1]}`)
    console.log(`Lateral: ${medida_papelao_lateral[0]} x ${medida_papelao_lateral[1]}`)


    var caixa = cube({
      size: medidas_caixa,
      radius: radius,
      center: [1, 0, 0],
      fn: 18
    }).subtract(cube({
      size: medidas_caixa,
      center: [1, 0, 0],
    }).translate([0, medidas_caixa[1]-radius, 0]))

    var buraco_base = cube({
      size: [x + folga + papelao*2, overlid*2, z*2],
      center: [1, 0, 0]
    }).translate([0, wall + papelao_extra_y, bottom])

    var buraco_papelao1 = cube({
      size: [papelao, overlid*2, z*2]
    }).translate([-(x + folga)/2 - papelao , wall, bottom])

    var buraco_papelao2 = buraco_papelao1.mirroredX()

    var buraco_dedo = cylinder({r: r_buraco, h: overlid, center: [1, 1, 0]})
    .rotateX(270)
    .translate([0, 0, medidas_caixa[2]])

    return caixa.subtract([buraco_base, buraco_papelao1, buraco_papelao2, buraco_dedo])

  }

  return {lateral_de_caixa}
})()

function main() {
  // var caixa = externa_caixa.lateral_de_caixa({x: common.dim.base.x, y: common.dim.base.y, z: 54}) // Diferente do imrpesso pela falta da folga acima
  var tampa = externa_caixa.lateral_de_caixa({x: 193, y: 275, z: 61, folga: 3})
  return tampa
}
