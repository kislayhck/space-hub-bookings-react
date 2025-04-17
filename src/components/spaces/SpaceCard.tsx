
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { MapPin, Users, Wifi, Coffee } from "lucide-react";
import { Space } from "@/types";
import { Button } from "@/components/ui/button";


interface SpaceCardProps {
  space: Space;
  featured?: boolean;
}

export const SpaceCard = ({ space, featured = false }: SpaceCardProps) => {
  const displayAmenities = space.amenities.slice(0, 3);
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg", 
      featured ? "border-blue-200" : ""
    )}>
      <div className="relative">
        <Link to={`/spaces/${space.id}`}>
          <img
            src={space.images[0]}
            alt={space.name}
            className="h-48 w-full object-cover"
          />
        </Link>
        {featured && (
          <Badge className="absolute top-2 right-2 bg-blue-600">
            Featured
          </Badge>
        )}
        {space.availableSeats < 10 && (
          <Badge className="absolute top-2 left-2 bg-orange-600">
            Only {space.availableSeats} seats left
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <Link to={`/spaces/${space.id}`} className="hover:underline">
              <h3 className="font-semibold text-lg line-clamp-1">{space.name}</h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <span className="line-clamp-1">{space.location.area}, {space.location.city}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-blue-600">₹{space.price.daily}</p>
            <p className="text-xs text-gray-500">per day</p>
          </div>
        </div>
        
        <div className="mt-3 flex items-center">
          <StarRating rating={space.rating} />
          <span className="ml-2 text-sm text-gray-500">
            {space.rating} ({space.reviewCount} reviews)
          </span>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {displayAmenities.map((amenity) => (
              <Badge key={amenity} variant="outline" className="bg-gray-50">
                {amenity === 'High-speed WiFi' ? (
                  <><Wifi className="h-3 w-3 mr-1" /> WiFi</>
                ) : amenity === 'Coffee & Tea' ? (
                  <><Coffee className="h-3 w-3 mr-1" /> Coffee & Tea</>
                ) : amenity}
              </Badge>
            ))}
            {space.amenities.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{space.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          <span>Capacity: {space.capacity}</span>
        </div>
        <Link to={`/spaces/${space.id}`}>
          <Button className="bg-blue-600 hover:bg-blue-700">View Space</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

import { cn } from "@/lib/utils";
