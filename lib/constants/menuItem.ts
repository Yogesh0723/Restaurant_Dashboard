export const FALLBACK_MENU_IMAGES = {
    starters: [
      'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=800&q=80', // Samosas
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', // Pakoras
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80', // Vada Pav
      'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80'  // Bhajis
    ],
    main: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80', // Butter Chicken
      'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=800&q=80', // Biryani
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80', // Thali
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80'  // Paneer
    ],
    desserts: [
      'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&q=80', // Gulab Jamun
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80', // Kheer
      'https://images.unsplash.com/photo-1605197788044-5e26a09a5fbd?w=800&q=80', // Jalebi
      'https://images.unsplash.com/photo-1605197869547-1347c7d62c8c?w=800&q=80'  // Rasmalai
    ],
    beverages: [
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&q=80', // Masala Chai
      'https://images.unsplash.com/photo-1578020190125-f4f7c18bc9cb?w=800&q=80', // Lassi
      'https://images.unsplash.com/photo-1544252890-c3e95e867d2a?w=800&q=80', // Coffee
      'https://images.unsplash.com/photo-1565200003367-2a63094b37a5?w=800&q=80'  // Nimbu Pani
    ]
  };
  
  export function getFallbackImage(category: keyof typeof FALLBACK_MENU_IMAGES): string {
    const images = FALLBACK_MENU_IMAGES[category];
    return images[Math.floor(Math.random() * images.length)];
  }