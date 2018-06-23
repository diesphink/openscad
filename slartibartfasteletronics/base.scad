
box_x = 200;
box_y = 140;
box_z = 40;

module box() {
  translate([box_x / 2, box_y / 2, box_z / 2])
    difference() {
      cube([box_x, box_y, box_z], center=true);
      translate([0, 0, 2])
        cube([box_x - 4, box_y - 4, box_z], center=true);
    }
}

module switch() {
  x = 14;
  y = 9;
  translate([box_x / 2, box_y / 2, box_z / 2])
  difference() {
    cube([x + 2, y + 2, box_z], center=true);
    translate([0, 0, 10]) {
      cube([x, y, box_z + 1], center=true);
      translate([2,0,0])
        cube([x, y - 4, box_z + 1], center=true);
    }
  }
}

plug_x = 16;
plug_y = 32;
plug_z = 11;
module plug() {
  difference() {
    cube([plug_x, plug_y, plug_z-0.01], center=true);
    // temporário
    translate([0, 15, 2])
      cube([8.01, 2.01, plug_z], center=true);
    translate([0, 10.5, 2])
      cube([10.01, 7.01, plug_z], center=true);
    translate([0, -4, 1])
      cube([14.01, 22.01, plug_z], center=true);
    translate([0, -15, 1])
      cube([11.01, 2.01, plug_z], center=true);
  }
}

switch_board_x = 15;
switch_board_y = 20;
switch_board_z = 3;
module switch_board() {
  difference() {
    cube([switch_board_x, switch_board_y, switch_board_z]);
    translate([0, 13, -0.01]) {
      translate([2, 0, 0])
        cube([1, 5, switch_board_z + 0.02]);
      translate([7, 0, 0])
        cube([1, 5, switch_board_z + 0.02]);
    }
    translate([0, 6, -0.01]) {
      translate([4, 0, 0])
        cube([1, 1, switch_board_z + 0.02]);
      translate([9, 0, 0])
        cube([1, 1, switch_board_z + 0.02]);
      translate([2, -3, 1])
        cube([11, 8, switch_board_z + 0.02]);
      translate([1.51, 3, 1])
          cube([0.5, 1, 12]);
    }

  }
}
/*box();
translate([0,110,0]) {
  translate([33, 0, 0])
    switch();
  translate([66, 0, 0])
    switch();
  translate([110, 0, 0])
    switch();
  translate([140, 0, 0])
    switch();
  translate([170, 0, 0])
    switch();
}
translate([33, 105, (box_z - plug_z) / 2])
  plug();*/

/*plug();*/
switch_board();
