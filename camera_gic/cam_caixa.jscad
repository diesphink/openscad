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
      center: [1, 1, 0],
    }).translate([0, 0, 2])

    var cantoSW = repos(cube({size: [dim.canto.x, dim.canto.y, dim.canto.z]}), interno)
    var cantoSE = cantoSW.translate([dim.placa.x + dim.placa.folga - dim.canto.x, 0, 0])
    var cantoNW = cantoSW.translate([0, dim.placa.y + dim.placa.folga - dim.canto.y, 0])
    var cantoNE = cantoSE.translate([0, dim.placa.y + dim.placa.folga - dim.canto.y, 0])

    var buraco_cabo = cylinder({r: dim.cabo, h: dim.x}).rotateX(90).scale([1, 1, 0.5]).translate([0, 0, dim.z/3])


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
      var slit2 = slit1.rotateZ(180)

      // Snaps
      var snap1 = cylinder({
        r: dim.tampa.snap.r + dim.tampa.snap.folga,
        h: dim.tampa.snap.y + dim.tampa.snap.folga
      }).rotateX(90)
      .translate([-(dim.tampa.lid.x+ dim.tampa.snap.folga)/2, (dim.tampa.snap.y+ dim.tampa.snap.folga)/2, dim.z - dim.tampa.lid.z + dim.tampa.snap.r])
      .rotateZ(90)
      var snap2 = snap1.rotateZ(180)


    return externo
      .subtract(interno)
      .subtract(buraco_cabo)
      .union(cantoSW)
      .union(cantoSE)
      .union(cantoNE)
      .union(cantoNW)
      .union(slit1)
      .union(slit2)
      .subtract(sliti)
      .subtract(snap1)
      .subtract(snap2)

  }

  function caixa_top() {
    return caixa_cam.caixa().intersect(cube({
      size: [70, 70, 70],
      center: [1,1,0],
    }).translate([0, 0, 15])).translate([0, 0, -14])
  }


  return {dim, caixa, caixa_top}
})()

function main() {
  return caixa.caixa()
}
