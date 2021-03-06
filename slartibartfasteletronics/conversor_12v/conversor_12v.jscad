conversor_12v = (function() {
  "use strict"

  var conversor = {}
  conversor.x = 52
  conversor.y = 35
  conversor.z = 15
  var z_displacement = 7

  // Folga entre pcb e shell
  var folga = .2

  // Tamanho da parede do shell
  var parede = 1

  function mainshell() {
    var shell = cube({
      size:[
        conversor.x + parede * 2 + folga * 2,
        conversor.y + parede * 2 + folga * 2,
        conversor.z + z_displacement
      ],
      center:[1, 1, 0],
    radius: [1,1,0]})

    var hollow = cube({
      size:[
        conversor.x + folga * 2,
        conversor.y + folga * 2,
        conversor.z
      ],
      center:[1, 1, 0]}).translate([0, 0, parede + z_displacement])


    return shell.subtract(hollow).translate([conversor.x/2, conversor.y/2, 0])
  }

  var cable = {}
  cable.x = 6
  cable.y = 12
  cable.z = 15

  var folga_extra_slit = .2
  var slit = {}
  slit.x = 2 + folga_extra_slit
  slit.y = 10 + folga_extra_slit
  slit.z = 10 + folga_extra_slit

  var plug = {}
  plug.x = 10
  plug.y = 8 + parede
  plug.z = 8
  plug.pos_x = 7
  plug.pos_z = 7

  function cable_holder() {
    cable_holder = cube({size: [cable.x, cable.y, cable.z + z_displacement]})
    var slits = cube({size:[slit.x + folga, slit.y + folga, slit.z + folga]})
    slits = slits.translate([(cable.x - slit.x)/2 , (cable.y - slit.y)/2, cable.z - slit.z  + z_displacement])
    cable_holder = cable_holder.subtract(slits).setColor([0,0,1])
      .rotateZ(270)
      .translate([0, conversor.y + folga + parede + cable.x,  0])

    return cable_holder//.translate([-folga -cable.x, conversor.y + folga + parede - cable.y , 0])
  }

  function cable_holder_hollow() {
    var largura = 4.6
    var altura = slit.z - (slit.z - largura)/2

    return cube({
      size: [largura + folga, cable.x * 3, altura],
      center: [1,1,0]
    }).translate([cable.y / 2, conversor.y + folga + parede, cable.z - altura  + z_displacement])
  }

  function plug_hollow() {
    return cube([plug.x + 2 * folga, parede * 3, conversor.z])
    .translate([conversor.x - plug.pos_x - plug.x, conversor.y, parede +  z_displacement])
  }

  function plugue() {
    var shell = cube({
      size:[plug.x + 4 * parede + 2 * folga, plug.y, plug.z + plug.pos_z  + z_displacement],
      center:[1, 1, 0]
    })

    var hollow = cube({
      size: [plug.x + 2*folga, plug.y + 2*folga, plug.z],
      center:[1, 1, 0]
    }).translate([0, 0, plug.pos_z + z_displacement])

    var slit = cube({
      size: [1, 2, plug.z],
      center:[0, 0, 0]
    }).translate([plug.x, 1, plug.pos_z + z_displacement])

    var wall = cube({
      size: [plug.x + 4 * parede + 2 * folga, parede, plug.pos_z + 3],
      center:[1, 0, 0]
    }).translate([0, plug.y/2 - parede, + z_displacement])

    shell = shell.subtract(hollow)
    shell = shell.union(wall)
    shell = shell.translate([plug.x/2, plug.y/2, 0])
    shell = shell.subtract(slit)
    shell = shell.translate([conversor.x - plug.pos_x - plug.x + folga, conversor.y + folga, 0])

    return shell
  }

  function base() {
    return mainshell().union(cable_holder()).subtract(cable_holder_hollow()).subtract(plug_hollow()).union(plugue())
  }

  return {base}

})()
  function main() {
    return conversor_12v.base()
  }
