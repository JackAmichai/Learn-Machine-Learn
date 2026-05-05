# To safely delete multiple lines, we can sort them descending and use sed
lines="171 205 291 292 362 392 451 505 560 866 1029 1277 2080 2214 2893 2941 2994 3065 3190 3326 4464 4536 4682 4759"
sorted_lines=$(echo $lines | tr ' ' '\n' | sort -nr)
for l in $sorted_lines; do
  sed -i "${l}d" src/engine/mathContent.js
done
