include('common.js')
include('cam_caixa.jscad')
include('cam_tampa.jscad')


base = (function() {
  "use strict"

  function base() {

    var dim = common.dim

    dim.base.raio_parafuso_grande = 5/2

    dim.gnd = {
      furo: 6,
      espaco_entre_furos: 19,
      y_ate_furos: 3
    }
    dim.base.folga_slit = 1
    dim.base.y = 45
    // dim.base.suporte.y = dim.base.y - 2*dim.base.parede_grossa //- 2*dim.base.raio_parafuso_grande
    dim.base.x = 5 * dim.gnd.furo + 4 * dim.gnd.espaco_entre_furos + 2* dim.base.parede_grossa

    var interno_x = dim.base.folga + dim.x + dim.slit.x*2

    dim.suporte = {
      x: dim.base.parede_grossa * 2 + interno_x,
      y: dim.base.y,
      z: dim.y/2 + dim.slit.y/2 + dim.base.folga_slit + dim.base.parede_grossa
    }
    dim.suporte.parede = (dim.suporte.x - (dim.x + dim.base.folga_slit))/2
    console.log("base")
    console.log(dim.x)


    var base = cube({
      size: [dim.base.x, dim.base.y, dim.base.z],
      center: [1, 0, 0],
      radius: [1, 1, 1],
      fn: dim.fn
    })


    var suporte = cube({
      size: [dim.suporte.x, dim.suporte.y, dim.suporte.z],
      radius: [2, 2, 1],
      center: [1, 0, 0],
      fn: dim.fn
    })

    var suporte_i1 = cube({
      size: [interno_x, dim.suporte.y - dim.suporte.parede, dim.slit.y + 2*dim.base.folga_slit],
      radius: [dim.slit.x, 0, 2],
      center: [1, 0, 0],
      fn: dim.fn
    }).translate([0, 0, dim.y/2 - dim.slit.y/2 - dim.base.folga_slit])

    var suporte_i2 = cube({
      size: [dim.x + dim.base.folga_slit, dim.suporte.y - dim.suporte.parede, dim.suporte.z],
      center: [1, 0, 0]
    })

    var suporte_i3 = cube({
      size: [dim.rj45.x + 2*dim.base.folga_slit, dim.y, dim.rj45.y],
      // center: [1,0,0]
    }).translate([dim.x/2 - dim.rj45.x - dim.base.folga_slit, 2*dim.base.parede_grossa, dim.base.z + 4* dim.base.parede_grossa])


    var ranhura1 = hull(
        circle(dim.slit.raio_parafuso),
        circle(dim.slit.raio_parafuso).translate([0, dim.suporte.y - 2*dim.slit.raio_parafuso - 4*dim.base.parede_grossa, 0])
    )
    .extrude({ offset: [0, 0, dim.base.x] })
    .rotateY(270)
    .translate([dim.base.x/2, dim.base.parede_grossa, dim.y/2 - dim.slit.raio_parafuso])

    var ranhura2 = hull(
        circle(dim.base.raio_parafuso_grande),
        circle(dim.base.raio_parafuso_grande).translate([0, dim.base.y - dim.base.parede_fina - dim.base.parede_grossa - 2*dim.base.raio_parafuso_grande, 0]))
    .extrude({ offset: [0, 0, dim.base.x] })
    .translate([dim.base.x/2 - 2*dim.base.raio_parafuso_grande - dim.base.parede_grossa - (dim.gnd.furo - 2*dim.base.raio_parafuso_grande)/2, dim.base.parede_fina, 0])




    return base
      .union(suporte)
      .subtract(suporte_i1)
      .subtract(suporte_i2)
      .subtract(suporte_i3)
      // .union(suporte_i3)
      .subtract(ranhura1)
      .subtract(ranhura2)
      .subtract(ranhura2.mirroredX())

  }

  function full() {
    var dim = common.dim
    return base().union(
      caixa.caixa()
      .union(
          tampa.tampa().rotateZ(0).rotateX(180).translate([-dim.x/2,0,dim.z + dim.tampa.z])
      )
      .rotateX(90)
      .translate([0, dim.z + dim.tampa.z, dim.y/2])
      // .translate([dim.x/2 + dim.slit.x + dim.base.parede_grossa, dim.z + dim.tampa.z, dim.y/2])
      .setColor([0.2, 0.6, 0.8])
    )

  }


  return {base, full}
})()

function sliceZ({model, from, to, h}) {
  if (!h)
    h = to - from
  return model.intersect(cube({
    size: [400, 400, h],
    center: [1,1,0],
  }).translate([0, 0, from])).translate([0, 0, -from])
}



main = function() {
  // console.log("main",   common.dim.x)
  // return base.base();
  return sliceZ({model: base.base(), from: 0, h: 3})
}
