include('common.js')

caixa = (function() {
  "use strict"

  var dim = common.dim

  function repos(objParaMover, objReferencia) {
    var atual = objParaMover.getBounds()[0];
    var ref = objReferencia.getBounds()[0]
    return objParaMover.translate([ref.x - atual.x, ref.y - atual.y, ref.z - atual.z])
  }

  function caixa() {
    var externo = cube({
      size: [dim.x, dim.y, dim.z + 5],
      radius: 3,
      center: [1, 1, 0],
      fn: dim.fn
    })


    externo = externo.subtract(cube({size: [dim.x, dim.y, dim.z], center: [1,1,0]}).translate([0, 0, dim.z]))


    var interno = cube({
      size: [dim.placa.x + dim.placa.folga, dim.placa.y + dim.placa.folga, dim.z],
      center: [0, 1, 0],
    }).translate([(-dim.x/2) + dim.parede_caixa, 0, 2])
    // interno = repos(interno, externo).translate([dim.parede_caixa, dim.parede_caixa, 0])

    var canto = cube({size: [dim.canto.x, dim.canto.y, dim.canto.z], center: [1,1,0]})
    // canto = canto.union(cylinder({r: 0.8, h: 1.2, center: [true, true, false]}).translate([0, 0, dim.canto.z]))

    var cantoSW = repos(canto, interno)
    var cantoSE = cantoSW.translate([dim.placa.x + dim.placa.folga - dim.canto.x, 0, 0])
    var cantoNW = cantoSW.translate([0, dim.placa.y + dim.placa.folga - dim.canto.y, 0])
    var cantoNE = cantoSE.translate([0, dim.placa.y + dim.placa.folga - dim.canto.y, 0])

    var slit = cube({
      size: [dim.slit.x * 2, dim.slit.y, dim.slit.z + 5],
      radius: [dim.slit.x, 2, 6],
      fn: dim.fn
    })
    .subtract(cube({
       size: [dim.slit.x, dim.slit.y, dim.slit.z + 5],
     }).translate([dim.slit.x, 0, 0]))
    .subtract(cube({
       size: [dim.slit.x, dim.slit.y, dim.slit.z],
     }).translate([0, 0, dim.slit.z]))
     .subtract(cube({
        size: [dim.slit.interno.x, dim.slit.interno.y, dim.slit.z ],
      }).translate([dim.slit.x - dim.slit.interno.x, (dim.slit.y - dim.slit.interno.y) /2 , dim.slit.z - dim.slit.interno.z]))

      var sliti = cylinder({r: dim.slit.raio_parafuso, h: dim.x * 2}).rotateY(90)
      .translate([-dim.x, 0, dim.slit.interno.z_pos])

      var slit1 = repos(slit, externo).translate([-dim.slit.x, (dim.y - dim.slit.y) /2, dim.z - dim.slit.z])
      var slit2 = slit1.rotateZ(180)//.translate([dim.x, 0, 0])

      var espaco_cabo_cam = cube({
        size: [10, 1, dim.z],
        center: [1, 0, 0]
      })
      .translate([-dim.x/2 + dim.parede_caixa + dim.placa.x/2, (dim.placa.y + dim.placa.folga)/2, 10])

      // Snaps

      var snap1 = cylinder({
        r: dim.tampa.snap.r + dim.tampa.snap.folga,
        h: dim.tampa.snap.y + dim.tampa.snap.folga
      }).rotateX(90)
      .translate([(dim.tampa.lid.x+ dim.tampa.snap.folga)/2, (dim.tampa.snap.y+ dim.tampa.snap.folga)/2, dim.z - dim.tampa.lid.z + dim.tampa.snap.r])
      .rotateZ(90)
      var snap2 = snap1.rotateZ(180)

      // RJ45
      var rj45 = cube({
        size: [dim.rj45.x, dim.rj45.y, dim.z],
        center: [1,0,0]
      }).translate([dim.x/2 - dim.rj45.x/2 - dim.parede_caixa, (dim.placa.y + dim.placa.folga)/2 - dim.rj45.y - dim.rj45.distancia, 2])

      var espaco_cabos = cube({
        size: [dim.rj45.x * 2, dim.rj45.espaco_cabos, dim.z],
        center: [1,0,0]
      }).translate([dim.x/2 - dim.rj45.x - dim.parede_caixa, -dim.placa.y/2 + dim.canto.y - dim.placa.folga/2, 7])

      var rj45_buraco = cube({
        size: [dim.rj45.buraco.x, dim.rj45.buraco.y, dim.z],
        center: [1,0,0]
      }).translate([dim.x/2 - dim.rj45.x/2 - dim.parede_caixa, (dim.placa.y + dim.placa.folga)/2 - dim.rj45.buraco.y - dim.rj45.distancia, 0])


    return externo
      .subtract(interno)
      .union(cantoSW)
      .union(cantoSE)
      .union(cantoNE)
      .union(cantoNW)
      .union(slit1)
      .union(slit2)
      .subtract(sliti)
      .subtract(snap1)
      .subtract(snap2)
      .subtract(rj45)
      .subtract(espaco_cabos)
      .subtract(rj45_buraco)
      .subtract(espaco_cabo_cam)

      // .union(rj45)

  }

  function caixa_top() {
    return caixa_cam.caixa().intersect(cube({
      size: [70, 70, 70],
      center: [1,1,0],
    }).translate([0, 0, 15])).translate([0, 0, -14])
  }


  return {dim, caixa, caixa_top}
})()

function main_rj45() {
  var dim = common.dim
  return caixa.caixa().intersect(
    cube({
      size: [dim.x, dim.y, dim.z],
      center: [1, 1, 0],
    }).translate([dim.placa.x, 0, 0])
)
}

function main_cx() {
  var dim = common.dim
  return caixa.caixa().intersect(
    cube({
      size: [dim.placa.x + 6, dim.y, 3],
      center: [1, 1, 0],
    }).translate([-10, 0, dim.canto.z + 1.4])
)
}


function main() {
  return caixa.caixa()
  // return main_rj45()
  // return main_cx()
}
