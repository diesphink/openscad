include('common.js')
include('cam_caixa.jscad')
include('cam_tampa.jscad')


base = (function() {
  "use strict"

  var dim = common.dim
  dim.base.x = 90
  dim.base.folga = 0

  function base() {

    var base = cube({
      size: [dim.base.x, dim.base.y, dim.base.z],
      radius: [2, 2, 1],
      fn: dim.fn
    })
    // .subtract(cube({size: [dim.base.x, dim.base.y, 5]}))
    // .translate([0, 0, -5])

    var interno_x = dim.base.folga + dim.x + dim.slit.x*2

    var suporte_vertical = cube({
      size: [dim.base.parede_grossa * 2 + interno_x, dim.base.y, dim.base.suporte.z],
      radius: [2, 2, 1],
      fn: dim.fn
    })

    var interno_suporte = cube({
      size: [interno_x, dim.base.y - dim.z + dim.base.parede_fina + 10, dim.base.suporte.z + 20],
      radius: [5, 0, 20],
      fn: 10
    }).translate([dim.base.parede_grossa, -5, 0])

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
    .translate([dim.base.x - 2*dim.base.parede_grossa - 2*dim.base.raio_parafuso_grande, 2*dim.base.parede_grossa, 0])

    var par_fina1 = cube({
      size: [dim.slit.x - dim.base.folga, dim.base.parede_fina + 5, dim.base.suporte.z],
      radius: [0, 2, 1],
      fn: dim.fn
    })
    .subtract(cube({size: [dim.slit.x, 5, dim.base.suporte.z]}).translate([0, dim.base.parede_fina, 0]))
    .translate([dim.base.parede_grossa, 0, 0])

    var par_fina2 = par_fina1.translate([dim.x + dim.base.folga * 2 + dim.slit.x, 0, 0])

    return base
      .union(suporte_vertical)
      .subtract(ranhura1)
      .subtract(ranhura2)
      .subtract(interno_suporte_round)
      .subtract(interno_suporte)
      .union(par_fina1)
      .union(par_fina2)
  }

  function full() {
    return base().union(
      caixa.caixa()
      .union(
          tampa.tampa().rotateZ(0).rotateX(180).translate([0,0,dim.z + dim.tampa.z])
      )
      .rotateX(90)
      .translate([dim.x/2 + dim.slit.x + dim.base.parede_grossa, dim.z + dim.tampa.z, dim.y/2])
      .translate([0, 0, dim.base.z])
      .setColor([0.2, 0.6, 0.8])
    )

  }



  return {base, full}
})()


main = function() {
  return base.base();
}
