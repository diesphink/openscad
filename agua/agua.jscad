agua = (function() {
  "use strict"

  var dim = {
    parede: 1.2,
    bomba: {
      r: 11/2,
      z: 11
    },
    cano: {
      r: 8/2,
      z: 11
    }
  }

  function adaptador() {
    var externo = cylinder({
      r: dim.bomba.r + dim.parede,
      h: dim.bomba.z + dim.cano.z
    })

    var bomba = cylinder({
        r: dim.bomba.r,
        h: dim.bomba.z
    })

    var cano = cylinder({
        r: dim.cano.r,
        h: dim.cano.z
    }).translate([0, 0, dim.bomba.z])

    return externo.subtract(bomba).subtract(cano)
  }

  return {dim, adaptador}
})()

function main() {
  return agua.adaptador()
}
