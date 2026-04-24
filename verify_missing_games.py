import paramiko

def verify_games():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        cmd = "docker exec topup_db mariadb -u root -proot topup_game -e \"SELECT id, name, slug, category_id, is_active FROM games WHERE slug IN ('ragnarok-m', 'efootball');\""
        stdin, stdout, stderr = ssh.exec_command(cmd)
        print(stdout.read().decode())
        print(stderr.read().decode())
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    verify_games()
