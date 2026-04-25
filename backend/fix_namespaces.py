import os

root_dir = r'f:\TOPUPGAME\backend\app\Filament'
# Match both \Filament\Tables\Actions and Filament\Tables\Actions
targets = ['\\Filament\\Tables\\Actions\\', 'Filament\\Tables\\Actions\\']
replacements = ['\\Filament\\Actions\\', 'Filament\\Actions\\']

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            changed = False
            
            for target, replacement in zip(targets, replacements):
                if target in new_content:
                    new_content = new_content.replace(target, replacement)
                    changed = True
            
            # Special case for Tables\Actions\ (relative call)
            if 'Tables\\Actions\\' in new_content:
                new_content = new_content.replace('Tables\\Actions\\', '\\Filament\\Actions\\')
                changed = True

            if changed:
                print(f"Fixing {path}")
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
