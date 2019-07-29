include('common.js')

base = (function() {
  "use strict"

  var dim = common.dim

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


  return {base}
})()


main = function() {
  return base.base();
}
