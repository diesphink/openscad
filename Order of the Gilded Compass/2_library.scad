include <lib/common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	x = 100;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 68;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);


		// Tile 1
		translate([2, 2, 0])
		tile_slot(x = x - 6, y = y - 6);

		// Tampa
		tampa_x(z = z, y = y);

	}

	// Texto
	label_x1(texto = texto, z = z, x = x);
}

duplo_grande(tiles = 8, texto = "Library");
