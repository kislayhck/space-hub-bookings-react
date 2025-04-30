
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Space } from '@/types';
import { toast } from "sonner";

export function useSpaces() {
  const queryClient = useQueryClient();

  const query = useQuery({
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
          address: (item.location as any)?.address || '',
          city: (item.location as any)?.city || '',
          area: (item.location as any)?.area || '',
        },
        description: item.description || '',
        price: {
          daily: (item.price as any)?.daily || 0,
          monthly: (item.price as any)?.monthly || 0,
        },
        rating: item.rating || 0,
        reviewCount: item.review_count || 0,
        images: item.images || [],
        amenities: item.amenities || [],
        capacity: item.capacity || 0,
        openingHours: {
          weekdays: (item.opening_hours as any)?.weekdays || '',
          weekends: (item.opening_hours as any)?.weekends || '',
        },
        featured: item.featured || false,
        availableSeats: item.available_seats || 0,
      })) as Space[];
    },
    // Retry twice if the fetch fails
    retry: 2,
  });

  // Add a createSpace mutation
  const createSpace = useMutation({
    mutationFn: async (spaceData: any) => {
      // Check user authentication status
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      // Detailed logging for debugging
      console.log('Session data:', sessionData);
      
      if (sessionError || !sessionData.session) {
        console.error('Authentication error:', sessionError);
        throw new Error('You must be logged in to create a space');
      }
      
      console.log('Creating space with user:', sessionData.session.user.id);
      
      // Debug the space data being sent
      console.log('Space data to insert:', spaceData);
      
      const { data, error } = await supabase
        .from('spaces')
        .insert([spaceData])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating space:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate spaces query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      toast.success("Space created successfully");
    },
    onError: (error) => {
      console.error('Error creating space:', error);
      toast.error(`Failed to create space: ${error.message}`);
    }
  });

  // Mutation to update a space
  const updateSpace = useMutation({
    mutationFn: async ({ id, spaceData }: { id: string; spaceData: any }) => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        console.error('Authentication error:', sessionError);
        throw new Error('You must be logged in to update a space');
      }
      
      const { data, error } = await supabase
        .from('spaces')
        .update(spaceData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      return data;
    },
    onSuccess: () => {
      // Invalidate spaces query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      toast.success("Space updated successfully");
    },
    onError: (error) => {
      console.error('Error updating space:', error);
      toast.error(`Failed to update space: ${error.message}`);
    }
  });

  // Mutation to delete a space
  const deleteSpace = useMutation({
    mutationFn: async (id: string) => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        console.error('Authentication error:', sessionError);
        throw new Error('You must be logged in to delete a space');
      }
      
      const { error } = await supabase
        .from('spaces')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      // Invalidate spaces query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      toast.success("Space deleted successfully");
    },
    onError: (error) => {
      console.error('Error deleting space:', error);
      toast.error(`Failed to delete space: ${error.message}`);
    }
  });

  // Function to invalidate the spaces query
  const invalidateSpaces = () => {
    queryClient.invalidateQueries({ queryKey: ['spaces'] });
  };

  return {
    ...query,
    createSpace,
    updateSpace,
    deleteSpace,
    invalidateSpaces,
  };
}
