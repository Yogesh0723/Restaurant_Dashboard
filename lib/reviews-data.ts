export interface Review {
    id: number;
    author_name: string;
    rating: number;
    text: string;
    profile_photo_url: string;
    time: number;
  }
  
  export const reviews: Review[] = [
    {
      id: 1,
      author_name: "Rahul Sharma",
      rating: 5,
      text: "The best Maharashtrian thali I've ever had! The sol kadhi was perfect and the mutton rassa was outstanding.",
      profile_photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      time: new Date('2024-03-10').getTime()
    },
    {
      id: 2,
      author_name: "Priya Patel",
      rating: 5,
      text: "Authentic Kolhapuri cuisine at its finest. The misal pav is a must-try! Great ambiance and friendly staff.",
      profile_photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      time: new Date('2024-03-09').getTime()
    },
    {
      id: 3,
      author_name: "Amit Kumar",
      rating: 4,
      text: "Love their thali options. The puran poli was just like homemade. Will definitely come back!",
      profile_photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      time: new Date('2024-03-08').getTime()
    },
    {
      id: 4,
      author_name: "Sneha Reddy",
      rating: 5,
      text: "Amazing vada pav and bhaji! The spice levels are perfect and the service is quick.",
      profile_photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      time: new Date('2024-03-07').getTime()
    },
    {
      id: 5,
      author_name: "Rajesh Singh",
      rating: 5,
      text: "Best dhaba experience in the city! Their special thali is a must-try. Great value for money.",
      profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      time: new Date('2024-03-06').getTime()
    },
    {
        id: 6,
        author_name: "Yuvaraj Singh",
        rating: 5,
        text: "Best dhaba experience in the city! Their special thali is a must-try. Great value for money.",
        profile_photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        time: new Date('2024-03-06').getTime()
      }
  ];