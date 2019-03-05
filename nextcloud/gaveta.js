gaveta = (function() {
  dim = {
    gav_int: {
      x: 236,
      y: 200,
      z: 105
    },
    gav_ext: {
      x: 256,
      y: 207,
      z: 107
    },
    max_x: 250,
    max_y: 210,
    max_z: 200,
    tampa: {
      z_ext: 3,
      z_int: 3
    }
  }

  function tampa() {
    "option explicit"
    c1 = cube({
      size: [dim.max_x, dim.gav_ext.y, dim.tampa.z_ext],
      center: [1, 0, 0]
    })

    c2 = cube({
      size: [dim.gav_int.x, dim.gav_int.y, dim.tampa.z_int],
      center: [1, 0, 0]
    }).translate([0, 0, dim.tampa.z_ext])

    return c1.union(c2)
  }

  return {tampa, dim}

})();


function main() {
  return gaveta.tampa()
}
