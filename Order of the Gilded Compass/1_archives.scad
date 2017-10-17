include <lib/common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	x = 90;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 68;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);

		tile_y = 60;
		tile_x = 30;

		// Tile 1
		translate([largura_parede, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_y1 = true);

		// Tile 2
		translate([x - largura_parede - tile_x - folga, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_y2 = true);

		// Tampa
		tampa_x(z = z, y = y);

	}

	// Texto
	label_x1(texto = texto, z = z, x = x);
}

duplo_grande(tiles = 13, texto = "Archives");
