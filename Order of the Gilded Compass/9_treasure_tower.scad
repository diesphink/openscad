include <lib/common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	folga = 0.5;
	x = 100;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 40;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);

		tile_y = 30;
		tile_x = 30;

		// Tile 1
		translate([largura_parede, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y1 = false);

		// Tile 2
		translate([(x - tile_x - 2)/2, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y1 = false, pegador_y2 = false);

		// Tile 3
		translate([x - largura_parede - tile_x - 2, (y - tile_y - folga) / 2, 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y2 = false);

		// Tampa
		tampa_x(z = z, y = y);

	}

	// Texto
	label_x1(texto = texto, z = z, x = x);
}

duplo_grande(tiles = 12, texto = "Treasure Tower");
