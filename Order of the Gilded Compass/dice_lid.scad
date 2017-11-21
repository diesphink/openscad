include <lib/common.scad>;
include <lib/hexgrid.scad>;

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
    comprimento = die * 4 + parede * 5;
    union() {
      translate([-0.01, parede * 3, 0])
        cube([comprimento, die * 2 + parede, altura_ranhura  * 0.8]);

      translate([comprimento, 0, 0]) {
        translate([0, profundidade_ranhura + largura_parede_ranhura + 0.01, 0])
        rotate([90,0,0]) rotate([0,0,90])
          prism(comprimento, altura_ranhura * 0.8, profundidade_ranhura * 0.8);

        translate([0, die * 2 + parede * 7 - largura_parede_ranhura - profundidade_ranhura - 0.01, 0])
        rotate([0,0,90])
          prism(comprimento, altura_ranhura * 0.8, profundidade_ranhura * 0.8);
      }
    }
}

module hole() {
    cube([100, die * 2 + parede, die - 6]);
}

lid();
