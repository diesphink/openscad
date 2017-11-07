include <lib/common.scad>;

base_x = 104;
base_y = 37;
base_z = 42;

folga = 1;

current_y = 6;

module token_holder_slot(x = 100, y = 10, z = 40) {

  x = x + folga;
  y = y + folga + 1; //1 from the lettering
  z = z + 1; // 1 from lettering

  translate([(base_x - x)/2, current_y, base_z - z])
    cube([x, y, z + 0.01]);
  translate([base_x/2, current_y + y/2, base_z])
    sphere(r=(y/2) + 5);
}

difference() {
  cube([base_x, base_y, base_z]);
  token_holder_slot(100, 23, 40);
}
