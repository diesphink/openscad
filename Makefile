# Programas
OPENSCAD 					:= openscad
SLIC3R 						:= ~/opt/slic3r/slic3r

# Perfis do slic3r para a impressão
SLIC3R_PROFILES		:= abs
_underline				:= _
_empty						:=
_space						:= $(_empty) $(_empty)
GCODE_SUFFIX			:= _$(subst $(_space),$(_underline),$(strip $(SLIC3R_PROFILES)))

# Os arquivos para compilar
SCADS 						:= $(wildcard *.scad)
STLS 							:= $(SCADS:%.scad=stl/%.stl)
GCODES 						:= $(SCADS:%.scad=output/%$(GCODE_SUFFIX).gcode)

# Cores
BOLD 							:= \033[0;1m
GCODE	  					:= \033[1;42;32m
STL		 		 				:= \033[1;44;36m
NO_COLOR  			  := \033[m

# Processa a saída para remover textos desnecessários
PROCESS_OUTPUT := grep -v '=>' | grep -v 'Could not initialize localization.' | sed 's/^/        /'

# Garante que os STLS gerados não serão removidos
.SECONDARY: $(STLS)

all: $(GCODES)

# Inclui as dependências geradas pelo openscad
include $(wildcard .deps/*.deps)

output/%$(GCODE_SUFFIX).gcode: stl/%.stl
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(GCODE) GCODE $(BOLD) $(@)$(NO_COLOR)\n";
	@$(SLIC3R) $< \
		$(foreach profile,$(SLIC3R_PROFILES), --load ../slic3r_profiles/$(profile).ini) \
		--output $@ 2>&1 | $(call PROCESS_OUTPUT)

stl/%.stl: %.scad
	@# Cria os diretórios se não existirem
	@if [ ! -d output ]; then mkdir output; fi
	@if [ ! -d .deps ]; then mkdir .deps; fi
	@if [ ! -d stl ]; then mkdir stl; fi
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(STL) STL   $(BOLD) $(@)$(NO_COLOR)\n";
	@$(OPENSCAD) -m make -o $@ -d $(@:stl/%=.deps/%).deps $< 2>&1 | $(call PROCESS_OUTPUT)

clean:
	@rm -rf output
	@rm -rf .deps
	@rm -rf stl
