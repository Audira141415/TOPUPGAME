import paramiko

def add_new_trending_games():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # SQL to add games and products
        # Using Category 1 for Mobile (assuming it exists based on previous seeds)
        sql = """
        INSERT INTO games (category_id, name, slug, image, banner, is_active, created_at, updated_at) VALUES 
        (1, 'Whiteout Survival', 'whiteout-survival', 'games/whiteout-survival.png', NULL, 1, NOW(), NOW()),
        (1, 'Honor of Kings', 'honor-of-kings', 'games/honor-of-kings.png', NULL, 1, NOW(), NOW()),
        (1, 'eFootball', 'efootball', 'games/efootball.png', NULL, 1, NOW(), NOW()),
        (1, 'Stumble Guys', 'stumble-guys', 'games/stumble-guys.png', NULL, 1, NOW(), NOW()),
        (1, 'Eggy Party', 'eggy-party', 'games/eggy-party.png', NULL, 1, NOW(), NOW());
        
        -- Add products for the new games
        -- We'll get the last IDs. Assuming auto-increment continues.
        -- Using subqueries to get game IDs for robustness
        INSERT INTO products (game_id, name, slug, price_basic, price_premium, is_active, created_at, updated_at)
        SELECT id, 'Starter Pack', CONCAT(slug, '-starter'), 15000, 14000, 1, NOW(), NOW() FROM games WHERE slug IN ('whiteout-survival', 'honor-of-kings', 'efootball', 'stumble-guys', 'eggy-party');
        
        INSERT INTO products (game_id, name, slug, price_basic, price_premium, is_active, created_at, updated_at)
        SELECT id, 'Medium Pack', CONCAT(slug, '-medium'), 50000, 48000, 1, NOW(), NOW() FROM games WHERE slug IN ('whiteout-survival', 'honor-of-kings', 'efootball', 'stumble-guys', 'eggy-party');
        
        INSERT INTO products (game_id, name, slug, price_basic, price_premium, is_active, created_at, updated_at)
        SELECT id, 'Premium Pack', CONCAT(slug, '-premium'), 100000, 95000, 1, NOW(), NOW() FROM games WHERE slug IN ('whiteout-survival', 'honor-of-kings', 'efootball', 'stumble-guys', 'eggy-party');
        """
        
        # Split SQL into individual statements for docker exec
        statements = [s.strip() for s in sql.split(';') if s.strip()]
        
        for statement in statements:
            cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "{statement}"'
            stdin, stdout, stderr = ssh.exec_command(cmd)
            print(f"[CMD] {statement[:50]}...")
            print(stdout.read().decode())
            print(stderr.read().decode())
            
        print("[SUCCESS] Trending games and products added to production database.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    add_new_trending_games()
