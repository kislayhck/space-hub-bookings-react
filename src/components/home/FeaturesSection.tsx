
import { Wifi, Coffee, Clock, Users, MapPin, Shield } from "lucide-react";

const features = [
  {
    name: "No Commitments",
    description:
      "Book workspaces by the day or month with no long-term commitments required.",
    icon: Clock,
  },
  {
    name: "Premium Amenities",
    description:
      "Enjoy high-speed WiFi, coffee, meeting rooms, and more at all our locations.",
    icon: Coffee,
  },
  {
    name: "Multiple Locations",
    description:
      "Access coworking spaces in various prime locations across major cities.",
    icon: MapPin,
  },
  {
    name: "Community Access",
    description:
      "Join a community of professionals, entrepreneurs, and freelancers.",
    icon: Users,
  },
  {
    name: "High-Speed Internet",
    description:
      "Stay connected with reliable, high-speed internet at all our spaces.",
    icon: Wifi,
  },
  {
    name: "Secure Environment",
    description:
      "Work in a secure environment with controlled access and 24/7 security.",
    icon: Shield,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose SpaceHub</h2>
          <p className="mt-4 text-xl text-gray-600">
            Flexible workspaces designed for productivity and collaboration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-base text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
