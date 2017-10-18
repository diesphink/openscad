# Programas
OPENSCAD = openscad
SLIC3R = ~/opt/slic3r/slic3r

# Os arquivos para compilar
SCADS = $(wildcard *.scad)
STLS = $(SCADS:%.scad=stl/%.stl)
GCODES = $(SCADS:%.scad=output/%.gcode)

# Cores
BOLD 				= \033[0;1m
GCODE	  		= \033[1;42;32m
STL		 		 	= \033[1;44;36m
NO_COLOR    = \033[m

PROCESS_OUTPUT = grep -v '=>' | grep -v 'Could not initialize localization.' | sed 's/^/        /'

.SECONDARY: $(STLS)

all: $(GCODES)

# Inclui as dependências geradas pelo openscad
include $(wildcard .deps/*.deps)

output/%.gcode: stl/%.stl
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(GCODE) GCODE $(BOLD) $(@)$(NO_COLOR)\n";
	@$(SLIC3R) $< --output $@ 2>&1 | $(call PROCESS_OUTPUT)

stl/%.stl: %.scad
	@# Cria os diretórios se não existirem
	@if [ ! -d output ]; then mkdir output; fi
	@if [ ! -d .deps ]; then mkdir .deps; fi
	@if [ ! -d stl ]; then mkdir stl; fi
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(STL) STL   $(BOLD) $(@)$(NO_COLOR)\n";
	@$(OPENSCAD) -m make -o $@ -d $(@:stl/%=.deps/%).deps $< 2>&1 | $(call PROCESS_OUTPUT)

clean:
	rm -rf output
	rm -rf .deps
	rm -rf stl
