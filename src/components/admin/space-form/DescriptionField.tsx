
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

export const DescriptionField = () => {
  const form = useFormContext();
  const [characterCount, setCharacterCount] = useState(0);

  // Initialize character count on component mount
  useEffect(() => {
    const currentValue = form.getValues("description") as string;
    setCharacterCount(currentValue ? currentValue.length : 0);
  }, [form]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharacterCount(e.target.value.length);
  };

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="col-span-full">
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Enter a detailed description of the space including features, ambiance, and surroundings" 
              className="min-h-32 resize-y" 
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleTextChange(e);
              }}
            />
          </FormControl>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Use markdown for formatting (# Headers, *italic*, **bold**)</span>
            <span>{characterCount} characters</span>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
