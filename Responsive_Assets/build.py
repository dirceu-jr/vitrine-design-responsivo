# minimize CSS -> grue it into JS -> minimize JS

import os
import re

REMOVE_WS = re.compile(r"\s{2,}").sub
output_file_name = "vitrine_responsiva-1.5.5.min.js"

os.system("java -jar ~/Novos\ Arquivos/Projetos/Coora/tools/yuicompressor-2.4.8.jar ./style.css -o style-min.css -v")

script_file = open(os.path.join(os.path.dirname(__file__), './vitrine_responsiva.js'), 'r')
script = script_file.read().decode("utf8")

style_file = open(os.path.join(os.path.dirname(__file__), './style-min.css'), 'r')
style = style_file.read().decode("utf8")
style_file.close()
style = REMOVE_WS("", style)
style = style.replace("\n", "")
style = style.replace("\"", "'")

script = script.replace('THE_CSS_REPLACE', style)

to_min_script = open(os.path.join(os.path.dirname(__file__), './vitrine_responsiva_replaced.js'), 'w')

to_min_script.write(script.encode('UTF-8'))
to_min_script.close()

os.system("java -jar ~/Novos\ Arquivos/Projetos/Coora/tools/compiler-latest/closure-compiler-v20170521.jar --js ./lib/json2.js ./lib/spin.js ./vitrine_responsiva_replaced.js --js_output_file " + output_file_name)

os.system("rm ./vitrine_responsiva_replaced.js")
os.system("rm ./style-min.css")

os.system("mv ./" + output_file_name + " ./staging/")
