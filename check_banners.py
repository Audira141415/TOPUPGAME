import paramiko

def check_banners():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SELECT id, title, image_path FROM banners;"'
        print(f"[*] Banner status on SERVER:")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        print(stdout.read().decode())
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_banners()
