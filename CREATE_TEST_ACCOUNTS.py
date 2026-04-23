import paramiko

def create_accounts():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        print("[*] Provisioning Test Accounts on Production...")
        
        # Array of users to create
        accounts = [
            {'email': 'admin@audirazenith.com', 'name': 'Super Admin', 'role': 'admin'},
            {'email': 'customer@audirazenith.com', 'name': 'Customer Sultan', 'role': 'user'}
        ]
        
        for acc in accounts:
            php_cmd = (
                f"docker exec topup_backend php artisan tinker --execute=\""
                f"\\$u = \\\\App\\\\Models\\\\User::firstOrNew(['email' => '{acc['email']}']); "
                f"\\$u->name = '{acc['name']}'; "
                f"\\$u->password = bcrypt('Sigma1993'); "
                f"\\$u->role = '{acc['role']}'; "
                f"\\$u->save();\""
            )
            stdin, stdout, stderr = ssh.exec_command(php_cmd)
            stdout.read() # Trigger execution
            print(f"[OK] Account {acc['email']} ({acc['role']}) is ready.")
        
        print("\n[SUCCESS] TEST ACCOUNTS READY!")
        print("------------------------------------------")
        print("URL      : http://192.168.100.156:3000/login")
        print("EMAIL    : customer@audirazenith.com")
        print("PASSWORD : Sigma1993")
        print("------------------------------------------")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    create_accounts()
