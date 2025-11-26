import { motion } from "framer-motion";

type Activity = {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
};

const activities: Activity[] = [
  {
    title: "Company Visit",
    subtitle: "GrooveX",
    image: "/groovex.jpg",
    description:
      "Get an exclusive behind-the-scenes look at GrooveX and witness the future of robotics and AI in action..",
  },
  {
    title: "University Visit",
    subtitle: "University of Tokyo",
    image: "/uTokyo.jpg",
    description:
      "Explore one of Asia's top universities with a campus tour and meet the students there!",
  },
  {
    title: "Day Trip",
    subtitle: "To be decided",
    image: "/disneyland.jpg",
    description:
      "We will vote on the day trip once participants are confirmed.",
  },
];

export default function Activities() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Activities</h2>

        <p className="text-lg text-center text-gray-600 mb-10">
          During the studytrip there are plenty of opportunities to explore
          Tokyo. But there are also organized activites by the committee.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {activities.map((a, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative rounded-3xl overflow-hidden shadow-lg group"
            >
              <img
                aria-label={a.title}
                src={a.image}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-6">
                <h3 className="text-xl font-bold text-white">{a.title}</h3>
                <h3 className="text-2xl font-bold text-white">{a.subtitle}</h3>
                <p className="text-white/90">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
