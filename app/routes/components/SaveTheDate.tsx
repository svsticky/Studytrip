import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const trip = {
  start: "2027-04-17T00:00:00",
  dateLabel: "17 – 26 April 2027",
};

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function SaveTheDate() {
  // Start empty so server and client render the same markup.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(trip.start));
    const interval = setInterval(
      () => setTimeLeft(getTimeLeft(trip.start)),
      1000,
    );
    return () => clearInterval(interval);
  }, []);

  const units: [string, number | undefined][] = [
    ["days", timeLeft?.days],
    ["hours", timeLeft?.hours],
    ["min", timeLeft?.minutes],
    ["sec", timeLeft?.seconds],
  ];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 text-white">
      {/* Decorative blurred shapes */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 py-24 md:py-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.3em] text-sm md:text-base text-blue-200"
        >
          Save the date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-4 text-4xl md:text-7xl font-bold"
        >
          Study Trip 2027
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-2xl md:text-4xl font-semibold"
        >
          {trip.dateLabel}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-4 text-lg text-blue-100"
        >
          Destination: <span className="font-mono">???</span> — revealed soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto"
        >
          {units.map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl bg-white/10 backdrop-blur py-4 md:py-6"
            >
              <div className="text-3xl md:text-5xl font-bold tabular-nums">
                {value ?? "–"}
              </div>
              <div className="mt-1 text-xs md:text-sm uppercase tracking-wider text-blue-200">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        <p className="mt-12 text-blue-100 max-w-xl mx-auto">
          Block your calendar! More information about the destination, the
          programme and how to sign up will follow. Keep an eye on this page.
        </p>
      </div>
    </section>
  );
}
