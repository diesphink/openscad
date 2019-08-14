include('common.js')
include('cam_caixa.jscad')
include('cam_tampa.jscad')


base = (function() {
  "use strict"

  var dim = common.dim
  dim.fn = 10
  dim.base.folga_slit = 1
  dim.base.y = 60
  dim.base.parede_grossa = 3
  dim.base.suporte.z = dim.y / 2 + dim.slit.y/2 + dim.base.folga_slit + dim.base.parede_fina
  dim.base.x = dim.x + 2* (dim.slit.x + dim.base.parede_grossa)
  dim.base.suporte.y = dim.base.y - 2*dim.base.parede_grossa - 2*dim.base.raio_parafuso_grande

  function base() {

    var base = cube({
      size: [dim.base.x, dim.base.y, dim.base.z],
      radius: [2, 2, 1],
      fn: dim.fn
    })
    // .subtract(cube({size: [dim.base.x, dim.base.y, 5]}))
    // .translate([0, 0, -5])

    var interno_x = dim.base.folga + dim.x + dim.slit.x*2

    var suporte = cube({
      size: [dim.base.parede_grossa * 2 + interno_x, dim.base.suporte.y, dim.base.suporte.z],
      radius: [2, 2, 1],
      fn: dim.fn
    })

    var suporte_i1 = cube({
      size: [interno_x, dim.base.suporte.y - 5, dim.slit.y + 2*dim.base.folga_slit],
      radius: [dim.slit.x, 0, 2],
      fn: dim.fn
    }).translate([dim.base.parede_grossa, 0, dim.y/2 - dim.slit.y/2 - dim.base.folga_slit])

    var suporte_i2 = cube({
      size: [dim.x + dim.base.folga_slit, dim.base.suporte.y, dim.base.suporte.z]
    }).translate([dim.base.parede_grossa + dim.slit.x - dim.base.folga_slit/2, 0, 0])




    var ranhura1 = hull(
        circle(dim.slit.raio_parafuso),
        circle(dim.slit.raio_parafuso).translate([0, dim.base.suporte.y - 2*dim.slit.raio_parafuso - 2*dim.base.parede_grossa, 0])
    )
    .extrude({ offset: [0, 0, dim.base.x] })
    .rotateY(270)
    .translate([dim.base.x, dim.base.parede_grossa, dim.y/2 - dim.slit.raio_parafuso])




    var ranhura2 = hull(
        circle(dim.base.raio_parafuso_grande),
        circle(dim.base.raio_parafuso_grande).translate([dim.base.x - 2*dim.base.parede_grossa - dim.base.raio_parafuso_grande*2, 0, 0]))
    .extrude({ offset: [0, 0, dim.base.z] })
    .translate([dim.base.parede_grossa, dim.base.y - dim.base.parede_grossa - 2*dim.base.raio_parafuso_grande, 0])

    return base
      .union(suporte)
      .subtract(suporte_i1)
      .subtract(suporte_i2)
      .subtract(ranhura1)
      .subtract(ranhura2)
  }

  function full() {
    return base().union(
      caixa.caixa()
      .union(
          tampa.tampa().rotateZ(0).rotateX(180).translate([-dim.x/2,0,dim.z + dim.tampa.z])
      )
      .rotateX(90)
      .translate([dim.x/2 + dim.slit.x + dim.base.parede_grossa, dim.z + dim.tampa.z, dim.y/2])
      .setColor([0.2, 0.6, 0.8])
    )

  }



  return {base, full}
})()


main = function() {
  return base.base();
}
