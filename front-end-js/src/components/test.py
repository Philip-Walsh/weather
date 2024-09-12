import requests
from bs4 import BeautifulSoup


def get_instagram_followers(username):
    url = f"https://www.instagram.com/{username}/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    try:
        # Find the script containing the JSON with follower count
        json_data = soup.find(
            'script', string=lambda t: t and 'edge_followed_by' in t).string
        start = json_data.find(
            '"edge_followed_by":{"count":') + len('"edge_followed_by":{"count":')
        end = json_data.find('}', start)
        followers = json_data[start:end]
        return int(followers)
    except Exception as e:
        raise e


def get_tiktok_followers(username):
    url = f"https://www.tiktok.com/@{username}"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    try:
        # Locate follower count in meta tags
        followers_tag = soup.find('meta', {'name': 'description'})['content']
        # Extract follower count from description text
        followers = followers_tag.split(' ')[0]
        return followers
    except Exception as e:
        raise e

# Garron 	Garron Noone (@garron_music) • Instagram photos and videos	596K  	Garron Noone (@garron_music) Official | TikTok	"632.5K
# Example usage:
insta_followers = get_instagram_followers('@garron_music')
tiktok_followers = get_tiktok_followers('garron_music')

print(f"Instagram followers: {insta_followers}")
print(f"TikTok followers: {tiktok_followers}")
