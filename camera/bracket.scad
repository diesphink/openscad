include <cyl_head_bolt.SCAD>;

$fn=60;

dim = [22.3, 76.6, 6];
x = 0;
y = 1;
z = 2;


mirror([1,0,0]) {
  difference() {
    intersection() {
      translate([-106.6,-66.7,0])
        import("MK2CameraKitBracket.STL", convexity = 5);
      translate([-10,0,0])
        cube([100, 100, 5.9]);
    }


    padding = dim[x]/2;
    translate([padding, dim[y] - padding, -0.01])
      rotate([180, 0, 0])
        hole_through("M3", h=3);
  }
}

/*difference() {
	translate([-15, -15, 0]) cube([80, 30, 50]);
	rotate([180,0,0]) nutcatch_parallel("M5", l=5);
	translate([0, 0, 50]) hole_through(name="M5", l=50+5, cl=0.1, h=10, hcl=0.4);
	translate([55, 0, 9]) nutcatch_sidecut("M8", l=100, clk=0.1, clh=0.1, clsl=0.1);
	translate([55, 0, 50]) hole_through(name="M8", l=50+5, cl=0.1, h=10, hcl=0.4);
	translate([27.5, 0, 50]) hole_threaded(name="M5", l=60);
}



// == example nuts and screws ==

$fn=60;
translate([0,50, 0]) stainless() screw("M20x100", thread="modeled");
translate([0,50,-120]) stainless() nut("M20", thread="modeled");

translate([30,50,0]) screw("M12x60");
translate([30,50,-80]) nut("M12");

translate([50,50,0]) screw("M5x20");
translate([50,50,-30]) nut("M5");*/
