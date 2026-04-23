import os
import sys
import subprocess
import requests

def check_port(port):
    try:
        response = requests.get(f"http://localhost:{port}", timeout=2)
        return True
    except:
        return False

def main():
    print("=== AUDIRA ZENITH AUDIT TOOL ===")
    
    # 1. Check Docker
    print("[1/4] Checking Docker Containers...")
    try:
        containers = subprocess.check_output(["docker", "ps"]).decode()
        if "topup_backend" in containers and "topup_nginx" in containers:
            print("  - OK: Containers are running.")
        else:
            print("  - WARNING: Some containers are missing!")
    except:
        print("  - ERROR: Docker is not running.")

    # 2. Check Backend Port (8080)
    print("[2/4] Checking Backend Port (8080)...")
    if check_port(8080):
        print("  - OK: Port 8080 is responding.")
    else:
        print("  - ERROR: Port 8080 is NOT responding!")

    # 3. Check Storage Link
    print("[3/4] Checking Storage Symlink...")
    try:
        check_link = subprocess.check_output(["docker", "exec", "topup_backend", "ls", "-la", "/var/www/html/public/storage"]).decode()
        if "->" in check_link:
            print("  - OK: Storage link is active.")
        else:
            print("  - ERROR: Storage link is NOT active!")
    except:
        print("  - ERROR: Could not verify storage link.")

    # 4. Check Frontend .env
    print("[4/4] Checking Frontend .env...")
    if os.path.exists("frontend/.env"):
        with open("frontend/.env", "r") as f:
            content = f.read()
            if "8080" in content:
                print("  - OK: .env is using port 8080.")
            else:
                print("  - WARNING: .env might be using the wrong port!")
    else:
        print("  - ERROR: .env file missing in frontend!")

    print("\nAudit Complete.")

if __name__ == "__main__":
    main()
