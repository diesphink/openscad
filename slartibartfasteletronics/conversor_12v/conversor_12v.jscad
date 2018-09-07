var conversor_12v = (function() {
  conversor = {}
  conversor.x = 52
  conversor.y = 35
  conversor.z = 13

  // Folga entre pcb e shell
  folga = .2

  // Tamanho da parede do shell
  parede = 1

  function mainshell() {
    shell = cube({
      size:[
        conversor.x + parede * 2 + folga * 2,
        conversor.y + parede * 2 + folga * 2,
        conversor.z
      ],
      center:[1, 1, 0],
    radius: [1,1,0]})

    hollow = cube({
      size:[
        conversor.x + folga * 2,
        conversor.y + folga * 2,
        conversor.z
      ],
      center:[1, 1, 0]}).translate([0, 0, parede])


    return shell.subtract(hollow).translate([conversor.x/2, conversor.y/2, 0])
  }

  cable = {}
  cable.x = 6
  cable.y = 12
  cable.z = 13

  folga_extra_slit = .2
  slit = {}
  slit.x = 2 + folga_extra_slit
  slit.y = 9 + folga_extra_slit
  slit.z = 9 + folga_extra_slit

  plug = {}
  plug.x = 10
  plug.y = 8 + parede
  plug.z = 6
  plug.pos_x = 7
  plug.pos_z = 7

  function cable_holder() {
    cable_holder = cube({size: [cable.x, cable.y, cable.z]})
    slits = cube({size:[slit.x + folga, slit.y + folga, slit.z + folga]})
    slits = slits.translate([(cable.x - slit.x)/2 , (cable.y - slit.y)/2, cable.z - slit.z])
    cable_holder = cable_holder.subtract(slits)

    return cable_holder.translate([-folga -cable.x, conversor.y + folga + parede - cable.y , 0])
  }

  function cable_holder_hollow() {
    largura = 4.6
    altura = slit.z - (slit.z - largura)/2

    return cube({
      size: [cable.x * 3, largura + folga, altura],
      center: [1,1,0]
    }).translate([0, conversor.y + folga + parede - (cable.y/2), cable.z - altura])
  }

  function plug_hollow() {
    return cube([plug.x + 2 * folga, parede * 3, conversor.z]).translate([conversor.x - plug.pos_x - plug.x, conversor.y, parede])
  }

  function plugue() {
    shell = cube({
      size:[plug.x + 4 * parede + 2 * folga, plug.y, plug.z + plug.pos_z ],
      center:[1, 1, 0]
    })

    hollow = cube({
      size: [plug.x + 2*folga, plug.y + 2*folga, plug.z],
      center:[1, 1, 0]
    }).translate([0, 0, plug.pos_z])

    slit = cube({
      size: [1, 2, plug.z],
      center:[0, 0, 0]
    }).translate([plug.x, 1, plug.pos_z])

    wall = cube({
      size: [plug.x + 4 * parede + 2 * folga, parede, plug.pos_z + 3],
      center:[1, 0, 0]
    }).translate([0, plug.y/2 - parede, 0])

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
