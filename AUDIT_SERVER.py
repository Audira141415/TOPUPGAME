import paramiko

def audit_file():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("[*] Auditing api.ts on Server...")
        
        stdin, stdout, stderr = ssh.exec_command("cat /home/audira/TOPUPGAME/frontend/src/services/api.ts")
        content = stdout.read().decode()
        print("\n--- SERVER FILE CONTENT ---")
        print(content[:500]) # First 500 chars
        print("---------------------------")
        
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    audit_file()
