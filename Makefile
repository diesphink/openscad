# Programas
OPENSCAD 					:= openscad
SLIC3R 						:= ~/opt/slic3r/slic3r

# Deploy Server
DEPLOY_SERVER			:= pi@192.168.0.106

# Perfis do slic3r para a impressão
# Filament: abs, pla
# Quality: detail, optimal, normal, draft
# Outros: brim, support_build_plate, support_everywhere
SLIC3R_PROFILES		:= abs normal brim
_underline				:= _
_empty						:=
_space						:= $(_empty) $(_empty)
GCODE_SUFFIX			:= $(filter-out default,$(SLIC3R_PROFILES))
GCODE_SUFFIX			:= $(subst $(_space),$(_underline),$(strip $(GCODE_SUFFIX)))
GCODE_SUFFIX			:= _$(GCODE_SUFFIX)

# Adiciona aos profiles o default (primeiro), depois os que foram definidos pelo usuário
# E por fim, adiciona qualquer combinação de 2 profiles que exista (e.g. pla_draft)
SLIC3R_PROFILES		:= default $(SLIC3R_PROFILES) \
									$(foreach p1,$(SLIC3R_PROFILES), $(foreach p2,$(SLIC3R_PROFILES),$(if $(wildcard ../slic3r_profiles/$(p1)_$(p2).ini),$(p1)_$(p2))))

# Os arquivos relevantes (compilar ou dependências)
SCADS 						:= $(wildcard *.scad)
STLS 							:= $(SCADS:%.scad=stl/%.stl)
GCODES 						:= $(SCADS:%.scad=output/%$(GCODE_SUFFIX).gcode)
PROFILES					:= $(SLIC3R_PROFILES:%=../slic3r_profiles/%.ini)

# Cores
BOLD 							:= \033[0;1m
GCODE	  					:= \033[1;42;32m
STL		 		 				:= \033[1;44;36m
RSYNC			 				:= \033[1;45;35m
NO_COLOR  			  := \033[m

# Processa a saída para remover textos desnecessários
PROCESS_OUTPUT := grep -v '=>' | grep -v 'Could not initialize localization.' | sed 's/^/        /'

# Garante que os STLS gerados não serão removidos
.SECONDARY: $(STLS)

all: $(GCODES)

# Inclui as dependências geradas pelo openscad
include $(wildcard .deps/*.deps)

output/%$(GCODE_SUFFIX).gcode: stl/%.stl $(PROFILES)
	@# Cria os diretórios se não existirem
	@if [ ! -d output ]; then mkdir output; fi
	@if [ ! -d .deps ]; then mkdir .deps; fi

	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(GCODE) GCODE $(BOLD) $(@)$(NO_COLOR)\n";
	@$(SLIC3R) $< \
		$(foreach profile,$(SLIC3R_PROFILES), --load ../slic3r_profiles/$(profile).ini) \
		--print-center 125,105 \
		--output $@ 2>&1 | $(call PROCESS_OUTPUT)

stl/%.stl: %.scad
	@# Cria os diretórios se não existirem
	@if [ ! -d stl ]; then mkdir stl; fi
	@# Gera os arqivos stl (e deps)
	@printf "%b" "$(BOLD)$(STL) STL   $(BOLD) $(@)$(NO_COLOR)\n";
	@$(OPENSCAD) -m make -o $@ -d $(@:stl/%=.deps/%).deps $< 2>&1 | $(call PROCESS_OUTPUT)

deploy: all
	@printf "%b" "$(BOLD)$(RSYNC) RSYNC $(BOLD) $(DEPLOY_DIR) on $(DEPLOY_SERVER)$(NO_COLOR)\n";
	@rsync -azhe ssh --partial --progress output/*.gcode $(DEPLOY_SERVER):.octoprint/uploads/$(DEPLOY_DIR) | $(call PROCESS_OUTPUT)

%.ini:
	$(error Profile $@ not found)

clean:
	@rm -rf output
	@rm -rf .deps
	@rm -rf stl
