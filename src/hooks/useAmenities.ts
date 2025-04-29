
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
}

export function useAmenities() {
  const query = useQuery({
    queryKey: ['amenities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('amenities')
        .select('*');

      if (error) {
        console.error('Error fetching amenities:', error);
        throw new Error('Failed to fetch amenities');
      }

      return data as Amenity[];
    },
    retry: 2,
  });

  return query;
}
