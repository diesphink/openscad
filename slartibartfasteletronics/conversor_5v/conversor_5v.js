// Conversor 5V é composto de uma parte principal, uma saída para cabos e uma saída para usb
conversor_5v = (function() {
  dim = {
    principal: {
      x: 51.5,
      y: 34,
      z: 10
    },
    folga: .2,
    parede: 1,
    altura_saidas: 4,
    cabos: {
      x0: 30,
      x1: 10,
      y: 15
    },
    tampa: {
      altura: 5,
      protusao: 1
    }
  }

  function base() {
    return principal()
      .subtract(usb_hollow())
      .subtract(cabos_hollow())
      .union(cabos())
      // .intersect(cube([40, 20, 80]).translate([20, 30, 0]))
  }

  function tampa() {
    return tampa_cabos()
      .union(tampa_cabos_extra())
      // .intersect(cube([40, 10, 80]).translate([0, 2, 0]))
  }

  function principal() {
    x = dim.principal.x + dim.folga * 2 + dim.parede * 2;
    y = dim.principal.y + dim.folga * 2 + dim.parede * 2;
    z = dim.principal.z
    shell = cube({
        center: [1, 1, 0],
        size:[x, y, z],
        radius: [1, 1, 0],
        roundradius: 0.2,
        resolution: 12
      });

    x = dim.principal.x + dim.folga * 2;
    y = dim.principal.y + dim.folga * 2;
    z = dim.principal.z * 3;
    hollow = cube({
        center: [1, 1, 0],
        size:[x, y, z],
        radius: [1, 1, 0]
      }).translate([0, 0, dim.parede]);

    return shell.subtract(hollow).translate([dim.principal.x/2, dim.principal.y/2, 0])
  }

  function usb_hollow() {
    return cube({size: [10, 16, 10]}).translate([-4, 15.5, dim.altura_saidas])
  }

  function cabos() {
    shell = linear_extrude({ height: dim.principal.z},
      hull(square([dim.cabos.x0, 5]),
      translate([(dim.cabos.x0 - dim.cabos.x1)/2, dim.cabos.y, 0], square(dim.cabos.x1)))
    )

    hollow = linear_extrude({ height: dim.principal.z},
      hull(square([dim.cabos.x0 - dim.parede * 2, 5]),
      translate([(dim.cabos.x0 - dim.cabos.x1)/2 - dim.parede/2, dim.cabos.y, 0], square(dim.cabos.x1 - dim.parede)))
    )

    hollow = hollow.union(
      cube([dim.cabos.x1 - dim.parede , 10, 50]).translate([
        (dim.cabos.x0 - dim.cabos.x1)/2 - dim.parede/2,
        dim.cabos.y,
        0])
    )

    hollow = hollow.translate([dim.parede, 0, dim.altura_saidas])

    shell = shell.subtract(hollow)

    middle_cylinder = cylinder({r: 5, h: dim.principal.z})
    .setColor([0, 1, 0])
    .subtract(cylinder({r: 1.6, h:dim.principal.z}))
    .subtract(cube({
      size:[6, 6, 2.5],
      center: [1, 1, 0],
      radius: [0.5, 0.5, 0]})
      .setColor([1, 0, 0])
      .translate([0, 0, dim.principal.z - 2.4]))


    middle_cylinder = middle_cylinder.translate([dim.cabos.x0/2, 7, 0])


    shell = shell.union(middle_cylinder)

    return shell.translate([
      (dim.principal.x + dim.parede + dim.folga) - dim.cabos.x0,
      dim.principal.y + dim.folga,
      0])
  }

  function cabos_hollow() {
    return cube([
        dim.cabos.x0 - 2 * dim.parede,
        dim.parede + 2,
        dim.principal.z])
      .translate([
        (dim.principal.x + dim.parede + dim.folga) - dim.cabos.x0 + dim.parede,
        dim.principal.y + dim.folga - 1,
        dim.altura_saidas
    ])
  }

    function tampa_cabos() {
      outer = linear_extrude({ height: dim.tampa.altura},
        hull(square([dim.cabos.x0, 5]),
        translate([(dim.cabos.x0 - dim.cabos.x1)/2, dim.cabos.y, 0], square(dim.cabos.x1)))
      )

      prot = linear_extrude({ height: dim.tampa.protusao + dim.tampa.altura},
        hull(square([dim.cabos.x0 - dim.parede * 2 - dim.folga * 2, 5]),
        translate([(dim.cabos.x0 - dim.cabos.x1)/2 - dim.parede/2 + dim.folga, dim.cabos.y, 0], square(dim.cabos.x1 - dim.parede - dim.folga * 2)))
      )

      prot = prot.translate([dim.parede + dim.folga, 0, 0])

      outer = outer.union(prot)

      middle_cylinder_hollow = cylinder({r: 1.6, h: dim.principal.z})
      .union(cylinder({r: 3, h: 3}))
      .union(cylinder({r: 5.5, h: dim.tampa.protusao * 2}).translate([0, 0, dim.tampa.altura - dim.folga]))
      // middle_cylinder = cylinder({r: 2 - dim.folga, h: dim.tampa.protusao * 2})

      middle_cylinder_hollow = middle_cylinder_hollow.translate([dim.cabos.x0/2, 7, 0])
      // middle_cylinder = middle_cylinder.translate([dim.cabos.x0/2, 7, dim.tampa.altura])
      outer = outer.subtract(middle_cylinder_hollow)//.union(middle_cylinder)

      return outer
    }

    function tampa_cabos_extra() {
      size = 7
      extra_cover = cube([dim.cabos.x0, size, dim.tampa.altura])
      hollow = cube([dim.cabos.x0 - 2 * dim.parede, size - dim.parede, dim.tampa.altura - dim.parede])
      hollow = hollow.translate([dim.parede, dim.parede, dim.parede])

      extra_cover = extra_cover.subtract(hollow)
      return extra_cover.translate([0,-7,0])
    }

  return {base, tampa, dim}

})();

function main() {
  return conversor_5v.tampa()
}
