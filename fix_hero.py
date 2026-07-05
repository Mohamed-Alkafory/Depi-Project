#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

file_path = r"C:\Users\Giga Byte\OneDrive\Desktop\Depi-Project\HOMI\src\features\Home\components\HeroSection.jsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add useNavigate import after React import
content = content.replace(
    'import { useState, useEffect } from "react";',
    'import { useState, useEffect } from "react";\nimport { useNavigate } from "react-router-dom";'
)

# 2. Add navigate hook
content = content.replace(
    'const [isScrolling, setIsScrolling] = useState(false);',
    'const [isScrolling, setIsScrolling] = useState(false);\n  const navigate = useNavigate();'
)

# 3. Find and replace Calculate Cost button
# Use a simpler approach - just add onClick to the existing button
old_text = '<span className="relative z-10">Calculate Cost</span>'
new_text = '<span className="relative z-10" onClick={() => navigate(\'/cost-calculator\')}>Calculate Cost</span>'
content = content.replace(old_text, new_text)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("HeroSection updated successfully!")
