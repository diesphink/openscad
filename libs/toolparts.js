/*

(c) 2020 diesphink
This code is licensed under MIT license (see LICENSE for details)

*/

const X = 0;
const Y = 1;
const Z = 2;

toolparts = (function() {
  "use strict"

  function makeChamferer(axis, dimensions) {
    // A diagonal do quadrado precisa valer 2, para quando inclinar a altura edle seja 2,
    // Assim, o lado tem que ser 2/2^(-2)
    var l = 2/Math.sqrt(2)
    var chamferer = cube(l)
    if (axis == X)
      chamferer = chamferer.rotateX(45)
    else if (axis == Y)
      chamferer = chamferer.rotateY(45)
    else if (axis == Z)
      chamferer = chamferer.rotateZ(45)
    chamferer = chamferer.scale(dimensions)
    return chamferer
  }

  function makeGridPuncher(qtdHoles, padding, dimensions) {
    var x = (dimensions[X] - ((qtdHoles-1) * padding))/qtdHoles
    var y = (dimensions[Y] - ((qtdHoles-1) * padding))/qtdHoles

    var cubes = null
    for (var ix = 0; ix < qtdHoles; ix++) {
      for (var iy = 0; iy < qtdHoles; iy++) {
        var cubo = cube({size: [x, y, dimensions[Z]]}).translate([(x + padding) * ix, (y + padding) * iy, 0])
        if (cubes == null)
          cubes = cubo
        else
          cubes = cubes.union(cubo)
      }
    }
    return cubes
  }

  return {makeChamferer, makeGridPuncher}
})()
