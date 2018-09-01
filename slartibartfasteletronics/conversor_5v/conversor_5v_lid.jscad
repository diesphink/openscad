include('common.js')

lid_height = 5;
protusion = 1;


function cable_guide() {
  shell = linear_extrude({ height: conversor['z']},
    hull(square([cable['x_ini'], 5]),
    translate([(cable['x_ini'] - cable['x_fim'])/2, cable['y'], 0], square(cable['x_fim'])))
  )

  hollow = linear_extrude({ height: conversor['z']},
    hull(square([cable['x_ini'] - parede * 2, 5]),
    translate([(cable['x_ini'] - cable['x_fim'])/2 - parede/2, cable['y'], 0], square(cable['x_fim'] - parede)))
  )

  hollow = hollow.union(
    cube([cable['x_fim'] - parede , 10, 50]).translate([
      (cable['x_ini'] - cable['x_fim'])/2 - parede/2,
      cable['y'],
      0])
  )

  hollow = hollow.translate([parede, 0, base_z])

  shell = shell.subtract(hollow)
  shell = shell.setColor([0.1, 0.4, 0.6])

  middle_cylinder = cylinder({r: 3, h: conversor['z']}).subtract(cylinder({r: 2, h:conversor['z']}))

  middle_cylinder = middle_cylinder.translate([cable['x_ini']/2, 7, 0]).setColor([0.3, 0.7, 0.8])
  shell = shell.union(middle_cylinder)

  return shell.translate([
    (conversor['x'] + parede + folga) - cable['x_ini'],
    conversor['y'] + folga,
    0])
}

function cable_guide_lid() {
  outer = linear_extrude({ height: lid_height},
    hull(square([cable['x_ini'], 5]),
    translate([(cable['x_ini'] - cable['x_fim'])/2, cable['y'], 0], square(cable['x_fim'])))
  )

  prot = linear_extrude({ height: protusion + lid_height},
    hull(square([cable['x_ini'] - parede * 2 - folga * 2, 5]),
    translate([(cable['x_ini'] - cable['x_fim'])/2 - parede/2 + folga, cable['y'], 0], square(cable['x_fim'] - parede - folga * 2)))
  )

  prot = prot.translate([parede + folga, 0, 0]).setColor([1,0,0])

  outer = outer.union(prot)
  // outer = outer.setColor([0.1, 0.4, 0.6])

  middle_cylinder_hollow = cylinder({r: 4, h: conversor['z']})//.subtract(cylinder({r: 2, h:conversor['z']}))
  middle_cylinder = cylinder({r: 2 - folga, h: protusion * 2})

  middle_cylinder_hollow = middle_cylinder_hollow.translate([cable['x_ini']/2, 7, lid_height]).setColor([0.3, 0.7, 0.8])
  middle_cylinder = middle_cylinder.translate([cable['x_ini']/2, 7, lid_height]).setColor([0.3, 0.7, 0.8])
  outer = outer.subtract(middle_cylinder_hollow).union(middle_cylinder)

  return outer
}

function extra_cover() {
  size = 7
  extra_cover = cube([cable['x_ini'], size, lid_height])
  hollow = cube([cable['x_ini'] - 2 * parede, size - parede, lid_height - parede])
  hollow = hollow.translate([parede, parede, parede])

  extra_cover = extra_cover.subtract(hollow)
  return extra_cover.translate([0,-7,0])
}


function main() {
  return cable_guide_lid().union(extra_cover())

}
