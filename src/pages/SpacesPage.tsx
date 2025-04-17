
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SpaceCard } from "@/components/spaces/SpaceCard";
import { SpaceFilters } from "@/components/spaces/SpaceFilters";
import { spaces } from "@/data/spaces";
import { Space, FilterOptions } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SpacesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cityParam = queryParams.get("city");

  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(spaces);
  const [currentPage, setCurrentPage] = useState(1);
  const spacesPerPage = 6;
  
  const [filters, setFilters] = useState<FilterOptions>({
    city: cityParam || "Pune",
    area: [],
    priceRange: [0, 1000],
    amenities: []
  });

  useEffect(() => {
    if (cityParam) {
      setFilters(prev => ({
        ...prev,
        city: cityParam
      }));
    }
  }, [cityParam]);

  useEffect(() => {
    // Apply filters
    let result = [...spaces];
    
    // Filter by city
    if (filters.city) {
      result = result.filter(space => space.location.city === filters.city);
    }
    
    // Filter by area
    if (filters.area.length > 0) {
      result = result.filter(space => filters.area.includes(space.location.area));
    }
    
    // Filter by price range
    result = result.filter(
      space => space.price.daily >= filters.priceRange[0] && space.price.daily <= filters.priceRange[1]
    );
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter(space => 
        filters.amenities.every(amenity => space.amenities.includes(amenity))
      );
    }
    
    setFilteredSpaces(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Pagination logic
  const indexOfLastSpace = currentPage * spacesPerPage;
  const indexOfFirstSpace = indexOfLastSpace - spacesPerPage;
  const currentSpaces = filteredSpaces.slice(indexOfFirstSpace, indexOfLastSpace);
  const totalPages = Math.ceil(filteredSpaces.length / spacesPerPage);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Coworking Spaces in {filters.city}</h1>
            <p className="mt-2 text-gray-600">
              Find and book the perfect workspace for your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with filters */}
            <div className="lg:col-span-1">
              <SpaceFilters filters={filters} onFilterChange={handleFilterChange} />
            </div>
            
            {/* Main content with spaces */}
            <div className="lg:col-span-3">
              {currentSpaces.length > 0 ? (
                <>
                  <div className="mb-4 flex justify-between items-center">
                    <p className="text-gray-600">
                      Showing {indexOfFirstSpace + 1}-{Math.min(indexOfLastSpace, filteredSpaces.length)} of {filteredSpaces.length} spaces
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Sort by:</span>
                      <select className="text-sm border-gray-300 rounded-md">
                        <option>Relevance</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {currentSpaces.map((space) => (
                      <SpaceCard key={space.id} space={space} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i}
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          className={currentPage === i + 1 ? "bg-blue-600" : ""}
                          size="icon"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No spaces found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to find available spaces.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpacesPage;
