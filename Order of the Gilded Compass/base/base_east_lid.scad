use <../../libs/plib/support_box.scad>
use <../../libs/plib/hinge.scad>
use <logo.scad>
altura_caixa = 72;

x = 0;
y = 1;
z = 2;

div = 3;

bottom_box = [110, 204, 50];
dice = [90, 37, 63];
top_box = [110, bottom_box[y] - div - dice[y], 70];
tiles = [104, 155, 15];
lid = [tiles[x]-2, top_box[y], 6];

module lid() {
  color([0.56, 0.69,0.74, 1])
    difference() {
      cube(lid);
      cube([lid[x], lid[z]+1, lid[z]]);
      /*translate ([lid[x]/2, lid[y]/2, 5]) poly_marrom3(6, min_line_mm(1.0), 100.0);*/
      /*translate ([lid[x]/2, lid[y]/2, 5]) poly_azul(1, min_line_mm(1.0), 100.0);*/
    }
    translate([3.5, lid[z]/2, lid[z]/2])
        rotate([90, 0, 0])
            hinge(len=7, gap=81, n_hinges=2, r_outer=3, r_inner=1.8, offset=0, max_height=0, fn=100);
}

module flip_cyl(x, r) {
  translate([0, r, r])
    rotate([0, 90, 0])
      cylinder(h=x, r=r, $fn=150);
}

intersection() {
  lid();
  /*cube([140, 10, 10]);*/
}

module logo(h)
{
  union()
  {
    translate ([0,0,0]) poly_azul(h, min_line_mm(1.0), 100.0);
    translate ([0,0,0]) poly_marrom3(h, min_line_mm(1.0), 100.0);
    translate ([0,0,0]) poly_marrom2(h, min_line_mm(1.0), 100.0);
    translate ([0,0,0]) poly_marrom1(h, min_line_mm(1.0), 100.0);
    translate ([0,0,0]) poly_marromescuro(h, min_line_mm(1.0), 100.0);
  }
}

/*logo(5);*/
