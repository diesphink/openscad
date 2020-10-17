include('../libs/align.js')



suporte_mic = (function() {
"use strict"

  function suporte_mic() {

    var dim_base = { r: 18.5, h: 2 }
    var dim_pino_interno = { r: 16, h: 10 }
    var dim_pino_externo = { r: 7.5, h: 10 }

    var base = cylinder(dim_base)
    var pino_interno = cylinder(dim_pino_interno).align(base, {center: [1, 1, 0], endToBegin: [0, 0, 1]})
    var pino_externo = cylinder(dim_pino_externo).align(base, {center: [1, 1, 0], beginToEnd: [0, 0, 1]})

    return base.union(pino_interno).union(pino_externo)

  }

  return suporte_mic
})()

main = function() {
  align.init()

  return suporte_mic()
}
