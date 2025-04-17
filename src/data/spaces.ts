
import { Space } from '@/types';

export const spaces: Space[] = [
  {
    id: '1',
    name: 'Urban Work Hub',
    location: {
      address: '123 Main Street, Koregaon Park',
      city: 'Pune',
      area: 'Koregaon Park'
    },
    description: 'A vibrant coworking space with modern amenities and a collaborative environment. Perfect for freelancers and small teams looking for a professional workspace.',
    price: {
      daily: 299,
      monthly: 5999
    },
    rating: 4.8,
    reviewCount: 126,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72'
    ],
    amenities: ['High-speed WiFi', 'Meeting Rooms', 'Coffee & Tea', 'Air Conditioning', 'Printing Facilities', '24/7 Access'],
    capacity: 50,
    openingHours: {
      weekdays: '8:00 AM - 10:00 PM',
      weekends: '9:00 AM - 6:00 PM'
    },
    featured: true,
    availableSeats: 12
  },
  {
    id: '2',
    name: 'TechSpace',
    location: {
      address: '456 Innovation Drive, Hinjewadi',
      city: 'Pune',
      area: 'Hinjewadi'
    },
    description: 'A tech-focused coworking space designed specifically for startups and tech companies. Equipped with the latest technology and high-speed internet.',
    price: {
      daily: 349,
      monthly: 6999
    },
    rating: 4.6,
    reviewCount: 87,
    images: [
      'https://images.unsplash.com/photo-1572025442646-866d16c84a54',
      'https://images.unsplash.com/photo-1574027452364-a5e5f5cb78ce',
      'https://images.unsplash.com/photo-1573496774620-169c7b311fff'
    ],
    amenities: ['High-speed WiFi', 'Private Offices', 'Conference Rooms', 'Gaming Zone', 'Cafeteria', 'Phone Booths', 'Standing Desks'],
    capacity: 75,
    openingHours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    featured: true,
    availableSeats: 8
  },
  {
    id: '3',
    name: 'Creative Corner',
    location: {
      address: '789 Art Street, Kalyani Nagar',
      city: 'Pune',
      area: 'Kalyani Nagar'
    },
    description: 'A uniquely designed coworking space for creative professionals. Features open spaces, artistic interiors, and a vibrant community of designers and artists.',
    price: {
      daily: 279,
      monthly: 5499
    },
    rating: 4.9,
    reviewCount: 152,
    images: [
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
    ],
    amenities: ['High-speed WiFi', 'Art Supplies', 'Studio Space', 'Exhibition Area', 'Coffee & Tea', 'Networking Events'],
    capacity: 40,
    openingHours: {
      weekdays: '9:00 AM - 9:00 PM',
      weekends: '10:00 AM - 7:00 PM'
    },
    featured: false,
    availableSeats: 15
  },
  {
    id: '4',
    name: 'Business Central',
    location: {
      address: '101 Corporate Avenue, Viman Nagar',
      city: 'Pune',
      area: 'Viman Nagar'
    },
    description: 'A premium coworking space designed for professionals seeking a corporate environment. Offers elegant interiors, premium amenities, and excellent service.',
    price: {
      daily: 399,
      monthly: 7499
    },
    rating: 4.7,
    reviewCount: 98,
    images: [
      'https://images.unsplash.com/photo-1497215842964-222b430dc094',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
      'https://images.unsplash.com/photo-1497366216548-37526070297c'
    ],
    amenities: ['High-speed WiFi', 'Dedicated Desks', 'Private Offices', 'Business Address', 'Mail Handling', 'Reception Services', 'Conference Rooms'],
    capacity: 60,
    openingHours: {
      weekdays: '8:00 AM - 8:00 PM',
      weekends: '9:00 AM - 5:00 PM'
    },
    featured: true,
    availableSeats: 5
  },
  {
    id: '5',
    name: 'Startup Hub',
    location: {
      address: '222 Entrepreneur Lane, Baner',
      city: 'Pune',
      area: 'Baner'
    },
    description: 'A coworking space specifically designed for startups and entrepreneurs. Features affordable plans, networking opportunities, and mentorship programs.',
    price: {
      daily: 249,
      monthly: 4999
    },
    rating: 4.5,
    reviewCount: 74,
    images: [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
      'https://images.unsplash.com/photo-1556761175-129418e5a8a0',
      'https://images.unsplash.com/photo-1505409859467-3a796fd5798e'
    ],
    amenities: ['High-speed WiFi', 'Mentorship Programs', 'Pitch Deck Support', 'Investor Meetups', 'Coffee & Tea', 'Flexible Hours'],
    capacity: 35,
    openingHours: {
      weekdays: '8:00 AM - 11:00 PM',
      weekends: '9:00 AM - 8:00 PM'
    },
    featured: false,
    availableSeats: 10
  },
  {
    id: '6',
    name: 'Flex Workspace',
    location: {
      address: '333 Flexible Street, Aundh',
      city: 'Pune',
      area: 'Aundh'
    },
    description: 'A versatile coworking space offering multiple membership options including hot desks, dedicated desks, and private offices. Perfect for businesses of all sizes.',
    price: {
      daily: 329,
      monthly: 6499
    },
    rating: 4.4,
    reviewCount: 62,
    images: [
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76',
      'https://images.unsplash.com/photo-1604328471023-a651eb04c852',
      'https://images.unsplash.com/photo-1604328729348-e89349ca5dca'
    ],
    amenities: ['High-speed WiFi', 'Hot Desks', 'Dedicated Desks', 'Private Offices', 'Meeting Rooms', 'Kitchen', 'Lounge Area'],
    capacity: 80,
    openingHours: {
      weekdays: '7:00 AM - 10:00 PM',
      weekends: '8:00 AM - 6:00 PM'
    },
    featured: false,
    availableSeats: 20
  }
];

export const cities = ['Pune', 'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad'];

export const areas = {
  Pune: ['Koregaon Park', 'Hinjewadi', 'Kalyani Nagar', 'Viman Nagar', 'Baner', 'Aundh'],
  Mumbai: ['Bandra', 'Andheri', 'Powai', 'Lower Parel', 'BKC'],
  Bangalore: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Electronic City'],
  Delhi: ['Connaught Place', 'Nehru Place', 'Saket', 'Gurugram', 'Noida'],
  Hyderabad: ['Hitech City', 'Gachibowli', 'Jubilee Hills', 'Banjara Hills', 'Madhapur']
};

export const amenities = [
  'High-speed WiFi',
  'Meeting Rooms',
  'Conference Rooms',
  'Coffee & Tea',
  'Air Conditioning',
  'Printing Facilities',
  '24/7 Access',
  'Private Offices',
  'Gaming Zone',
  'Cafeteria',
  'Phone Booths',
  'Standing Desks',
  'Parking Space',
  'Reception Services',
  'Mail Handling',
  'Business Address'
];
