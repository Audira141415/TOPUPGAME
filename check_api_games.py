import requests

def check_api():
    url = "http://192.168.100.156:8080/api/games"
    try:
        response = requests.get(url)
        games = response.json()
        print(f"Total games: {len(games)}")
        
        found = [g['name'] for g in games if g['slug'] in ['ragnarok-m', 'efootball']]
        print(f"Found missing games in API: {found}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_api()
