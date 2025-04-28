
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

      return data as Space[];
    }
  });
}
