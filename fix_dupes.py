import subprocess
import re

def fix_duplicates():
    while True:
        result = subprocess.run(['pnpm', 'exec', 'eslint', 'src/engine/mathContent.js'], capture_output=True, text=True)
        lines_to_delete = []
        for line in result.stdout.split('\n'):
            match = re.search(r'^\s*(\d+):\d+\s+error\s+Duplicate key', line)
            if match:
                lines_to_delete.append(int(match.group(1)))

        if not lines_to_delete:
            break

        print(f"Deleting lines: {lines_to_delete}")

        with open('src/engine/mathContent.js', 'r') as f:
            lines = f.readlines()

        # Delete from bottom up to not mess up line numbers
        lines_to_delete.sort(reverse=True)
        for line_num in lines_to_delete:
            del lines[line_num - 1]

        with open('src/engine/mathContent.js', 'w') as f:
            f.writelines(lines)

fix_duplicates()
