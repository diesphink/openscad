use <MCAD/boxes.scad>
include <lib/2LBottleHolder.scad>;


module moat() {
  color([0.1,0.5,0.2]) 
  translate([0,0,4])
  difference() {
    translate([0, 0, -1])
      roundedBox([140, 90, 6], 5, true);
    roundedBox([138, 88, 6], 5, true);
  }
}

module waterfiller() {
  color([0.5, 0.1, 0.2])
  difference() {
    cylinder(d=32, h=12);
    translate([0,0,3])
      bottleNeck();
  }
}

module bowl() {
  color([0.1, 0.2, 0.5])
  translate([0, 0, 6.001])
  difference() {
    roundedBox([130, 80, 12], 5, true);
    roundedBox([128, 78, 13], 5, true);
  }
}

module gap() {
  color([0.9, 0.9, 0.2])
  cube([5, 5, 2]);
}


difference() {
  union() {
    moat();
    bowl();
    translate([-84, 29, 0])
      waterfiller();
  }
  translate([-72, 26.5, 2.51])
    gap();
}
