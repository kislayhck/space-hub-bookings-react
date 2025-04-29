
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Amenity } from "@/hooks/useAmenities";

interface AmenitiesListProps {
  amenitiesList: Amenity[];
  isLoading: boolean;
}

export const AmenitiesList = ({ amenitiesList, isLoading }: AmenitiesListProps) => {
  const form = useFormContext();
  
  return (
    <div className="col-span-full space-y-2">
      <FormLabel>Amenities</FormLabel>
      <FormDescription>Select all the amenities available at this space.</FormDescription>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
        {isLoading ? (
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
  );
};
