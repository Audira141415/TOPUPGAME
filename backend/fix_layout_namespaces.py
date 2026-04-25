import os
import re

directory = 'app/Filament'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace Forms\Components\Section with Schemas\Components\Section
            new_content = content.replace(
                'Forms\\Components\\Section',
                '\\Filament\\Schemas\\Components\\Section'
            )
            
            # Also replace any other layout components if found
            for layout in ['Grid', 'Group', 'Tabs', 'Wizard']:
                new_content = new_content.replace(
                    f'Forms\\Components\\{layout}',
                    f'\\Filament\\Schemas\\Components\\{layout}'
                )

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {path}")
