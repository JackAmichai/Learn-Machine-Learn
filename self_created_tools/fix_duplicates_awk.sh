awk '
/^ *"[A-zA-Z0-9_]+" *: *{ *$/ {
    delete keys
    print
    next
}
/^ *[a-zA-Z0-9_]+ *:/ {
    match($0, /^[ \t]*([a-zA-Z0-9_]+)/, arr)
    k = arr[1]
    if (k in keys) {
        # skip line
        next
    } else {
        keys[k] = 1
    }
}
{ print }
' src/engine/mathContent.js > src/engine/mathContent_fixed.js
mv src/engine/mathContent_fixed.js src/engine/mathContent.js
