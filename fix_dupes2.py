import re

def main():
    lines_to_delete = [35, 172, 206, 292, 293, 363, 393, 452, 506, 561, 867, 1030, 1278, 2081, 2215, 2894, 2942, 2995, 3066, 3191, 3327, 4465, 4537, 4683, 4760]

    with open('src/engine/mathContent.js', 'r') as f:
        lines = f.readlines()

    lines_to_delete.sort(reverse=True)
    for num in lines_to_delete:
        del lines[num - 1]

    with open('src/engine/mathContent.js', 'w') as f:
        f.writelines(lines)

main()
