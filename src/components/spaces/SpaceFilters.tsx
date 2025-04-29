
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterOptions } from "@/types";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";

interface SpaceFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  availableAreas: string[];
  availableAmenities: string[];
  maxPrice: number;
}

export const SpaceFilters = ({ 
  filters, 
  onFilterChange, 
  availableAreas, 
  availableAmenities,
  maxPrice = 1000
}: SpaceFiltersProps) => {
  const [expanded, setExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(filters.area);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(filters.amenities);

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setPriceRange(newRange);
  };

  const handleAreaToggle = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      ...filters,
      area: selectedAreas,
      priceRange,
      amenities: selectedAmenities
    });
  };

  const resetFilters = () => {
    const newFilters = {
      ...filters,
      area: [],
      priceRange: [0, maxPrice],
      amenities: []
    };
    
    setSelectedAreas([]);
    setPriceRange([0, maxPrice]);
    setSelectedAmenities([]);
    
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg border p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Filter className="h-5 w-5 mr-2 text-blue-600" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center p-0 h-8"
        >
          {expanded ? (
            <>
              <span className="mr-1 text-sm">Less</span>
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              <span className="mr-1 text-sm">More</span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <div className="space-y-4">
        {/* Basic filters always visible */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="price-range">Price Range (₹ per day)</Label>
            <div className="pt-4 pb-2">
              <Slider
                value={[priceRange[0], priceRange[1]]}
                min={0}
                max={maxPrice}
                step={50}
                onValueChange={handlePriceChange}
                className="my-4"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">₹{priceRange[0]}</span>
              <span className="text-sm text-gray-500">₹{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Expanded filters */}
        {expanded && (
          <div className="space-y-4 pt-2 border-t">
            {/* Areas */}
            <div>
              <Label className="mb-2 block">Areas</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`area-${area}`}
                      checked={selectedAreas.includes(area)}
                      onCheckedChange={() => handleAreaToggle(area)}
                    />
                    <label 
                      htmlFor={`area-${area}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <Label className="mb-2 block">Amenities</Label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {availableAmenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`}
                      checked={selectedAmenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <label 
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 flex space-x-2">
          <Button
            onClick={applyFilters}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
          <Button
            onClick={resetFilters}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
