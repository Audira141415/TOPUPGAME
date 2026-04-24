import paramiko

def update_batch_1():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        sql = (
            "UPDATE games SET banner = 'games/ff-banner.png' WHERE slug = 'free-fire'; "
            "UPDATE games SET banner = 'games/pubg-banner.png' WHERE slug = 'pubg-mobile'; "
            "UPDATE games SET banner = 'games/valorant-banner.png' WHERE slug = 'valorant';"
        )
        
        cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "{sql}"'
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        print(stdout.read().decode())
        print(stderr.read().decode())
        print("[SUCCESS] Batch 1 banners updated on production.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    update_batch_1()
