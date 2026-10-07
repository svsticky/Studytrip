import { motion } from "framer-motion";

type Highlight = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
};

const recap = {
  destination: "Tokyo",
  dates: "11 – 22 April 2026",
  intro:
    "Last year we travelled to Tokyo for an unforgettable mix of technology, academia and Japanese culture. Here are some of the highlights.",
  sponsor: {
    name: "Keronic",
    image: "/keronic.jpg",
  },
};

const highlights: Highlight[] = [
  {
    title: "Company Visit",
    subtitle: "GrooveX",
    image: "/groovex.jpg",
    description:
      "A behind-the-scenes look at GrooveX: an afternoon of robotics and AI.",
  },
  {
    title: "University Visit",
    subtitle: "University of Tokyo",
    image: "/uTokyo.jpg",
    description:
      "A campus tour at one of Asia's top universities and meeting the students there.",
  },
  {
    title: "Home Base",
    subtitle: "Tokyo Ueno Youth Hostel",
    image: "/hostel_exterior.jpg",
    description:
      "Our stay in the heart of Tokyo, the perfect starting point to explore the city.",
  },
];

export default function Recap() {
  return (
    <section className="w-full bg-gray-50">
      {/* Banner */}
      <div
        className="relative h-56 md:h-80 w-full flex items-center justify-center overflow-hidden"
        style={{
          background: "url(/header.jpg) center center / cover no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <div className="relative text-center px-4">
          <p className="uppercase tracking-[0.3em] text-sm text-white/80">
            Recap
          </p>
          <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg mt-2">
            {recap.destination} 2026
          </h2>
          <p className="text-white/80 mt-2 md:text-lg">{recap.dates}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          {recap.intro}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((h, idx) => (
            <motion.div
              key={h.subtitle}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                src={h.image}
                alt={h.subtitle}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-6">
                <h3 className="text-xl font-bold text-white">{h.title}</h3>
                <h3 className="text-2xl font-bold text-white">{h.subtitle}</h3>
                <p className="text-white/90">{h.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-gray-600">
            Thanks to our sponsor for making the 2026 trip possible:
          </p>
          <img
            src={recap.sponsor.image}
            alt={recap.sponsor.name}
            className="h-24 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
