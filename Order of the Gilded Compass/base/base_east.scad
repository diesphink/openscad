use <../../libs/plib/support_box.scad>
use <../../libs/plib/hinge.scad>

x = 0;
y = 1;
z = 2;

div = 3;

bottom_box = [110, 204, 50];
dice = [90, 37, 63];
top_box = [110, bottom_box[y] - div - dice[y], 70];
tiles = [104, 155, 15];
lid = [tiles[x], top_box[y], 6];


module box() {
  difference() {
    union() {
      cube(bottom_box);
      translate([0, bottom_box[y] - top_box[y], 0])
        cube(top_box);
    }
    translate([(bottom_box[x] - dice[x])/2, div - 0.01, 70 - dice[z]])
      cube(dice);
    translate([(top_box[x] - tiles[x])/2, bottom_box[y] - div - tiles[y], top_box[z] - tiles[z] + 0.01 - lid[z]])
      cube(tiles);
    translate([(top_box[x] - tiles[x])/2, bottom_box[y] - div - tiles[y], top_box[z] - tiles[z] + 0.01 - lid[z]])
      slope();
    translate([(top_box[x] - tiles[x])/2, bottom_box[y] - lid[y], top_box[z] - lid[z] + 0.01])
      cube(lid);
  }
  translate([0, bottom_box[y] - top_box[y] + 3, top_box[z] - lid[z] + 3]) {
    difference() {
      hinge(len=19, gap=72, n_hinges=2, r_outer=3, r_inner=1.7, offset=0, max_height=0, fn=100);
      translate([7, 0, 0])
        hinge(len=8, gap=80, n_hinges=2, r_outer=3, r_inner=0, offset=0, max_height=0, fn=100);
    }
  }
}

module slope() {
  b = tiles[y]/3;
  h = 15;
  w = tiles[x];

  rotate([90,90,90])
  linear_extrude(height = w, convexity = 10, twist = 0)
  polygon(points=[[0,0],[h,0],[0,b]], paths=[[0,1,2]]);
}



  intersection() {
    box();
  /*translate([0,0,52])
    cube([210, 500, 30]);*/
  }
