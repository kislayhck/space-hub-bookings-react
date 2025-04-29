
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const OperatingHours = () => {
  const form = useFormContext();
  
  return (
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
  );
};
