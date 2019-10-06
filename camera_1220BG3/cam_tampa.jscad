include('common.js')

tampa = (function() {
  "use strict"

  var dim = common.dim




  function tampa() {
    var base_maior = cube({
      size: [dim.x, dim.y, dim.tampa.z + 5],
      radius: [3, 3, 2],
      center: [1, 1, 0],
      fn: dim.fn
    })

    base_maior = base_maior.subtract(cube({size: [dim.x, dim.y, dim.tampa.z + 5], center: [1,1,0]}).translate([0, 0, dim.tampa.z]))


    var lid = cube({
      size: [dim.tampa.lid.x, dim.placa.y + dim.placa.folga - dim.tampa.folga, dim.tampa.lid.z],
      center: [1, 1, 0],
    })

    // Barras maiores (cubo grande)
    lid = lid.subtract(
      cube({
        size: [dim.tampa.lid.x - dim.tampa.lid.barra * 2, dim.placa.y + dim.placa.folga - dim.tampa.folga + 4, dim.tampa.lid.z + 4],
        center: [1, 1, 0],
      }).translate([0, 0, 2])
    ) // cubo menor dentro, semi redondo

    lid = lid.subtract(
      cube({
          size: [dim.tampa.lid.x - dim.tampa.lid.barra * 2, dim.placa.y + dim.placa.folga - dim.tampa.folga - 2, dim.tampa.lid.z + 4],
          radius: [6, 0, 2],
          center: [1, 1, 0],
          fn: 10
      })
    )

    lid = lid.translate([0, 0, dim.tampa.z])

    // Cilindro central
    var cc = cylinder({
      r: dim.tampa.r,
      h: dim.tampa.lid.z,
      fn: dim.fn
    })

    // // Cilindro suporte
    // var c = cylinder({
    //   r: dim.tampa.lid.circle.r + dim.tampa.lid.circle.x,
    //   h: dim.tampa.lid.z
    // }).subtract(cylinder({
    //   r: dim.tampa.lid.circle.r,
    //   h: dim.tampa.lid.z
    // })).translate([0, 0, dim.tampa.z])

    // Snaps
    var snap1 = cylinder({
      r: dim.tampa.snap.r,
      h: dim.tampa.snap.y
    }).rotateX(90).translate([-dim.tampa.lid.x/2, dim.tampa.snap.y/2, dim.tampa.lid.z + dim.tampa.z - dim.tampa.snap.r])
    var snap2 = snap1.rotateZ(180)

    return base_maior
      .union(lid)
      // .union(c)
      .union(snap1)
      .union(snap2)
      .subtract(cc)
  }



  return {tampa}
})()

main = function() {
  return tampa.tampa();
}
