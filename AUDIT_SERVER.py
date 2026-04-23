import paramiko

def audit_server():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("====================================================")
        print("          DOCKER CONTAINER STATUS")
        print("====================================================\n")
        
        stdin, stdout, stderr = ssh.exec_command('cd /home/audira/TOPUPGAME && docker compose ps')
        print("--- [DOCKER COMPOSE STATUS] ---")
        print(stdout.read().decode())
        
        stdin, stdout, stderr = ssh.exec_command('docker ps -a')
        print("\n--- [ALL CONTAINERS (PS -A)] ---")
        print(stdout.read().decode())
        
        print("\n====================================================")
        
    except Exception as e:
        print(f"Error connecting: {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    audit_server()
