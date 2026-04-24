import paramiko

def migrate_is_popular():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # Add column and update existing popular games
        sql = (
            "ALTER TABLE games ADD COLUMN is_popular TINYINT(1) DEFAULT 0 AFTER is_active; "
            "UPDATE games SET is_popular = 1 WHERE slug IN ('mobile-legends', 'free-fire', 'pubg-mobile', 'honor-of-kings', 'whiteout-survival', 'genshin-impact');"
        )
        
        cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "{sql}"'
        stdin, stdout, stderr = ssh.exec_command(cmd)
        
        print(stdout.read().decode())
        print(stderr.read().decode())
        print("[SUCCESS] is_popular column added and seeded on production.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    migrate_is_popular()
