#!/bin/bash
# Make sure Controls is updated for my fix
sed -i -e '/if (!file) return;/a\
\
        // Security: Prevent client-side DoS by limiting file size to 5MB\
        if (file.size > 5 * 1024 * 1024) {\
            setStatus(\x27error\x27, \x27File size exceeds 5MB limit.\x27);\
            if (fileInputRef.current) {\
                fileInputRef.current.value = \x27\x27;\
            }\
            return;\
        }\
' src/components/Controls.jsx
