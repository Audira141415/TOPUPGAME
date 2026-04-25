import paramiko
import os

def hard_sync_server():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    remote_path = "/home/audira/TOPUPGAME"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        print(f"[*] Connecting to {host} for Hard Sync...")
        ssh.connect(host, username=user, password=password)
        
        # 1. Clean Database (Disable FK checks first)
        print("[*] Truncating games table on server...")
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SET FOREIGN_KEY_CHECKS = 0; TRUNCATE TABLE games; SET FOREIGN_KEY_CHECKS = 1;"'
        ssh.exec_command(cmd)
        
        # 2. Clean Storage Files on Server
        print("[*] Cleaning remote storage games folder...")
        cmd = f"rm -rf {remote_path}/backend/storage/app/public/games/*"
        ssh.exec_command(cmd)
        
        print("[OK] Server is now clean. Ready for fresh deployment.")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    hard_sync_server()
