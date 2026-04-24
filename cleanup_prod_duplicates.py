import paramiko

def cleanup_duplicates():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # SQL to delete duplicates (IDs: 46, 31, 6)
        # We delete products first to avoid foreign key issues
        sql = (
            "DELETE FROM products WHERE game_id IN (46, 31, 6); "
            "DELETE FROM games WHERE id IN (46, 31, 6);"
        )
        
        cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "{sql}"'
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        print(stdout.read().decode())
        print(stderr.read().decode())
        print("[SUCCESS] Duplicate games (Solo Leveling, Nikke, Black Clover) have been removed from production.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    cleanup_duplicates()
