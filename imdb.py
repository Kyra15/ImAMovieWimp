# https://github.com/pavan412kalyan/imdb-movie-scraper/blob/main/ImdbDataExtraction/search_by_string/search_by_string.py

import requests
import json
import html
import re

BASE_URL = "https://v3.sg.media-imdb.com/suggestion"

HEADERS = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'en-US,en;q=0.9',
    'origin': 'https://m.imdb.com',
    'priority': 'u=1, i',
    'referer': 'https://m.imdb.com/',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
}

def search_all(query, limit=20):
    """Search using IMDb suggestion API"""
    # Get first letter for the API endpoint
    first_letter = query[0].lower() if query else 'a'
    
    # Build the suggestion URL
    url = f"{BASE_URL}/{first_letter}/{query}.json"
    params = {'includeVideos': '0'}
    
    response = requests.get(url, headers=HEADERS, params=params)
    
    if response.status_code != 200:
        print(f"Response text: {response.text}")
    
    response.raise_for_status()
    return response.json()


def format_results(data, limit=20):
    """Format search results for display"""
    suggestions = data.get("d", [])
    results = []
    
    for item in suggestions[:limit]:
        if not item:
            continue
            
        item_id = item.get("id", "")
        name = item.get("l", "Unknown")
        year = item.get("y")  # Year for titles
        type_of = item.get("q", "Unknown")

        if type_of.lower() == "feature":
            type_of = "Movie"
        
        if item_id.startswith("tt"):
            result = {
                "id": item_id,
                "name": name,
                "year": year,
                "type": type_of.title(),
            }
        else:
            continue
            
        results.append(result)
    print(results)
    return results
