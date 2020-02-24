include('common.js')

m3 = (function() {
  "use strict"

  const x = 0
  const y = 1
  const z = 2

  var dim = common.dim
  dim.m3 = 1.5
  dim.m3_espaco = 3
  dim.m3_suporte = 4
  dim.m3_z = 5

  function m3s({espacamento = dim.perfil_espacamento} = {}) {
    var m3_buraco = cylinder({
      r: dim.m3,
      h: dim.m3_z * 2,
      center: [1, 1, 1]
    })

    m3_buraco = m3_buraco.union(m3_buraco.translate([0, espacamento, 0]))

    var m3_suporte = cylinder({
      r: dim.m3_suporte,
      h: dim.m3_z,
      center: [1, 1, 0]
    }).subtract(cylinder({
      r: dim.m3_espaco,
      h: dim.m3_z,
      center: [1, 1, 0]
    }))

    m3_suporte = m3_suporte.union(m3_suporte.translate([0, espacamento, 0]))

    return {suporte: m3_suporte, buraco: m3_buraco}
  }

  return m3s
})()

main = function() {
  return m3().suporte
}
