import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type SignupInfo = {
  presentationLink: string;
  signupForm: string;
  deadline: string;
};

const signup: SignupInfo = {
  presentationLink: "/presentation.pdf",
  signupForm: "https://forms.gle/UTaUSbQnYTQPYtP56",
  deadline: "2025-12-12T23:59:59",
};

function getTimeLeft(deadline: string): Countdown {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(signup.deadline));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(signup.deadline));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full bg-blue-50 text-black py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
        <p className="text-lg mb-6">Sign up closes on the 12th of December.</p>

        {/* Time grid */}
        <div className="text-2xl font-mono flex justify-center gap-8 mb-6">
          <div>{timeLeft.days}d</div>
          <div>{timeLeft.hours}h</div>
          <div>{timeLeft.minutes}m</div>
          <div>{timeLeft.seconds}s</div>
        </div>

        <div className="flex gap-4 justify-center flex-col md:flex-row">
          <Button asChild className="px-10 py-6 text-lg">
            <a href={signup.presentationLink} target="_blank">
              View Presentation
            </a>
          </Button>

          <Button
            asChild
            className="px-10 py-6 text-lg bg-gradient-to-br from-red-500 via-red-600 to-yellow-400"
          >
            <a href={signup.signupForm} target="_blank">
              Sign up! / 参加
            </a>
          </Button>
        </div>
      </div>

      <div className={`fixed right-6 z-50 bottom-6`}>
        <Button
          className="
      h-24 w-32 rounded-xl
      bg-gradient-to-br from-red-500 via-red-600 to-yellow-400
      text-white font-bold text-sm
      shadow-md hover:scale-105 transition-transform
      flex flex-col items-center justify-center gap-1
      px-3 leading-none
    "
        >
          <a
            href={signup.signupForm}
            target="_blank"
            className="flex flex-col items-center"
          >
            <span className="text-lg">🌸</span>
            <span className="text-center">Sign Up / 参加</span>
            <span className="text-xs mt-1">
              {timeLeft.days > 0
                ? `${timeLeft.days}d ${timeLeft.hours}h`
                : `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}{" "}
              left
            </span>
          </a>
        </Button>
      </div>
    </section>
  );
}
