import paramiko
import os
import tarfile
from scp import SCPClient
import sys

def log(msg):
    try:
        print(msg)
        sys.stdout.flush()
    except:
        pass

def create_archive(source_dir, output_filename):
    log(f"[*] Creating archive: {output_filename}")
    with tarfile.open(output_filename, "w:gz") as tar:
        for root, dirs, files in os.walk(source_dir):
            if 'node_modules' in dirs: dirs.remove('node_modules')
            if 'vendor' in dirs: dirs.remove('vendor')
            if '.git' in dirs: dirs.remove('.git')
            if '.gemini' in dirs: dirs.remove('.gemini')
            if 'storage' in dirs: dirs.remove('storage')
            
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                try:
                    tar.add(full_path, arcname=rel_path)
                except:
                    pass
    log("[OK] Archive created.")

def deploy():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    remote_path = "/home/audira/TOPUPGAME"
    archive_name = "project.tar.gz"

    create_archive(".", archive_name)

    log(f"[*] Connecting to {host}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        log("[OK] Connected.")

        log(f"[*] Uploading package...")
        with SCPClient(ssh.get_transport()) as scp:
            scp.put(archive_name, f"/home/audira/{archive_name}")
        
        log("[*] Remote Deployment (Safe Seed Mode)...")
        commands = [
            f"mkdir -p {remote_path}",
            f"tar -xzf /home/audira/{archive_name} -C {remote_path}",
            "docker exec topup_frontend rm -rf node_modules/.vite || true",
            f"cd {remote_path} && docker compose up -d --build --force-recreate",
            "sleep 10",
            f"docker exec topup_backend mkdir -p storage/app/public storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs",
            f"docker exec topup_backend chmod -R 777 storage bootstrap/cache",
            f"docker exec topup_backend composer install --no-dev --optimize-autoloader",
            f"docker exec topup_backend php artisan migrate --force",
            f"docker exec topup_backend php artisan db:seed --force", # RUN SEEDER
            f"docker exec topup_backend php artisan config:cache",
            f"docker exec topup_backend php artisan storage:link || true"
        ]
        
        for cmd in commands:
            log(f"[CMD] {cmd}")
            stdin, stdout, stderr = ssh.exec_command(cmd)
            for line in stdout:
                log(f"  {line.strip()}")
            err = stderr.read().decode()
            if err: log(f"[LOG] {err}")

        log("\n[SUCCESS] DEPLOYMENT COMPLETED WITH SEEDING!")
        log(f"[INFO] Access: http://{host}:3000")

    except Exception as e:
        log(f"[ERROR] {str(e)}")
    finally:
        ssh.close()
        if os.path.exists(archive_name):
            os.remove(archive_name)

if __name__ == "__main__":
    deploy()
