import paramiko

def list_server_games():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SELECT name, slug FROM games WHERE category_id = (SELECT id FROM categories WHERE slug = \'mobile-game\') ORDER BY name ASC;"'
        print(f"[*] Listing all Mobile Games on SERVER:")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        print(stdout.read().decode())

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    list_server_games()
