import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type CostItem = {
  title: string;
  value?: string | number;
  description?: string;
  items?: string[];
  color?: string;
};

const costs: CostItem[] = [
  {
    title: "What's Included",
    items: [
      "✈️ Round-trip flights",
      "🏨 Hostel accommodation",
      "🏢 Company visits & university tour",
      "🎫 Day trip",
      "🌸 Cherry blossom season",
    ],
    color: "bg-white",
  },
  {
    title: "Total Cost",
    value: "€1.149",
    description: "All-inclusive price for the full trip",
    color: "bg-white",
  },
  {
    title: "Your Savings",
    value: 200,
    description: "Compared to booking flights, hostel and daytrip yourself",
    color: "bg-white",
  },
];

export default function Costs() {
  const [animatedSavings, setAnimatedSavings] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = costs[2].value as number;
    const duration = 1500;
    const increment = end / (duration / 20);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setAnimatedSavings(Math.floor(start));
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          Costs & Benefits
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {costs.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-3xl overflow-hidden shadow-lg p-6 ${c.color || "bg-gray-50"}`}
            >
              <h3 className="text-xl font-bold mb-4 text-red-800">{c.title}</h3>

              {c.value && idx === 2 ? (
                <p className="text-4xl font-bold mb-2 text-green-800">
                  €{animatedSavings}+
                </p>
              ) : (
                c.value && <p className="text-4xl font-bold mb-2">{c.value}</p>
              )}

              {c.description && (
                <p className="text-gray-700 mb-2">{c.description}</p>
              )}

              {c.items && (
                <ul className="text-gray-700 space-y-2 mt-2">
                  {c.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
