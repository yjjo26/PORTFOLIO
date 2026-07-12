# -*- coding: utf-8 -*-
import os
import re

static_project_path = r"lib/infrastructure/repositories/static-project.ts"
public_dir = r"public"

if os.path.exists(static_project_path):
    with open(static_project_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract all string paths matching /portfolio/...
    paths = re.findall(r'"/portfolio/[^"]+"', content)
    # Also check single quotes
    paths += re.findall(r"'/portfolio/[^']+'", content)
    
    # Normalize paths by removing quotes
    normalized_paths = [p.strip('"\'') for p in paths]
    
    print(f"Checking {len(normalized_paths)} paths in static-project.ts:")
    for path in sorted(set(normalized_paths)):
        full_path = os.path.join(public_dir, path.lstrip('/'))
        exists = os.path.exists(full_path)
        print(f"  - {path}: {'EXISTS' if exists else '!!! BROKEN/MISSING !!!'}")
else:
    print("static-project.ts not found")
