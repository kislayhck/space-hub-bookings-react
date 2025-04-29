
import { useState, useEffect } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useAmenities } from "@/hooks/useAmenities";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  amenities: z.array(z.string()),
  weekday_opening: z.string().min(1, "Weekday opening time is required"),
  weekday_closing: z.string().min(1, "Weekday closing time is required"),
  weekend_opening: z.string().min(1, "Weekend opening time is required"),
  weekend_closing: z.string().min(1, "Weekend closing time is required"),
  featured: z.boolean().default(false),
});

type SpaceFormValues = z.infer<typeof spaceSchema>;

export const SpaceForm = ({ initialData, onCancel }: SpaceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const { data: amenitiesList = [], isLoading: amenitiesLoading } = useAmenities();

  // Prepare initial form values if editing
  const defaultValues: SpaceFormValues = {
    name: initialData?.name || "",
    address: initialData?.location.address || "",
    city: initialData?.location.city || "",
    area: initialData?.location.area || "",
    description: initialData?.description || "",
    daily_price: initialData?.price.daily || 0,
    monthly_price: initialData?.price.monthly || 0,
    capacity: initialData?.capacity || 0,
    available_seats: initialData?.availableSeats || 0,
    amenities: initialData?.amenities || [],
    weekday_opening: initialData?.openingHours.weekdays.split(" - ")[0] || "09:00",
    weekday_closing: initialData?.openingHours.weekdays.split(" - ")[1] || "18:00",
    weekend_opening: initialData?.openingHours.weekends.split(" - ")[0] || "10:00",
    weekend_closing: initialData?.openingHours.weekends.split(" - ")[1] || "16:00",
    featured: initialData?.featured || false,
  };

  const form = useForm<SpaceFormValues>({
    resolver: zodResolver(spaceSchema),
    defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) {
      return uploadedImages;
    }

    setIsUploading(true);
    const urls: string[] = [...uploadedImages];

    try {
      for (const file of imageFiles) {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const { data, error } = await supabase.storage
          .from('spaces')
          .upload(fileName, file);

        if (error) {
          throw error;
        }

        // Get the public URL for the uploaded file
        const { data: { publicUrl } } = supabase
          .storage
          .from('spaces')
          .getPublicUrl(fileName);

        urls.push(publicUrl);
      }

      return urls;
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Failed to upload images');
      return uploadedImages;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (values: SpaceFormValues) => {
    setIsLoading(true);
    
    try {
      // Upload images first
      const imageUrls = await uploadImages();
      
      // Prepare opening hours format
      const weekdayHours = `${values.weekday_opening} - ${values.weekday_closing}`;
      const weekendHours = `${values.weekend_opening} - ${values.weekend_closing}`;
      
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
        images: imageUrls,
        amenities: values.amenities,
        opening_hours: {
          weekdays: weekdayHours,
          weekends: weekendHours,
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
          {/* Basic Information */}
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

          {/* Location */}
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

          {/* Description */}
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

          {/* Image Upload */}
          <div className="col-span-full space-y-2">
            <FormLabel>Images</FormLabel>
            <div className="border border-dashed rounded-md p-6 bg-gray-50">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="h-8 w-8 text-gray-400" />
                <div className="text-sm text-center text-gray-500">
                  <label htmlFor="image-upload" className="cursor-pointer text-blue-600 hover:underline">
                    Click to upload
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <p className="mt-1">or drag and drop image files</p>
                </div>
              </div>
            </div>
            {/* Preview selected files */}
            {(imageFiles.length > 0 || uploadedImages.length > 0) && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Images:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {uploadedImages.map((url, index) => (
                    <div key={`uploaded-${index}`} className="relative h-24 rounded-md overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Uploaded ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                  {imageFiles.map((file, index) => (
                    <div key={`file-${index}`} className="relative h-24 rounded-md overflow-hidden">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt={`Selected ${index}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Amenities Selection */}
          <div className="col-span-full space-y-2">
            <FormLabel>Amenities</FormLabel>
            <FormDescription>Select all the amenities available at this space.</FormDescription>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {amenitiesLoading ? (
                <div className="col-span-full flex justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
              ) : (
                amenitiesList.map((amenity) => (
                  <FormField
                    key={amenity.id}
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem 
                        key={amenity.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(amenity.name)}
                            onCheckedChange={(checked) => {
                              const current = [...field.value || []];
                              if (checked) {
                                if (!current.includes(amenity.name)) {
                                  field.onChange([...current, amenity.name]);
                                }
                              } else {
                                field.onChange(
                                  current.filter((value) => value !== amenity.name)
                                );
                              }
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {amenity.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))
              )}
            </div>
            <FormMessage />
          </div>

          {/* Capacity */}
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

          {/* Operating Hours */}
          <div className="col-span-full">
            <h3 className="text-lg font-medium mb-4">Operating Hours</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Weekday Hours */}
              <div>
                <FormLabel className="mb-2 block">Weekday Hours</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weekday_opening"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening</FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weekday_closing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing</FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {/* Weekend Hours */}
              <div>
                <FormLabel className="mb-2 block">Weekend Hours</FormLabel>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="weekend_opening"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Opening</FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="weekend_closing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Closing</FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Featured */}
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
          <Button variant="outline" onClick={onCancel} disabled={isLoading || isUploading}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || isUploading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {(isLoading || isUploading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Space" : "Create Space"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
