powerplug = (function() {
  var dim = {
    x: 13,
    y: 20,
    z: 13,
    slit: {
      y: 33,
      z: 15,
      x: 3,
      gap_z: 1.5,
      gap_x: 3
    },
    folga: 0.2,
    parede: 1.2,
    altura: 5,
    folga_y: 5
  }

  function base() {
    var shell = cube({
      size:[
        dim.x,
        dim.slit.y + dim.folga_y,
        dim.altura + dim.slit.z
      ],
      center:[0, 1, 0],
      radius: [0, 3, 3],
      fn: 16
    })
    return shell
  }

  function hollow() {
    var hollow = cube({
      size: [dim.x + dim.folga, dim.y + dim.folga, dim.z * 2],
      center: [0, 1, 0]
    })
      .translate([0, 0, dim.altura])
    return hollow
  }

  function slit() {
    var slit = cube({
      size: [dim.slit.x + dim.folga, dim.slit.y + dim.folga, dim.slit.z + dim.altura],
      center: [0, 1, 0]
    })
      .translate([dim.slit.gap_x, 0, dim.altura - dim.slit.gap_z])
    return slit
  }

  return {base, dim, hollow, slit}
})()

function main() {
  return powerplug.base().subtract(powerplug.hollow()).subtract(powerplug.slit());
}
