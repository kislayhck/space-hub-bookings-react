
import { z } from "zod";

// Form validation schema
export const spaceSchema = z.object({
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

export type SpaceFormValues = z.infer<typeof spaceSchema>;
