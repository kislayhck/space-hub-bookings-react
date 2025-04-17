import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { StarRating } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { spaces } from "@/data/spaces";
import { 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  Wifi, 
  Coffee, 
  Printer, 
  Monitor, 
  Phone, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Building,
  Share2
} from "lucide-react";
import { FeaturedSpaces } from "@/components/spaces/FeaturedSpaces";
import { SpaceCard } from "@/components/spaces/SpaceCard";

const SpaceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const space = spaces.find(s => s.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'monthly'>('daily');
  
  if (!space) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Space not found</h1>
            <p className="text-gray-600 mb-8">
              The workspace you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/spaces">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse All Spaces</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get amenity icons
  const getAmenityIcon = (amenity: string) => {
    switch(amenity) {
      case 'High-speed WiFi': return <Wifi className="h-5 w-5 text-blue-600" />;
      case 'Coffee & Tea': return <Coffee className="h-5 w-5 text-blue-600" />;
      case 'Printing Facilities': return <Printer className="h-5 w-5 text-blue-600" />;
      case 'Meeting Rooms': return <Users className="h-5 w-5 text-blue-600" />;
      case 'Phone Booths': return <Phone className="h-5 w-5 text-blue-600" />;
      case '24/7 Access': return <Clock className="h-5 w-5 text-blue-600" />;
      default: return <CheckCircle className="h-5 w-5 text-blue-600" />;
    }
  };

  // Next/prev image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === space.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? space.images.length - 1 : prevIndex - 1
    );
  };

  // Other spaces in the same area
  const relatedSpaces = spaces
    .filter(s => s.id !== space.id && s.location.area === space.location.area)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-3 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/spaces" className="hover:text-blue-600">Spaces</Link>
              <span className="mx-2">/</span>
              <Link to={`/spaces?city=${space.location.city}`} className="hover:text-blue-600">{space.location.city}</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{space.name}</span>
            </div>
          </div>
        </div>
        
        {/* Space details */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Images and info */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{space.name}</h1>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <div className="flex items-center mb-6">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">{space.location.address}</span>
              </div>
              
              {/* Image gallery */}
              <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={space.images[currentImageIndex]}
                  alt={`${space.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-[400px] object-cover"
                />
                
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-700" />
                </button>
                
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  <ChevronRight className="h-5 w-5 text-gray-700" />
                </button>
                
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-white text-gray-700">
                    {currentImageIndex + 1} / {space.images.length}
                  </Badge>
                </div>
              </div>
              
              {/* Thumbnail gallery */}
              <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
                {space.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      currentImageIndex === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${space.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              
              {/* Tabs content */}
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">About this space</h2>
                    <p className="text-gray-700">{space.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Capacity: {space.capacity} people</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Available Seats: {space.availableSeats}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Weekdays: {space.openingHours.weekdays}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                      <span>Weekends: {space.openingHours.weekends}</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities">
                  <h2 className="text-xl font-semibold mb-4">Amenities & Services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
                    {space.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        {getAmenityIcon(amenity)}
                        <span className="ml-3">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-3xl font-bold">{space.rating.toFixed(1)}</div>
                        <StarRating rating={space.rating} size="lg" />
                        <div className="text-sm text-gray-500 mt-1">{space.reviewCount} reviews</div>
                      </div>
                      
                      <div className="ml-8">
                        <div className="space-y-1">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center">
                              <span className="text-sm w-2">{star}</span>
                              <div className="ml-2 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-400" 
                                  style={{ 
                                    width: `${
                                      Math.random() * 100 * (star / 3)
                                    }%` 
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Recent Reviews</h3>
                      <div className="space-y-6">
                        {[1, 2, 3].map((review) => (
                          <div key={review} className="border-b pb-6">
                            <div className="flex items-center mb-2">
                              <img 
                                src={`https://i.pravatar.cc/40?img=${review + 10}`} 
                                alt="Reviewer" 
                                className="rounded-full h-10 w-10 mr-3"
                              />
                              <div>
                                <div className="font-medium">User{review}</div>
                                <div className="text-gray-500 text-sm">Visited {review} month{review > 1 ? 's' : ''} ago</div>
                              </div>
                              <div className="ml-auto">
                                <StarRating rating={5 - (review % 2 ? 0.5 : 0)} size="sm" />
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. 
                              Sed cursus ante dapibus diam. Sed nisi.
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 text-center">
                        <Button variant="outline">View All Reviews</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="location">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="rounded-lg overflow-hidden h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
                      Interactive map would be displayed here
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Address</h3>
                    <p className="text-gray-700 mb-4">{space.location.address}</p>
                    
                    <h3 className="font-medium mb-2">Getting Here</h3>
                    <div className="space-y-2 text-gray-700">
                      <p>• 5 mins walk from {space.location.area} Metro Station</p>
                      <p>• Public parking available nearby (paid)</p>
                      <p>• Easy access to major highways</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right column - Booking and related */}
            <div className="lg:col-span-1">
              <Card className="mb-6 sticky top-20">
                <CardHeader>
                  <CardTitle>Book this space</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <Button 
                      variant={selectedPlan === 'daily' ? 'default' : 'outline'} 
                      className={`flex-1 mr-2 ${selectedPlan === 'daily' ? 'bg-blue-600' : ''}`}
                      onClick={() => setSelectedPlan('daily')}
                    >
                      Daily Pass
                    </Button>
                    <Button 
                      variant={selectedPlan === 'monthly' ? 'default' : 'outline'} 
                      className={`flex-1 ${selectedPlan === 'monthly' ? 'bg-blue-600' : ''}`}
                      onClick={() => setSelectedPlan('monthly')}
                    >
                      Monthly
                    </Button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-1">Price</div>
                    <div className="text-2xl font-bold">
                      ₹{selectedPlan === 'daily' ? space.price.daily : space.price.monthly}
                      <span className="text-sm text-gray-500 font-normal ml-1">
                        / {selectedPlan === 'daily' ? 'day' : 'month'}
                      </span>
                    </div>
                    {selectedPlan === 'monthly' && (
                      <div className="text-sm text-green-600 mt-1">
                        Save 20% compared to daily passes
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm text-gray-500 mb-2">Select Date</div>
                    <div className="border rounded-md p-3 text-center text-gray-400 bg-gray-50">
                      Date picker would be here
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-4">
                    Book Now
                  </Button>
                  
                  <div className="text-center text-sm text-gray-500">
                    <p>No payment required now</p>
                    <p>Free cancellation up to 24 hours before</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Have questions about this space or the booking process?
                  </p>
                  <Button variant="outline" className="w-full mb-2">
                    Contact Support
                  </Button>
                  <div className="text-sm text-gray-500 text-center">
                    Available Mon-Fri, 9am-6pm
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Related spaces */}
        {relatedSpaces.length > 0 && (
          <div className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">More Spaces in {space.location.area}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedSpaces.map((relatedSpace) => (
                  <SpaceCard key={relatedSpace.id} space={relatedSpace} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default SpaceDetailPage;
