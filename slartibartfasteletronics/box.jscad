include('conversor_5v/conversor_5v.js')
include('conversor_12v/conversor_12v.jscad')
include('led_driver/led_driver.jscad')
include('relay_4ch/relay_4ch.js')
include('wago222/wago222.jscad')
include('powerplug/powerplug.jscad')
include('plug_12v/plug_12v.jscad')
include('plug_12v_led/plug_12v_led.jscad')
include('plug_110v/plug_110v.jscad')
include('wall_mount/wall_mount.js')

var dim = {
  x: 210,
  y: 120,
  z: 30,
  folga: 0.2,
  parede: 1.2,
  screw_r: 1.6,
  gap_screw_shell: 3.4, // distância da parede ao centro do screw
  gap_screw_lid: 2 // distancia da base do screw para o fim da altura da base
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

function screw_hole(pos) {



  // return cylinder({r: 1.6 + dim.parede, h: dim.altura_pcb, center: [true, true, false]})
  var screw_hole = cube({
      size:[16, 16, dim.z - dim.gap_screw_lid],
      fn: 16, //32,
      // center:[1, 1, 0],
      radius: [dim.screw_r + dim.parede, dim.screw_r + dim.parede, 0]})
    .intersect(cube({
        size: [
          dim.screw_r + dim.parede + dim.folga + dim.gap_screw_shell,
          dim.screw_r + dim.parede + dim.folga + dim.gap_screw_shell,
          dim.z],
        radius: [1 ,1, 0]}))
    .translate([-dim.parede - dim.screw_r, -dim.parede - dim.screw_r , 0])
    .subtract(cylinder({r: dim.screw_r, h: dim.z, center: [true, true, false]}))
    .setColor([1,0,0])

    if (pos != null) {
      if (pos.indexOf("S") != -1) {
        screw_hole = screw_hole.mirroredY()
        .translate([0, -dim.y/2 + dim.gap_screw_shell, 0])
      } else {
        screw_hole = screw_hole.translate([0, dim.y/2 - dim.gap_screw_shell, 0])
      }
      if (pos.indexOf("W") != -1) {
        screw_hole = screw_hole.mirroredX()
        .translate([-dim.x/2 + dim.gap_screw_shell, 0, 0])
      } else {
        screw_hole = screw_hole.translate([dim.x/2 - dim.gap_screw_shell, 0, 0])
      }
    }
    return screw_hole
}

function screw_tab() {
  var screw_tab = cube({
    size:[10, 10, 1],
    fn: 16,
    radius: [2, 2, 0],
    center: [1, 1, 0]
  })
  .subtract(cylinder({r: dim.screw_r, h: dim.z, center: [true, true, false]}))
  .translate([5, -5, 0])
  .setColor([1,0,0])

  return screw_tab;
}

main = function() {
  var c5v = conversor_5v.base()
    .rotateZ(180)
    .translate([-dim.x/2 + conversor_5v.dim.principal.x + dim.parede - 0.2, 59.1, 0])
    .setColor([0.2, 0.4, 0.6])

  var w2 = wago222.base()
    .setColor([0.2, 0.4, 0.6])
    .translate([0, -62.4, 0])
    .rotateX(270)
    .translate([-40, -60.25, 0])

  var r4c = relay_4ch.base()
    .rotateZ(180)
    // .union(cube({
    //   size: [
    //     relay_4ch.dim.x + (relay_4ch.dim.parede + relay_4ch.dim.folga) * 2,
    //     6,
    //     relay_4ch.dim.z],
    //   center: [1, 0, 0]
    // }).translate([0, relay_4ch.dim.y/2 + dim.folga * 2, 0]))
    .translate([
      7,//-dim.x/2 + relay_4ch.dim.y/2 + dim.parede + dim.folga - 0.2,
      dim.y/2 - relay_4ch.dim.y/2 - dim.parede - dim.folga + 0.2,// - 5,
      0])
    .setColor([0.2, 0.4, 0.6])

  var c12v = conversor_12v.base()
    .rotateZ(180)
    .translate([98.5, 59.1, 0])
    .setColor([0.2, 0.4, 0.6])

  var ld = led_driver.base()
    .setColor([0.2, 0.4, 0.6])
    .translate([
      47,
      -(dim.y - led_driver.dim.y)/2 + 1.1,
      dim.parede])

    var pptranslate = [-dim.x/2 - dim.parede - dim.folga, -20, 0]
    var pp = powerplug.base().translate(pptranslate).setColor([0.2, 0.4, 0.6])
    var pph = powerplug.hollow().translate(pptranslate).setColor([0.2, 0.4, 0.6])

    var p12vtranslate = [dim.x/2 - plug_12v.dim.x + dim.parede + dim.folga,
                        9,
                        0]
                        // dim.z - plug_12v.dim.z -dim.parede - dim.folga]
    var p12v = plug_12v.base().translate(p12vtranslate).setColor([0.2, 0.4, 0.6])
    var p12vh = plug_12v.hollow().translate(p12vtranslate).setColor([0.2, 0.4, 0.6])

    var p12vltranslate = [dim.x/2 - plug_12v_led.dim.x + dim.parede + dim.folga,
                        -12.5,
                        0]
    var p12vl = plug_12v_led.base().translate(p12vltranslate).setColor([0.2, 0.4, 0.6])
    var p12vlh = plug_12v_led.hollow().translate(p12vltranslate).setColor([0.2, 0.4, 0.6])

    var p100vtranslate = [-27, -dim.y/2 - dim.parede - dim.folga, 0]
    var p100v = plug_110v.base().rotateZ(90).translate(p100vtranslate).setColor([0.2, 0.4, 0.6])
    var p100vh = plug_110v.hollow().rotateZ(90).translate(p100vtranslate).setColor([0.2, 0.4, 0.6])

    var wmtranslate = [47, 0, 0]
    var wm = wall_mount.base().rotateZ(270).translate(wmtranslate).setColor([0.2, 0.4, 0.6])
    var wmh = wall_mount.hollow().rotateZ(270).translate(wmtranslate).setColor([0.2, 0.4, 0.6])

    var sc1 = screw_hole('SW');
    var sc2 = screw_hole('SE');
    var sc3 = screw_hole('NE');

    var st1 = screw_tab().translate([dim.x/2, dim.y/4, 0]);
    var st2 = screw_tab().translate([dim.x/2, -dim.y/4, 0]);
    var st3 = screw_tab().translate([0, -dim.y/2, 0]);

  return shell().setColor([0.6, 0.6, 0.6])
  .union(c5v)
  .union(w2)
  .union(r4c)
  .union(c12v)
  .union(ld)
  .union(pp)
  .subtract(pph)
  .union(p12v)
  .subtract(p12vh)
  .union(p12vl)
  .subtract(p12vlh)
  .union(p100v)
  .subtract(p100vh)
  .union(sc1)
  .union(sc2)
  .union(sc3)
  .union(st1)
  .union(st2)
  .union(st3)
  // .union(wm)
  // .subtract(wmh)


}
