import paramiko

def check_server_counts():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # Query to count games per category
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SELECT c.name, COUNT(g.id) as game_count FROM categories c LEFT JOIN games g ON c.id = g.category_id GROUP BY c.name;"'
        print(f"[*] Game counts per category on SERVER:")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        print(stdout.read().decode())

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_server_counts()
