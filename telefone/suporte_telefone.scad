/*module pin() {
  union() {
    cylinder(h=2, d1=9, d2=9);
    translate([0,0,1.99])
      cylinder(h=1.01, d1=9, d2=5.8);
    translate([0,0,2.99])
      cylinder(h=2.01, d1=5.8, d2=5.8);
    translate([0,0,4.99])
      cylinder(h=1.01, d1=5.8, d2=9);
  }
}

translate([4.5,-6,4.5])
  rotate([270,0,0])
    pin();
cube([9,2,9]);*/

module corner() {
  difference() {
    cube([5.8, 3, 4]);

    translate([-0.1, 1.5, 0])
      rotate([0, 90, 0])
        scale([2/5, 1.5/5, 1])
          cylinder(h=6, r1=5, r2=5);
  }
}

cube([29, 2, 9]);
translate([29, -22, 0])
  cube([2, 24, 9]);
translate([19, -22, 0])
  cube([10, 2, 9]);

translate([0, 5, 0])
  cube([5.8, 3, 9]);

translate([0, 2, 3])
  cube([5.8, 3, 4]);

translate([0, 2, 1])
  corner();
