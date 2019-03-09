# minimize CSS; minimize JS

import os
import re

output_file_name = "vitrine_responsiva-1.7.2.min.js"

os.system("java -jar ../tools/yuicompressor-2.4.8.jar ./style.css -o ./staging/style-min.css -v")

os.system("java -jar ../tools/closure-compiler-v20190301.jar --js ./lib/json2.js ./lib/spin.min.js ./vitrine_responsiva.js --js_output_file " + output_file_name)


os.system("mv ./" + output_file_name + " ./staging/")