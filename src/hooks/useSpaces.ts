
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Space } from '@/types';

export function useSpaces() {
  return useQuery({
    queryKey: ['spaces'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spaces')
        .select('*');

      if (error) {
        console.error('Error fetching spaces:', error);
        throw new Error('Failed to fetch spaces');
      }

      // Transform the data from Supabase to match our Space interface
      return data?.map(item => ({
        id: item.id,
        name: item.name,
        location: {
          address: item.location.address,
          city: item.location.city,
          area: item.location.area,
        },
        description: item.description || '',
        price: {
          daily: item.price.daily,
          monthly: item.price.monthly,
        },
        rating: item.rating || 0,
        reviewCount: item.review_count || 0,
        images: item.images || [],
        amenities: item.amenities || [],
        capacity: item.capacity || 0,
        openingHours: {
          weekdays: item.opening_hours.weekdays,
          weekends: item.opening_hours.weekends,
        },
        featured: item.featured || false,
        availableSeats: item.available_seats || 0,
      })) as Space[];
    }
  });
}
