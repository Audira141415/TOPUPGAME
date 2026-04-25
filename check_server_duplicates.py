import paramiko

def check_server_duplicates():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # Query to find duplicate slugs
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SELECT slug, COUNT(*) as count FROM games GROUP BY slug HAVING count > 1;"'
        print(f"[*] Checking duplicate slugs on server...")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        output = stdout.read().decode()
        if output:
            print(output)
        else:
            print("[OK] No duplicate slugs found.")

        # Query to find duplicate names
        cmd = 'docker exec topup_db mysql -u root -proot topup_game -e "SELECT name, COUNT(*) as count FROM games GROUP BY name HAVING count > 1;"'
        print(f"\n[*] Checking duplicate names on server...")
        stdin, stdout, stderr = ssh.exec_command(cmd)
        output = stdout.read().decode()
        if output:
            print(output)
        else:
            print("[OK] No duplicate names found.")

    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    check_server_duplicates()
