
import { StarRating } from "@/components/ui/star-rating";

const testimonials = [
  {
    id: 1,
    content:
      "I've been using SpaceHub for the past 6 months and it's transformed how I work. The flexible booking options let me choose workspaces based on my changing needs.",
    author: {
      name: "Sarah Thompson",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    rating: 5,
  },
  {
    id: 2,
    content:
      "As a startup founder, SpaceHub provides exactly what we need - professional workspace without the overhead of a long-term lease. The networking opportunities are invaluable.",
    author: {
      name: "Rahul Mehta",
      role: "Tech Startup Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    rating: 4.5,
  },
  {
    id: 3,
    content:
      "The meeting rooms are perfect for client presentations, and the daily pass option gives me flexibility when I need to work away from home. Excellent WiFi and great coffee!",
    author: {
      name: "Priya Sharma",
      role: "Marketing Consultant",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Members Say</h2>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of professionals who've found their perfect workspace
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <StarRating rating={testimonial.rating} className="mb-4" />
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-4"
                  src={testimonial.author.image}
                  alt={testimonial.author.name}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{testimonial.author.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/testimonials"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            View all testimonials
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
