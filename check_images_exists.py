import paramiko

def check_images():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        files = ['games/ragnarok-m.png', 'games/efootball.png']
        for f in files:
            cmd = f"ls -l /home/audira/TOPUPGAME/backend/storage/app/public/{f}"
            stdin, stdout, stderr = ssh.exec_command(cmd)
            print(f"{f}: {stdout.read().decode().strip()}")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_images()
