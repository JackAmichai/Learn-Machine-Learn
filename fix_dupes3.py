import re
import subprocess

def get_duplicates():
    result = subprocess.run(['pnpm', 'exec', 'eslint', 'src/engine/mathContent.js'], capture_output=True, text=True)
    lines_to_delete = []
    for line in result.stdout.split('\n'):
        match = re.search(r'^\s*(\d+):\d+\s+error\s+Duplicate key', line)
        if match:
            lines_to_delete.append(int(match.group(1)))
    return lines_to_delete

lines_to_delete = get_duplicates()
print(f"Lines to delete: {lines_to_delete}")

if lines_to_delete:
    with open('src/engine/mathContent.js', 'r') as f:
        lines = f.readlines()

    lines_to_delete.sort(reverse=True)
    for line_num in lines_to_delete:
        # We need to be careful not to delete multi-line values, but these are simple keys like `visualizer: "NeuralNetwork",` or `interactiveFormulas: [`
        line = lines[line_num - 1]

        if line.strip().startswith('visualizer:'):
            del lines[line_num - 1]
        elif line.strip().startswith('interactiveFormulas: ['):
            # This is an array, we must find the matching closing bracket
            bracket_count = 0
            start_line = line_num - 1
            end_line = start_line
            for i in range(start_line, len(lines)):
                bracket_count += lines[i].count('[')
                bracket_count -= lines[i].count(']')
                if bracket_count == 0:
                    end_line = i
                    break
            print(f"Deleting interactiveFormulas from line {start_line+1} to {end_line+1}")
            del lines[start_line:end_line+1]
        else:
            print(f"Unknown line format: {line}")
            del lines[line_num - 1]

    with open('src/engine/mathContent.js', 'w') as f:
        f.writelines(lines)
