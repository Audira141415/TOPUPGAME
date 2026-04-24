import paramiko

def update_production_db():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        print(f"[*] Connecting to {host} to update production database...")
        ssh.connect(host, username=user, password=password)
        
        # SQL commands to update banners
        sql = (
            "UPDATE games SET banner = 'games/7ds-banner.png' WHERE slug = '7ds-grand-cross'; "
            "UPDATE games SET banner = 'games/ml-banner.png' WHERE slug = 'mobile-legends'; "
            "UPDATE games SET banner = 'games/genshin-impact.png' WHERE slug = 'genshin-impact';"
        )
        
        cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "{sql}"'
        print(f"[CMD] {cmd}")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        output = stdout.read().decode()
        error = stderr.read().decode()
        
        if output: print(f"[OUT] {output}")
        if error: print(f"[ERR] {error}")
        
        print("[SUCCESS] Production database updated with banner paths.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    update_production_db()
