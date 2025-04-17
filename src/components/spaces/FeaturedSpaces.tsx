
import { Space } from "@/types";
import { SpaceCard } from "./SpaceCard";

interface FeaturedSpacesProps {
  spaces: Space[];
  title?: string;
  subtitle?: string;
}

export const FeaturedSpaces = ({ 
  spaces, 
  title = "Featured Coworking Spaces", 
  subtitle = "Discover our most popular workspaces"
}: FeaturedSpacesProps) => {
  const featuredSpaces = spaces.filter(space => space.featured).slice(0, 3);
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};
