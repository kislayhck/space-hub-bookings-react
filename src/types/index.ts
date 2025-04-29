
export interface Space {
  id: string;
  name: string;
  location: {
    address: string;
    city: string;
    area: string;
  };
  description: string;
  price: {
    daily: number;
    monthly: number;
  };
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  capacity: number;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  featured: boolean;
  availableSeats: number;
}

export interface FilterOptions {
  city: string;
  area: string[];
  priceRange: [number, number];
  amenities: string[];
}

export interface User {
  email: string;
  isAdmin: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}
