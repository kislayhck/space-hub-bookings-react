
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Space } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface SpaceFormProps {
  initialData?: Space;
  onCancel: () => void;
}

// Form validation schema
const spaceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().min(1, "Area is required"),
  description: z.string().min(1, "Description is required"),
  daily_price: z.coerce.number().min(1, "Daily price is required"),
  monthly_price: z.coerce.number().min(1, "Monthly price is required"),
  capacity: z.coerce.number().min(1, "Capacity is required"),
  available_seats: z.coerce.number().min(0, "Available seats must be a positive number"),
  images: z.string(),
  amenities: z.string(),
  weekday_hours: z.string().min(1, "Weekday hours are required"),
  weekend_hours: z.string().min(1, "Weekend hours are required"),
  featured: z.boolean().default(false),
});

type SpaceFormValues = z.infer<typeof spaceSchema>;

export const SpaceForm = ({ initialData, onCancel }: SpaceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Prepare initial form values if editing
  const defaultValues: SpaceFormValues = initialData
    ? {
        name: initialData.name,
        address: initialData.location.address,
        city: initialData.location.city,
        area: initialData.location.area,
        description: initialData.description,
        daily_price: initialData.price.daily,
        monthly_price: initialData.price.monthly,
        capacity: initialData.capacity,
        available_seats: initialData.availableSeats,
        images: initialData.images.join(","),
        amenities: initialData.amenities.join(","),
        weekday_hours: initialData.openingHours.weekdays,
        weekend_hours: initialData.openingHours.weekends,
        featured: initialData.featured,
      }
    : {
        name: "",
        address: "",
        city: "",
        area: "",
        description: "",
        daily_price: 0,
        monthly_price: 0,
        capacity: 0,
        available_seats: 0,
        images: "",
        amenities: "",
        weekday_hours: "",
        weekend_hours: "",
        featured: false,
      };

  const form = useForm<SpaceFormValues>({
    resolver: zodResolver(spaceSchema),
    defaultValues,
  });

  const onSubmit = async (values: SpaceFormValues) => {
    setIsLoading(true);
    
    try {
      // Prepare data for Supabase
      const spaceData = {
        name: values.name,
        description: values.description,
        location: {
          address: values.address,
          city: values.city,
          area: values.area,
        },
        price: {
          daily: values.daily_price,
          monthly: values.monthly_price,
        },
        capacity: values.capacity,
        available_seats: values.available_seats,
        images: values.images.split(",").map(img => img.trim()),
        amenities: values.amenities.split(",").map(amenity => amenity.trim()),
        opening_hours: {
          weekdays: values.weekday_hours,
          weekends: values.weekend_hours,
        },
        featured: values.featured,
      };
      
      let response;
      
      if (initialData) {
        // Update existing space
        response = await supabase
          .from("spaces")
          .update(spaceData)
          .eq("id", initialData.id);
      } else {
        // Insert new space
        response = await supabase
          .from("spaces")
          .insert([spaceData]);
      }
      
      if (response.error) {
        throw response.error;
      }
      
      toast.success(
        initialData ? "Space updated successfully" : "Space created successfully"
      );
      onCancel(); // Return to the list view
    } catch (error) {
      console.error("Error saving space:", error);
      toast.error(
        initialData
          ? "Failed to update space"
          : "Failed to create space"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Space Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter space name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="daily_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="monthly_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Price (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter space description" 
                    className="min-h-32" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Images URLs</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter image URLs separated by commas" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter amenities separated by commas (e.g., WiFi, Coffee, Meeting Rooms)" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available_seats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Seats</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="weekday_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekday Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 9:00 AM - 6:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weekend_hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weekend Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 10:00 AM - 4:00 PM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Featured Space
                  </FormLabel>
                  <div className="text-sm text-muted-foreground">
                    This space will appear in the featured section
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Space" : "Create Space"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
