import paramiko
import sys

def run_remote_seed():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        print(f"[*] Connecting to {host} to run seeder...")
        ssh.connect(host, username=user, password=password)
        
        cmd = "docker exec topup_backend php artisan db:seed --class=UltimateGameSeeder"
        print(f"[CMD] {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        for line in stdout:
            print(f"  {line.strip()}")
            
        err = stderr.read().decode()
        if err:
            print(f"[LOG] {err}")
            
        print("[SUCCESS] Remote seeding completed.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    run_remote_seed()
