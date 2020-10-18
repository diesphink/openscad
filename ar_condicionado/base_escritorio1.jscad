include('../libs/align.js')
include('../libs/distribute.js')
include('../libs/split.js')
include('../libs/toolparts.js')


base_escritorio1 = (function() {
"use strict"

  const X = 0; const Y = 1; const Z = 2;

  function base_escritorio1() {

    var dim_base = [150, 140, 6]
    var dim_degrau1 = [150, 20, 14]
    var dim_degrau2 = [150, 10, 12]
    var radius = 3
    var fn = 16

    dim_base[Z] += radius
    dim_degrau1[Z] += radius*2
    dim_degrau2[Z] += radius*2

    var base = cube({size: dim_base, radius: radius, fn: fn}).translate([0, 0, -radius])

    base = base.union(
      cube({size: dim_degrau1, radius: radius, fn: fn})
      .align(base, {begin:[1,1,0], beginToEnd: [0,0,1]})
      .translate([0, 0, -radius*2]))

    base = base.union(
      cube({size: dim_degrau2, radius: radius, fn: fn})
      .align(base, {begin:[1,1,0], beginToEnd: [0,0,1]})
      .translate([0, 0, -radius*2]))

    base = base.intersect(cube({size: [dim_base[X], dim_base[Y], dim_base[Z] + dim_degrau1[Z] + dim_degrau2[Z]]}))

    return base.align(null, {center:[1,1,0]})

  }

  return base_escritorio1
})()

main = function() {
  align.init()
  split.init()

  return base_escritorio1().splitX(4)[1].splitX(10)[0].splitY(40)
}
