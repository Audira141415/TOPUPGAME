import paramiko

def restore_solo_leveling_banner():
    # 1. Restore to SERVER
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        # Insert Solo Leveling Banner at position 1
        query = """
        INSERT INTO banners (title, image_path, link_url, is_active, `order`, created_at, updated_at) 
        VALUES ('SOLO LEVELING: ARISE', 'banners/hero_main.png', '/game/solo-leveling', 1, 0, NOW(), NOW());
        """
        # We use order 0 and make sure it is the first one
        cmd = f'docker exec topup_db mysql -u root -proot topup_game -e "{query}"'
        print(f"[*] Restoring Solo Leveling Banner on SERVER...")
        ssh.exec_command(cmd)
        print("[OK] Banner restored on server.")
    except Exception as e:
        print(f"[ERROR Server] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    restore_solo_leveling_banner()
