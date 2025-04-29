
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";

export const DescriptionField = () => {
  const form = useFormContext();

  return (
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
  );
};
