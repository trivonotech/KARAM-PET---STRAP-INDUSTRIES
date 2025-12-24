from PIL import Image
from collections import Counter

def get_dominant_colors(image_path, num_colors=4):
    try:
        image = Image.open(image_path)
        image = image.convert('RGBA')
        image = image.resize((150, 150))
        
        pixels = list(image.getdata())
        
        # Filter out transparent or very near-white pixels if desired
        # Here we filter out fully transparent
        filtered_pixels = [p for p in pixels if p[3] > 128 and not (p[0] > 240 and p[1] > 240 and p[2] > 240)]
        
        if not filtered_pixels:
             # Fallback if mostly transparent/white
             filtered_pixels = [p for p in pixels if p[3] > 128]

        counts = Counter(filtered_pixels)
        dominant = counts.most_common(num_colors)
        
        hex_colors = []
        for color, count in dominant:
            hex_colors.append('#{:02x}{:02x}{:02x}'.format(color[0], color[1], color[2]))
            
        print("DOMINANT_COLORS:", ", ".join(hex_colors))
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_dominant_colors('/Users/yash/Coumpny Project/KARAM-PET---STRAP-INDUSTRIES/web-app/public/logo.png')
