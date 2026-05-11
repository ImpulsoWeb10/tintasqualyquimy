#!/usr/bin/env python3
import os
import re

def fix_canonical_urls():
    """Replace duplicate domain URLs with correct domain"""
    root_dir = r"c:\Users\Rafa Qualy\Desktop\IA-AGENTES\tintasqualyquimy"
    
    # Pattern to match duplicate domain
    pattern = r'https://tintasqualyquimy\.tintasqualyquimy\.com\.br'
    replacement = 'https://tintasqualyquimy.com.br'
    
    files_modified = 0
    total_replacements = 0
    
    # Walk through all HTML files
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                try:
                    # Read file content
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                    
                    # Count original matches
                    original_matches = len(re.findall(pattern, content))
                    
                    if original_matches > 0:
                        # Replace pattern
                        new_content = re.sub(pattern, replacement, content)
                        
                        # Write back if changed
                        if new_content != content:
                            with open(file_path, 'w', encoding='utf-8') as f:
                                f.write(new_content)
                            
                            files_modified += 1
                            total_replacements += original_matches
                            print(f"Fixed {file} - {original_matches} replacements")
                
                except Exception as e:
                    print(f"Error processing {file}: {e}")
    
    print(f"\nSummary:")
    print(f"Files modified: {files_modified}")
    print(f"Total replacements: {total_replacements}")

if __name__ == "__main__":
    fix_canonical_urls()
