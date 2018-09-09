include('conversor_5v/conversor_5v.js')
include('conversor_12v/conversor_12v.jscad')
include('led_driver/led_driver.jscad')
include('relay_4ch/relay_4ch.js')
include('wago222/wago222.jscad')

var dim = {
  x: 200,
  y: 120,
  z: 10,
  folga: 0.2,
  parede: 1.2
}


function shell() {
  var shell = cube({
    size: [
      dim.x + (dim.parede + dim.folga) * 2,
      dim.y + (dim.parede + dim.folga) * 2,
      dim.z],
    center: [1, 1, 0],
    radius: [3 + dim.parede, 3 + dim.parede, 0],
    fn: 16
  })

  hollow = cube({
    size: [
      dim.x + (dim.folga) * 2,
      dim.y + (dim.folga) * 2,
      dim.z + 0.2],
    center: [1, 1, 0],
    radius: [3, 3, 0],
    fn: 16
  }).translate([0, 0, dim.parede])
    return shell.subtract(hollow)
}

main = function() {
  var c5v = conversor_5v.base()
  .rotateZ(180)
  .translate([-47.6, 59.1, 0])

  var w2 = wago222.base()
    .setColor([0, 1, 0])
    .translate([0, -62.4, 0])
    .rotateX(270)
    .translate([-30, -60.25, 0])

  var r4c = relay_4ch.base()
    .setColor([0, 0, 1])
    .rotateZ(180)
    .translate([
      7,//-dim.x/2 + relay_4ch.dim.y/2 + dim.parede + dim.folga - 0.2,
      dim.y/2 - relay_4ch.dim.y/2 - dim.parede - dim.folga + 0.2,
      0])

  var c12v = conversor_12v.base()
    .rotateZ(180)
    .translate([99.1, 59.1, 0])

  var ld = led_driver.base()
    .setColor([0.4, 0.9, 0.7])
    .translate([
      40,
      -(dim.y - led_driver.dim.y)/2 + 1.1,
      dim.parede])


  return shell().setColor([0.4, 0.4, 0.4, 0.7])
  .union(c5v)
  .union(w2)
  .union(r4c)
  .union(c12v)
  .union(ld)
}
