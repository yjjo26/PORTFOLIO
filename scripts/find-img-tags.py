# -*- coding: utf-8 -*-
import os
import re

components_dir = r"components"
public_dir = r"public"

pattern = r'src=["\']([^"\']+)["\']'

print("Scanning components for image sources...")
for root, dirs, files in os.walk(components_dir):
    for f in files:
        if f.endswith(".tsx") or f.endswith(".ts"):
            path = os.path.join(root, f)
            with open(path, "r", encoding="utf-8") as file:
                code = file.read()
            
            srcs = re.findall(pattern, code)
            if srcs:
                print(f"File: {path}")
                for src in srcs:
                    # Ignore external URLs
                    if not src.startswith("http") and not src.startswith("data:"):
                        full_path = os.path.join(public_dir, src.lstrip('/'))
                        exists = os.path.exists(full_path)
                        print(f"  - {src}: {'EXISTS' if exists else '!!! BROKEN/MISSING !!!'}")
