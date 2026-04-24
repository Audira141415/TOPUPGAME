import paramiko

def add_all_popular_games():
    host = "192.168.100.156"
    user = "audira"
    password = "Sigma1993"
    
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(host, username=user, password=password)
        
        # SQL to add games (Check for existing first)
        # Using Category 1 (Mobile Game)
        games_data = [
            ('Whiteout Survival', 'whiteout-survival', 'games/whiteout-survival.png'),
            ('Honor of Kings', 'honor-of-kings', 'games/honor-of-kings.png'),
            ('eFootball', 'efootball', 'games/efootball.png'),
            ('Stumble Guys', 'stumble-guys', 'games/stumble-guys.png'),
            ('Eggy Party', 'eggy-party', 'games/eggy-party.png'),
            ('Ragnarok M: Eternal Love', 'ragnarok-m', 'games/ragnarok-m.png'),
            ('Night Crows', 'night-crows', 'games/night-crows.png'),
            ('Legend of Mushroom', 'legend-of-mushroom', 'games/legend-of-mushroom.png'),
        ]
        
        for name, slug, img in games_data:
            print(f"[*] Processing {name}...")
            # Insert game if not exists
            check_cmd = f'docker exec topup_db mariadb -u root -proot topup_game -e "SELECT id FROM games WHERE slug = \'{slug}\';"'
            stdin, stdout, stderr = ssh.exec_command(check_cmd)
            exists = stdout.read().decode().strip()
            
            if not exists:
                insert_game = f"INSERT INTO games (category_id, name, slug, image, is_active, created_at, updated_at) VALUES (1, '{name}', '{slug}', '{img}', 1, NOW(), NOW());"
                ssh.exec_command(f'docker exec topup_db mariadb -u root -proot topup_game -e "{insert_game}"')
                print(f"[+] Game {name} inserted.")
            else:
                print(f"[!] Game {name} already exists.")
            
            # Add products for this game (Clear existing products for these games first to avoid duplicates)
            clear_products = f"DELETE FROM products WHERE game_id = (SELECT id FROM games WHERE slug = '{slug}');"
            ssh.exec_command(f'docker exec topup_db mariadb -u root -proot topup_game -e "{clear_products}"')
            
            # Insert standard packs
            products = [
                ('Starter Pack', 15000, 14000, 13500, 12000, f"{slug.upper()}-STARTER"),
                ('Medium Pack', 50000, 48000, 45000, 40000, f"{slug.upper()}-MEDIUM"),
                ('Premium Pack', 100000, 95000, 90000, 80000, f"{slug.upper()}-PREMIUM"),
            ]
            
            for p_name, p_basic, p_gold, p_plat, p_cost, sku in products:
                insert_product = (
                    f"INSERT INTO products (game_id, name, price_basic, price_gold, price_platinum, price_cost, sku, stock, is_active, provider_product_id, created_at, updated_at) "
                    f"SELECT id, '{p_name}', {p_basic}, {p_gold}, {p_plat}, {p_cost}, '{sku}', 999, 1, '{sku}', NOW(), NOW() FROM games WHERE slug = '{slug}';"
                )
                ssh.exec_command(f'docker exec topup_db mariadb -u root -proot topup_game -e "{insert_product}"')
            
            print(f"[+] Products for {name} added.")

        print("[SUCCESS] All trending games and products have been implemented on production.")
    except Exception as e:
        print(f"[ERROR] {str(e)}")
    finally:
        ssh.close()

if __name__ == "__main__":
    add_all_popular_games()
