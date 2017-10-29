include <lib/common.scad>;

module duplo_grande(tiles = 12, texto = "Hidden Temple")
{
	x = 100;
	z = (altura_base) + (tiles * altura_tile) + folga + (altura_ranhura);
	y = 58;
	echo(str("[Z] Altura do box: ", z));
	echo(str("[Y] Profundidade do box: ", y));
	difference() {
		// Base
		cube([x, y, z]);

		tile_y = 30;
		tile_x = 30;

		// Tile 1
		translate([largura_parede, (y - tile_y - largura_parede - 5.5/* folga */ ), 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y1 = false);

		// Tile 2
		translate([(x - tile_x - 2)/2, (y - tile_y - largura_parede - 5.5/* folga */ ), 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y1 = false, pegador_y2 = false);

		// Tile 3
		translate([x - largura_parede - tile_x - 2, (y - tile_y - largura_parede - 5.5/* folga */ ), 0])
		tile_slot(x = tile_x, y = tile_y, pegador_x2 = true, pegador_y2 = false);

		// Tiles sobre tudo
		translate([(x - 70) / 2, (y - 45) / 2, altura_base + 12 * altura_tile])
		tile_slot(x = 70, y = 45);

		// Tampa
		tampa_x(z = z, y = y);

	}

	// Texto
	label_x1(texto = texto, z = z, x = x);
}

duplo_grande(tiles = 18, texto = "Auction House");
