import os
import re

directory = 'app/Filament'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace Section import
            new_content = content.replace(
                'use Filament\\Forms\\Components\\Section;',
                'use Filament\\Schemas\\Components\\Section;'
            )
            
            # Replace inline Section usage if needed (unlikely but safe)
            # new_content = new_content.replace('Forms\\Components\\Section', 'Schemas\\Components\\Section')

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {path}")
