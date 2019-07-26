caixa_cam = (function() {
  "use strict"

  var dim = {
    x: 43,
    y: 43,
    z: 21,
    cabo: 5,
    fn: 10,
    placa: {
      x: 38,
      y: 38,
      folga: 1.6,
    },
    canto: {
      x: 3,
      y: 3,
      z: 10
    },
    clip: {
      y: 5,
      z: 5,
      distancia_borda: 3
    },
    slit: {
      x: 4,
      y: 10,
      z: 12,
      interno: {
        x: 2.8,
        y: 6,
        z: 6,
      },
      raio_parafuso: 3.6/2,
    },
    tampa: {
      z: 2,
      folga: 0.5,
      r: 16/2,
      snap: {
        r: 1,
        y: 5,
        folga: 0.5
      },
      lid: {
        z: 5,
        x: 5,
        barra: 5,
      }
    },
     base: {
       y: 40,
       x: 80,
       z: 3,
       parede_grossa: 2,
       parede_fina: 2,
       folga: 0.5,
       raio_parafuso_grande: 6/2,
       suporte: {
         z: 50
       },
     }
  }

  dim.slit.interno.z_pos = dim.z - (dim.slit.interno.z/2)
  dim.tampa.lid.x = dim.placa.x + dim.placa.folga - dim.tampa.folga
  dim.base.suporte.y = dim.slit.z
  dim.base.inicio_ranhura = dim.y/2 - 10
  dim.base.x = dim.base.folga + dim.x + dim.slit.x*2 + 6*dim.base.parede_grossa + dim.base.raio_parafuso_grande * 2


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

  function tampa() {
    var externo = cube({
      size: [dim.x, dim.y, dim.tampa.z + 5],
      radius: [3, 3, 2],
      center: [1, 1, 0],
      fn: dim.fn
    })

    externo = externo.subtract(cube({size: [dim.x, dim.y, dim.tampa.z + 5], center: [1,1,0]}).translate([0, 0, dim.tampa.z]))

    var interno = cube({
      size: [dim.tampa.lid.x, dim.placa.y + dim.placa.folga - dim.tampa.folga, dim.tampa.lid.z],
      center: [1, 1, 0],
    })

    // Barras maiores (cubo grande)
    .subtract(cube({
      size: [dim.tampa.lid.x - dim.tampa.lid.barra * 2, dim.placa.y + dim.placa.folga - dim.tampa.folga + 4, dim.tampa.lid.z + 4],
      center: [1, 1, 0],
      fn: dim.fn
    }).translate([0, 0, 2])) // cubo menor dentro, semi redondo
    .subtract(cube({
      size: [dim.tampa.lid.x - dim.tampa.lid.barra * 2, dim.placa.y + dim.placa.folga - dim.tampa.folga - 2, dim.tampa.lid.z + 4],
      radius: [6, 0, 2],
      center: [1, 1, 0],
      fn: dim.fn
    })).translate([0, 0, dim.tampa.z])

    // Cilindro central
    var cc = cylinder({
      r: dim.tampa.r,
      h: dim.tampa.lid.z
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

    return externo
      .union(interno)
      // .union(c)
      .subtract(cc)
      .union(snap1)
      .union(snap2)
  }

  function caixa_top() {
    return caixa_cam.caixa().intersect(cube({
      size: [70, 70, 70],
      center: [1,1,0],
    }).translate([0, 0, 15])).translate([0, 0, -14])
  }

  function base() {

    var base = cube({
      size: [dim.base.x, dim.base.y, dim.base.z],
      radius: [3, 3, 1],
      fn: dim.fn
    })
    // .subtract(cube({size: [dim.base.x, dim.base.y, 5]}))
    // .translate([0, 0, -5])

    var interno_x = dim.base.folga + dim.x + dim.slit.x*2

    var suporte_vertical = cube({
      size: [dim.base.parede_grossa * 2 + interno_x, dim.base.y, dim.base.suporte.z],
      radius: [3, 3, 1],
      fn: dim.fn
    })

    var interno_suporte = cube({
      size: [interno_x, dim.base.y + 10, dim.base.suporte.z + 20],
      radius: [5, 0, 20],
      fn: dim.fn
    }).translate([dim.base.parede_grossa, -5, dim.base.z])

    var interno_suporte_round = cylinder({
      r: 1,
      h: dim.base.x
    })
    .rotateY(90)
    .scale([1, dim.base.y - dim.base.suporte.y, dim.base.suporte.z - dim.base.z])
    .translate([0, dim.base.y, dim.base.suporte.z])


    var ranhura1 = hull(
        circle(dim.slit.raio_parafuso),
        circle(dim.slit.raio_parafuso).translate([dim.base.suporte.z - dim.base.inicio_ranhura - dim.base.parede_grossa - dim.slit.raio_parafuso - dim.base.z, 0, 0]))
    .extrude({ offset: [0, 0, dim.base.x] })
    .rotateY(270)
    .translate([dim.base.x, dim.tampa.z + dim.slit.interno.z/2 - dim.slit.raio_parafuso, dim.base.inicio_ranhura])

    var ranhura2 = hull(
        circle(dim.base.raio_parafuso_grande),
        circle(dim.base.raio_parafuso_grande).translate([0, dim.base.y - 4*dim.base.parede_grossa - 2*dim.base.raio_parafuso_grande, 0]))
    .extrude({ offset: [0, 0, dim.base.x] })
    .translate([interno_x + dim.base.parede_grossa * 4, 2*dim.base.parede_grossa, 0])


    return base
      .union(suporte_vertical)
      .subtract(interno_suporte)
      .subtract(interno_suporte_round)
      .subtract(ranhura1)
      .subtract(ranhura2)
  }

  function full() {
    return caixa().union(
          tampa().rotateZ(90).rotateX(180).translate([0,0,dim.z + dim.tampa.z])
      )
      .rotateX(90)
      .translate([dim.x/2 + dim.slit.x + dim.base.parede_grossa, dim.z + dim.tampa.z, dim.y/2])
      .translate([0, 0, dim.base.z])
      .setColor([0.2, 0.6, 0.8])
      .union(base())
  }

  return {dim, caixa, tampa, caixa_top, full, base}
})()

function main() {
  return caixa_cam.full()
}
