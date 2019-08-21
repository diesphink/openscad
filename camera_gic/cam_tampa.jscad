include('common.js')

tampa = (function() {
  "use strict"

  var dim = common.dim
  dim.tampa.folga = 0.2

  function tampa() {
    var base_maior = cube({
      size: [dim.x, dim.y, dim.tampa.z + 5],
      radius: [3, 3, 2],
      center: [0, 1, 0],
      fn: dim.fn
    })

    base_maior = base_maior.subtract(cube({size: [dim.x, dim.y, dim.tampa.z + 5], center: [0,1,0]}).translate([0, 0, dim.tampa.z]))

    var lid1 = cube({
      size: [dim.placa.x + dim.placa.folga - dim.tampa.folga, dim.tampa.lid.bloco, dim.tampa.lid.z + dim.tampa.z],
      center: [0, 0, 0],
      radius: [1, 1, 1],
    }).translate([dim.parede_caixa + dim.tampa.folga/2, (dim.placa.y + dim.placa.folga)/2  - dim.tampa.lid.bloco - dim.tampa.folga, 0])

    var lid2 = lid1.translate([0, -(dim.placa.y + dim.placa.folga) + dim.tampa.lid.bloco + 2*dim.tampa.folga, 0])

    var lid3 = cube({
      size: [dim.rj45.x - dim.tampa.folga, dim.tampa.lid.bloco, dim.tampa.z + 3],
      center: [0, 0, 0],
      radius: [1, 1, 1],
    }).translate([dim.x - dim.rj45.x - dim.tampa.folga/2 - dim.parede_caixa, -(dim.placa.y + dim.placa.folga)/2 + dim.rj45.distancia, 0])

    var lid4 = cube({
      size: [dim.rj45.x - dim.tampa.folga, dim.tampa.lid.bloco, dim.tampa.z + 3],
      center: [0, 0, 0],
      radius: [1, 1, 1],
    }).translate([dim.x - dim.rj45.x - dim.tampa.folga/2 - dim.parede_caixa, (dim.placa.y + dim.placa.folga)/2 - dim.canto.y - dim.tampa.lid.bloco, 0])

    // Cilindro central
    var cc = cylinder({
      r: dim.tampa.r,
      h: dim.tampa.lid.z * 2,
      fn: dim.fn
    }).translate([dim.parede_caixa + (dim.placa.x + dim.placa.folga)/2, 0, 0])


    // Snaps
    var snap1 = cylinder({
      r: dim.tampa.snap.r,
      h: dim.tampa.snap.y
    })
    .rotateY(90).translate([
      //dim.parede_caixa + (dim.placa.x + dim.placa.folga)/2 - dim.tampa.snap.y/2,
      dim.x/2-dim.tampa.snap.y/2,
      (dim.placa.y + dim.placa.folga)/2 - dim.tampa.folga,
      dim.tampa.lid.z + dim.tampa.z - dim.tampa.snap.r])
    var snap2 = snap1.translate([0, -dim.placa.y - dim.placa.folga + 2*dim.tampa.folga, 0])

    // // Cilindro suporte
    // var c = cylinder({
    //   r: dim.tampa.lid.circle.r + dim.tampa.lid.circle.x,
    //   h: dim.tampa.lid.z
    // }).subtract(cylinder({
    //   r: dim.tampa.lid.circle.r,
    //   h: dim.tampa.lid.z
    // })).translate([0, 0, dim.tampa.z])


    return base_maior
      .union(lid1)
      .union(lid2)
      .union(lid3)
      // .union(lid4)
      // .union(c)
      .union(snap1)
      .union(snap2)
      .subtract(cc)
  }

  function clone(model, x, y, gap) {
    var ret = model;

    for (var i = 1; i < x; i++)
      ret = ret.union(model.translate([ret.getBounds()[1].x - ret.getBounds()[0].x + gap, 0, 0]))

    model = ret

    for (var i = 1; i < y; i++)
      ret = ret.union(model.translate([0, ret.getBounds()[1].y - ret.getBounds()[0].y + gap, 0]))

    return ret;
  }


  return {tampa, clone}
})()



main = function() {
  return tampa.clone(tampa.tampa(), 1, 3, 2);
}
