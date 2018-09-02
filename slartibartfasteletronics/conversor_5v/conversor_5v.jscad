include('common.js')

function conversor_shell() {
  return conversor_outer().subtract(conversor_hollow())
  .translate([conversor['x']/2, conversor['y']/2, 0])
}

function conversor_hollow() {
  x = conversor['x'] + folga * 2;
  y = conversor['y'] + folga * 2;
  z = conversor['z'] * 3;
  return cube({
      center: [1, 1, 0],
      size:[x, y, z],
      radius: [1, 1, 0]
    }).translate([0, 0, parede]);
}

function conversor_outer() {
  x = conversor['x'] + folga * 2 + parede * 2;
  y = conversor['y'] + folga * 2 + parede * 2;
  z = conversor['z']
  return cube({
      center: [1, 1, 0],
      size:[x, y, z],
      radius: [1, 1, 0],
      roundradius: 0.2,
      resolution: 12
    });
}


function usb_hollow() {
  return cube({size: [10, 16, 10]}).translate([-4, 15.5, base_z])
}

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

  middle_cylinder = cylinder({r: 3, h: conversor['z']}).subtract(cylinder({r: 2, h:conversor['z']}))

  middle_cylinder = middle_cylinder.translate([cable['x_ini']/2, 7, 0])
  shell = shell.union(middle_cylinder)

  return shell.translate([
    (conversor['x'] + parede + folga) - cable['x_ini'],
    conversor['y'] + folga,
    0])
}

function cable_hollow() {
  return cube([cable['x_ini'] - 2 * parede, parede + 2, conversor['z']]).translate([
    (conversor['x'] + parede + folga) - cable['x_ini'] + parede,
    conversor['y'] + folga - 1,
    base_z
  ])
}

function main() {
  // return cable_guide()
  return conversor_shell().subtract(usb_hollow()).subtract(cable_hollow()).union(cable_guide())
}
