
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cities } from "@/data/spaces";
import { useState } from "react";

export const HeroSection = () => {
  const [selectedCity, setSelectedCity] = useState("Pune");

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="relative pt-12 pb-16 sm:pt-16 sm:pb-24 lg:pt-24 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Find your perfect <span className="text-blue-600">workspaces</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl">
                Book flexible coworking spaces, meeting rooms, and private offices across India. 
                Daily passes or monthly memberships - work your way.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-64">
                  <Select
                    value={selectedCity}
                    onValueChange={setSelectedCity}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Link to={`/spaces?city=${selectedCity}`}>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Find Workspace
                  </Button>
                </Link>
              </div>
              
              <div className="mt-8">
                <p className="text-sm font-medium text-gray-500">Popular searches:</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Daily Passes", "Meeting Rooms", "High-speed WiFi", "Private Offices", "24/7 Access"].map((tag) => (
                    <Link 
                      key={tag} 
                      to={`/spaces?amenity=${encodeURIComponent(tag)}`}
                      className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm hover:bg-gray-200"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2"
                  alt="Modern coworking space" 
                  className="rounded-lg shadow-xl h-[500px] w-full object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-72 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-start space-x-4">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9"
                      alt="User" 
                      className="h-12 w-12 rounded-full"
                    />
                    <div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <p className="mt-1 text-gray-800 font-medium">"Perfect for remote work, great amenities!"</p>
                      <p className="text-gray-600 text-sm mt-1">Sarah T. - Freelance Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
