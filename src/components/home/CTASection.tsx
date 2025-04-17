
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to find your perfect workspace?
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of professionals who have found their ideal workspace through SpaceHub.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/spaces">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Explore Spaces
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
