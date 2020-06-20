# Modelagem 3D (openscad e openjscad)

Miscelânea de arquivos de modelagem 3D. Pontos interessantes:

## Build

Baseado no doit-py, executa as seguintes funções apenas para arquivos que tiveram modificação, ou suas dependências (scad usa arquivo .deps, jscad verifica includes):

 - Converte arquivos `scad` em `stl` usando `openscad`
 - Converte arquivos `jscad` em `stl` usando `openjscad`
 - Converte arquivos `stl` em `gcode` usando `prusa-slicer`

    Para a conversão de stl para gcode, ele permite utilizar arquivos de perfis (em profiles), criar arquivos específicos no diretório (slic3r.properties) ou para cada arquivo (arquivo.slic3r.properties)

    `m600`: propriedade que pode ser adicionada aos profiles, indica os pontos do gcode em que deve ser adicionado um comando m600, de pausa (processamento feito pelo `post_process.py`).

 - Deploy para um octopi server usando `rsync`

## Libs

Algumas libs interessantes para uso, em openjscad:
 - **align.js**: Permite alinhar um objeto a uma referência com base em início, centro e fim, em qualquer dos 3 eixos.
 - **distribute**: Distribui um array de objetos em um determinado eixo, equidistando começos, centros, fins ou espaço entre objetos.
 - **splits.js**: Permite fazer cortes em objetos, retornando cada parte dentro de um array.
