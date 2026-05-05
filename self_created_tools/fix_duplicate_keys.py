import re

file_path = 'src/engine/mathContent.js'

with open(file_path, 'r') as f:
    lines = f.readlines()

# Track which keys we've seen in the current object
in_object = False
current_keys = set()
obj_start_regex = re.compile(r'^\s*"[^"]+":\s*\{\s*$')
key_regex = re.compile(r'^\s*([a-zA-Z0-9_]+)\s*:')

out_lines = []
for i, line in enumerate(lines):
    if obj_start_regex.match(line):
        in_object = True
        current_keys = set()
        out_lines.append(line)
        continue

    if in_object and line.strip() == '},':
        in_object = False
        out_lines.append(line)
        continue

    if in_object:
        m = key_regex.match(line)
        if m:
            key = m.group(1)
            if key in current_keys:
                print(f"Skipping duplicate key '{key}' on line {i+1}")
                continue # Skip this duplicate line
            else:
                current_keys.add(key)

    out_lines.append(line)

with open(file_path, 'w') as f:
    f.writelines(out_lines)
print("Done fixing duplicates.")
