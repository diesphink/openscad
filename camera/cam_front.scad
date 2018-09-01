$fn=60;

module old_front() {
  import("cam_front.STL", convexity = 5);
}

intersection() {
  old_front();
  translate([0, 1, 0])
    cube([100,30,100], center=true);
}


translate([0,22,0])
  intersection() {
    old_front();
    translate([0, -50, 0])
      cube([100,28,100], center=true);
  }
