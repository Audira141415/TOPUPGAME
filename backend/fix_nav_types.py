import os
import re

directory = 'app/Filament'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix navigationGroup type hint
            new_content = re.sub(
                r'protected static \?string \$navigationGroup =',
                r'protected static string|\\UnitEnum|null $navigationGroup =',
                content
            )
            
            # Fix navigationIcon type hint
            new_content = re.sub(
                r'protected static \?string \$navigationIcon =',
                r'protected static string|\\BackedEnum|null $navigationIcon =',
                new_content
            )

            # Fix already existing string|\UnitEnum|null if it was missing ?
            # (Just ensuring consistency)

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Fixed {path}")
