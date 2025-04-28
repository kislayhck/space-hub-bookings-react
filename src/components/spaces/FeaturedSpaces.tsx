
import { Space } from "@/types";
import { SpaceCard } from "./SpaceCard";
import { useSpaces } from "@/hooks/useSpaces";
import { Skeleton } from "@/components/ui/skeleton";

interface FeaturedSpacesProps {
  title?: string;
  subtitle?: string;
}

export const FeaturedSpaces = ({ 
  title = "Featured Coworking Spaces", 
  subtitle = "Discover our most popular workspaces"
}: FeaturedSpacesProps) => {
  const { data: spaces, isLoading, error } = useSpaces();
  const featuredSpaces = spaces?.filter(space => space.featured).slice(0, 3) ?? [];
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-xl text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Show loading skeletons while data is being fetched
            [...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-full text-center text-red-600">
              Failed to load spaces. Please try again later.
            </div>
          ) : featuredSpaces.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No featured spaces available at the moment.
            </div>
          ) : (
            featuredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} featured={true} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
