import paramiko

def check_users():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("[*] Auditing Production Database Users...")
        
        # Command to list users
        php_cmd = "docker exec topup_backend php artisan tinker --execute=\"print_r(\\App\\Models\\User::pluck('email')->toArray())\""
        
        stdin, stdout, stderr = ssh.exec_command(php_cmd)
        out = stdout.read().decode()
        print("\n--- REGISTERED EMAILS ---")
        print(out)
        print("-------------------------")
        
        err = stderr.read().decode()
        if err: print(f"[LOG] {err}")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_users()
