
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";

const defaultAmenities = [
  { name: "High-speed WiFi", icon: "wifi" },
  { name: "Coffee & Tea", icon: "coffee" },
  { name: "Meeting Rooms", icon: "users" },
  { name: "24/7 Access", icon: "clock" },
  { name: "Printing Services", icon: "printer" },
  { name: "Phone Booths", icon: "phone" },
  { name: "Parking", icon: "car" },
  { name: "Bike Storage", icon: "bicycle" },
  { name: "Shower Facilities", icon: "droplet" },
  { name: "Outdoor Space", icon: "sun" },
];

export function InitializeAmenities() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInitializeAmenities = async () => {
    setIsLoading(true);
    try {
      // First check if amenities already exist
      const { data: existingAmenities } = await supabase
        .from('amenities')
        .select('id')
        .limit(1);
      
      if (existingAmenities && existingAmenities.length > 0) {
        toast.info("Amenities are already set up");
        setIsLoading(false);
        return;
      }

      // Add default amenities
      const { error } = await supabase
        .from('amenities')
        .insert(defaultAmenities);
      
      if (error) {
        console.error('Error creating amenities:', error);
        toast.error(`Failed to create amenities: ${error.message}`);
        return;
      }
      
      toast.success("Default amenities have been created successfully");
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleInitializeAmenities} 
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="flex items-center gap-1"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <PlusCircle className="h-4 w-4 mr-2" />
      )}
      Initialize Default Amenities
    </Button>
  );
}
