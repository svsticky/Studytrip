type TripInfo = {
  title: string;
  description: string;
};

const tripInfo: TripInfo = {
  title: "Are you ready?",
  description:
    "Join us for an unforgettable academic and cultural journey to Tokyo! Explore cutting-edge technology companies, visit the university of Tokyo, and discover Japan’s incredible culture.",
};

export default function TripInfo() {
  return (
    <section className="w-full bg-blue-50 py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">{tripInfo.title}</h1>
        <p className="text-lg text-gray-600 mb-6">{tripInfo.description}</p>

        <img
          src="sushi_cat.png"
          alt="kawaii cat"
          className="absolute left-1/2 -translate-x-1/2 w-24
                       transition-all duration-500 
                       translate-y-4 group-hover:-translate-y-2"
        />
      </div>
    </section>
  );
}
