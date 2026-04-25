import os

root_dir = r'f:\TOPUPGAME\backend\app\Filament'
target = 'fn (string $state)'
replacement = 'fn (?string $state)'

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.php'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if target in content:
                print(f"Fixing nullable state in {path}")
                new_content = content.replace(target, replacement)
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
