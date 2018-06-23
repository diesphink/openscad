module holder() {
	difference() {
		cube([10, 2, 10]);
			translate([5, 0, 5])
				rotate([90, 0, 0])
					cylinder(h=5, r=1.5, center=true, $fn=15);
	}
	translate([10, 0, 0])
		cube([2, 6, 10]);
	translate([12, 4, 0])
		cube([8, 2, 10]);
}

holder();