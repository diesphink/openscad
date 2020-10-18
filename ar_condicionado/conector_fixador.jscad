include('../libs/align.js')
include('../libs/distribute.js')
include('../libs/split.js')
include('../libs/toolparts.js')


conector_fixador = (function() {
"use strict"

  const X = 0; const Y = 1; const Z = 2;

  function conector_fixador() {

    var dim_tubo = {r: 161/2, h: 45, parede: 4}
    var dim_suporte = {parede: 4, projecao: 10, r_parafuso: 1.6}

    var tubo = cylinder({r: dim_tubo.r + dim_tubo.parede, h: dim_tubo.h, center: [true, true, false]})
      .subtract(cylinder({r: dim_tubo.r, h: dim_tubo.h, center: [true, true, false]}))
    var tubo = tubo
      .intersect(cube({size:[dim_tubo.r, dim_tubo.r, dim_tubo.h]}).align(tubo, {begin:[1, 1, 1]}))

    var suporte_parafuso = cylinder({r: dim_suporte.projecao, h: dim_suporte.parede, center: [true, true, false]})
      .splitX()[0]
    suporte_parafuso = suporte_parafuso
      .subtract(cylinder({r: dim_suporte.r_parafuso, h: dim_suporte.parede, center: [true, true, false]}).align(suporte_parafuso, {center:[1,0,0]}))
      .rotateX(90)

    suporte_parafuso = [
      suporte_parafuso.align(tubo, {begin:[0,0,1], endToBegin:[1,0,0], end:[0,1,0]}).translate([2, 0, 0]),
      suporte_parafuso.align(tubo, {begin:[0,0,0], endToBegin:[1,0,0], end:[0,1,1]}).translate([2, 0, 0]),
      suporte_parafuso.rotateZ(90).align(tubo, {begin:[0,0,1], endToBegin:[0,1,0], end:[1,0,0]}).translate([0, 2, 0]),
      suporte_parafuso.rotateZ(90).align(tubo, {begin:[0,0,0], endToBegin:[0,1,0], end:[1,0,1]}).translate([0, 2, 0])
    ]

    var suporte_parafuso = cube({size: [dim_suporte.projecao, dim_suporte.parede, dim_tubo.h], radius:[1,2,0], fn: 32})
    suporte_parafuso = suporte_parafuso
      .subtract(cylinder({r: dim_suporte.r_parafuso, h: 3 * dim_suporte.parede}).rotateX(90).align(suporte_parafuso, {center:[1,1,1]}).translate([0, 0, 15]))
      .subtract(cylinder({r: dim_suporte.r_parafuso, h: 3 * dim_suporte.parede}).rotateX(90).align(suporte_parafuso, {center:[1,1,1]}).translate([0, 0, -15]))
    suporte_parafuso = [
      suporte_parafuso.align(tubo, {endToBegin: [1, 0, 0], end: [0, 1, 0]}).translate([2, 0, 0]),
      suporte_parafuso.rotateZ(90).align(tubo, {end: [1, 0, 0], endToBegin: [0, 1, 0]}).translate([0, 2, 0])
    ]








    return tubo.union(suporte_parafuso).align(null, {center:[1,1,0]})

  }

  return conector_fixador
})()

main = function() {
  align.init()
  split.init()

  return conector_fixador()
}
