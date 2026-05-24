export interface MessageReply {
  id: string;
  sender: 'admin' | 'user';
  message: string;
  timestamp: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'replied';
  emailSent: boolean;
  emailLog: string[];
  replies?: MessageReply[];
}

export interface Property {
  id: string;
  name: string;
  type: 'villa' | 'hotel' | 'cottage' | 'resort' | 'homestay' | 'glamping' | 'eco_lodge';
  price: number;
  rating: number;
  image: string;
  location: string;
  reviews: number;
  beds: number;
  baths: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
}
