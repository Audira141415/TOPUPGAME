import paramiko

def create_admin():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("[*] Creating Admin User on Production...")
        
        # Using a safer PHP command without complex array syntax in shell
        php_cmd = (
            "docker exec topup_backend php artisan tinker --execute=\""
            "\\$u = \\\\App\\\\Models\\\\User::firstOrNew(['email' => 'admin@audirazenith.com']); "
            "\\$u->name = 'Super Admin'; "
            "\\$u->password = bcrypt('Sigma1993'); "
            "\\$u->role = 'admin'; "
            "\\$u->save();\""
        )
        
        stdin, stdout, stderr = ssh.exec_command(php_cmd)
        print(stdout.read().decode())
        err = stderr.read().decode()
        if err: print(f"[LOG] {err}")
        
        print("\n[SUCCESS] ADMIN ACCOUNT CREATED!")
        print("------------------------------------------")
        print("URL      : http://192.168.100.156:8080/admin")
        print("EMAIL    : admin@audirazenith.com")
        print("PASSWORD : Sigma1993")
        print("------------------------------------------")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    create_admin()
