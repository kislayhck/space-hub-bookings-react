
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const starClass = sizeClasses[size];

  return (
    <div className={cn("flex", className)}>
      {[...Array(maxRating)].map((_, i) => {
        // For each star, determine if it should be filled, half-filled, or empty
        const value = i + 1;
        const filled = rating >= value;
        const halfFilled = rating >= value - 0.5 && rating < value;

        return (
          <Star
            key={i}
            className={cn(
              starClass,
              filled ? "text-yellow-400 fill-yellow-400" : 
              halfFilled ? "text-yellow-400 fill-yellow-400 half-star" : 
              "text-gray-300"
            )}
          />
        );
      })}
    </div>
  );
};
