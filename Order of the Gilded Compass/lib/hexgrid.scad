// made by ggrieves
// www.thingiverse.com/thing:1296149
// Creative Commons - Attribution

// Altered by valba
// https://www.thingiverse.com/thing:1296149#comment-939790

module hexagonal_grid(box, holediameter, wallthickness){
    difference(){
        cube(box, center = true);
        hexgrid(box, holediameter, wallthickness + 0.001);
    }
}

module hex_hole(hexdiameter, height){
        translate([0, 0, 0]) rotate([0, 0, 0]) cylinder(d = hexdiameter, h = height + 0.001, center = true, $fn = 6);
}

module hexgrid(box, hexagon_diameter, hexagon_thickness) {
    a = (hexagon_diameter + hexagon_thickness)*sin(60);
    cos60 = cos(60);
    sin60 = sin(60);
    moduloX = (box[0] % hexagon_diameter);
    numX = (box[0] - moduloX) / hexagon_diameter;
    moduloY = (box[1] % hexagon_diameter);
    numY = (box[1] - moduloY) / hexagon_diameter;
    x0 = (numX + 2) * (hexagon_diameter + hexagon_thickness)/2;
    y0 = (numY + 2) * (hexagon_diameter + hexagon_thickness)*sqrt(3)/2/2;

    for(x = [-x0: 2*a*sin60: x0]) {
        for(y = [-y0 : a: y0]) {
            translate([x, y, 0]) hex_hole(hexdiameter = hexagon_diameter, height = box[2]);
           translate([x + a*sin60, y + a*cos60 , 0]) hex_hole(hexdiameter = hexagon_diameter, height = box[2]);
        }
    }
}

// first arg is vector that defines the bounding box, length, width, height
// second arg in the 'diameter' of the holes. In OpenScad, this refers to the corner-to-corner diameter, not flat-to-flat
// this diameter is 2/sqrt(3) times larger than flat to flat
// third arg is wall thickness.  This also is measured that the corners, not the flats.

// hexagonal_grid([5, 5, 0.5], 1, 0.2);
