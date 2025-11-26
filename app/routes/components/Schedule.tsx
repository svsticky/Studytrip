import { motion } from "framer-motion";

type ScheduleItem = {
  date: string;
  title: string;
  text: string;
  image: string;
};

const schedule: ScheduleItem[] = [
  {
    date: "December 12th",
    title: "Sign up deadline",
    image: "/deadline.jpg",
    text: "Make sure to sign up before 12th December 23:59:59",
  },
  {
    date: "December 18th",
    title: "Participants drinks",
    image: "/contract.jpg",
    text: "At the first participants drinks you will sign the contract and vote for the daytrip",
  },
  {
    date: "To be determined",
    title: "Lunch lectures",
    image: "/lecture.jpg",
    text: "We will attend sponsor lectures. The dates are yet to be determined",
  },
  {
    date: "April 11th",
    title: "Departure",
    image: "/departure.jpg",
    text: "We depart from Amsterdam to Tokyo.",
  },
  {
    date: "April 15th",
    title: "Company Visit — GrooveX",
    image: "/groovex.jpg",
    text: "An afternoon of robotics and AI.",
  },
  {
    date: "April 22th",
    title: "Arrival in Netherlands",
    image: "/netherlands.jpg",
    text: "We return home safe and sound after a spectacular trip to Tokyo.",
  },
];

export default function Schedule() {
  return (
    <section className="w-full bg-blue-50 py-20">
      <div className="max-w-5xl mx-auto px-6 relative">
        <h2 className="text-3xl font-bold text-center mb-16">Schedule</h2>

        {schedule.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0 }}
            className="mb-12 ml-6 relative"
          >
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-6">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <p className="text-sm text-gray-500">{item.date}</p>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-700 mt-2">{item.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
