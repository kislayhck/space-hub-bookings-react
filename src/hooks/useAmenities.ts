
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Amenity {
  id: string;
  name: string;
  icon: string | null;
}

export function useAmenities() {
  const query = useQuery({
    queryKey: ['amenities'],
    queryFn: async () => {
      console.log('Fetching amenities...');
      const { data, error } = await supabase
        .from('amenities')
        .select('*');

      if (error) {
        console.error('Error fetching amenities:', error);
        toast.error('Failed to load amenities');
        throw new Error('Failed to fetch amenities');
      }

      console.log('Amenities data:', data);
      if (!data || data.length === 0) {
        console.warn('No amenities found in the database');
      }

      return data as Amenity[];
    },
    retry: 2,
  });

  return query;
}
