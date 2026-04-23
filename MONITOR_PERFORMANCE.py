import paramiko

def check_performance():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("[*] Auditing Server Performance...")
        
        # Check docker stats
        stdin, stdout, stderr = ssh.exec_command("docker stats --no-stream --format \"table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\"")
        print("\n--- DOCKER STATS ---")
        print(stdout.read().decode())
        print("--------------------")
        
        # Check system load
        stdin, stdout, stderr = ssh.exec_command("uptime")
        print(f"System Load: {stdout.read().decode().strip()}")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_performance()
