import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

const reviews = [
  {
    name: "John Doe",
    text: "Great product! Highly recommend it to everyone.",
    rating: 5,
  },
  {
    name: "John Doe",
    text: "Great product! Highly recommend it to everyone.",
    rating: 5,
  },
  {
    name: "John Doe",
    text: "Great product! Highly recommend it to everyone.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    text: "Good value for the price. Would buy again.",
    rating: 4,
  },
  {
    name: "Sam Wilson",
    text: "Average experience, could be improved.",
    rating: 3,
  },
];

const ReviewsSection = () => {
  return (
    <section className="bg-bgBlack py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-6">
      User <span className="text-blue-600">Reviews</span>
    </h2>
    <Carousel className="">
      <CarouselContent className="">
        {reviews.map((review, index) => (
          <CarouselItem key={index} className="sm:basis-1/3">
            <div className="bg-inputBg p-6 rounded-lg h-full shadow-md">
              <h3 className="text-lg font-semibold mb-2">{review.name}</h3>
              <p className="text-white mb-4">{review.text}</p>
              <div className="flex items-center">
                {[...Array(5)].map((star, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill={i < review.rating ? 'yellow' : 'white'}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.175 0l-3.39 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118l-3.39-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                ))}
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:block" />
      <CarouselNext className="hidden sm:block" />
    </Carousel>
  </div>
</section>

  );
};

export default ReviewsSection;
