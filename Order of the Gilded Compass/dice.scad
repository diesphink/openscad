include <lib/common.scad>;

die = 14.5;
parede = 1;
largura_parede_ranhura = 1.5;

module die() {
  cube(die + 0.01);
}

module base() {
  cube([die * 4  + parede * 5, die * 2 + parede * 7, die + parede + altura_ranhura]);
}

module inner() {
  cube([die * 4  + parede * 3, die * 2 + parede * 1 , die]);
}

module lid() {
  // Posiciona o z
  translate([0, 0, die + parede]) {
    translate([-0.01, parede * 3, 0])
      cube([100, die * 2 + parede, altura_ranhura + 0.01]);

    translate([100, 0, 0]) {
      translate([0, profundidade_ranhura + largura_parede_ranhura + 0.01, 0])
      rotate([90,0,0]) rotate([0,0,90])
        prism(120, altura_ranhura, profundidade_ranhura);

      translate([0, die * 2 + parede * 7 - largura_parede_ranhura - profundidade_ranhura - 0.01, 0])
      rotate([0,0,90])
        prism(120, altura_ranhura, profundidade_ranhura);
    }
  }
}

module hole() {
  rotate([0,90,0])
    cylinder(100, 5, 5, false);
}

difference() {
  base();
  union() {
    lid();

    translate([parede, parede * 3, parede])
    for (dx = [0:3])
      for (dy = [0:1])
        translate([dx * (die + parede), dy * (die + parede), 0])
          die();

    translate([parede, parede * 3, 4])
      inner();

    translate([-0.01, (die * 2 + parede * 7) / 2, (parede + die + altura_ranhura) / 2])
      hole();
  }
}
