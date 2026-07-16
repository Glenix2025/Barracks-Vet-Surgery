export interface PetPatient {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'rodent' | 'other';
  breed: string;
  description: string;
  quote: string;
  imageDesc: string;
  imageColor: string; // Background color for fallback avatar
  imageSrc: string; // Realistic Unsplash match for our visual description
}

export interface Testimonial {
  id: string;
  author: string;
  badge: string;
  rating: number;
  timeText: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'pawsy';
  text: string;
  timestamp: Date;
  isUrgentDirect?: boolean;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface BookingData {
  ownerName: string;
  email: string;
  phone: string;
  petName: string;
  petType: string;
  reason: string;
  preferredDate: string;
}
