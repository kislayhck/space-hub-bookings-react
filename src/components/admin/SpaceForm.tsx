
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Space } from "@/types";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAmenities } from "@/hooks/useAmenities";
import { spaceSchema, SpaceFormValues } from "./space-form/schema";
import { BasicDetails } from "./space-form/BasicDetails";
import { LocationDetails } from "./space-form/LocationDetails";
import { DescriptionField } from "./space-form/DescriptionField";
import { ImageUpload } from "./space-form/ImageUpload";
import { AmenitiesList } from "./space-form/AmenitiesList";
import { CapacityFields } from "./space-form/CapacityFields";
import { OperatingHours } from "./space-form/OperatingHours";
import { FeaturedToggle } from "./space-form/FeaturedToggle";
import { FormActions } from "./space-form/FormActions";
import { useSpaces } from "@/hooks/useSpaces";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface SpaceFormProps {
  initialData?: Space;
  onCancel: () => void;
}

export const SpaceForm = ({ initialData, onCancel }: SpaceFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  const { data: amenitiesList = [], isLoading: amenitiesLoading } = useAmenities();
  const { createSpace, updateSpace } = useSpaces();
  const { user } = useAuth();

  // Check if user is logged in
  if (!user) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p>Checking authentication...</p>
      </div>
    );
  }

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
    // Verify user is authenticated
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) {
      toast.error("You must be logged in to perform this action");
      return;
    }

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

      console.log("Submitting space data:", spaceData);
      
      if (initialData) {
        // Update existing space using the mutation
        await updateSpace.mutateAsync({
          id: initialData.id,
          spaceData
        });
      } else {
        // Create new space using the mutation
        await createSpace.mutateAsync(spaceData);
      }
      
      onCancel(); // Return to the list view
    } catch (error: any) {
      console.error("Error saving space:", error);
      toast.error(error.message || (initialData ? "Failed to update space" : "Failed to create space"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <BasicDetails />

          {/* Location */}
          <LocationDetails />

          {/* Description */}
          <DescriptionField />

          {/* Image Upload */}
          <ImageUpload 
            uploadedImages={uploadedImages}
            onImageChange={handleImageChange}
            imageFiles={imageFiles}
          />

          {/* Amenities Selection */}
          <AmenitiesList 
            amenitiesList={amenitiesList}
            isLoading={amenitiesLoading}
          />

          {/* Capacity */}
          <CapacityFields />

          {/* Operating Hours */}
          <OperatingHours />

          {/* Featured */}
          <FeaturedToggle />
        </div>

        {/* Form Actions */}
        <FormActions 
          isLoading={isLoading || createSpace.isPending || updateSpace.isPending}
          isUploading={isUploading}
          onCancel={onCancel}
          isEditing={!!initialData}
        />
      </form>
    </Form>
  );
};
