import ImageHeader from "~/components/ImageHeader/ImageHeader";
import TopBar from "~/components/TopBar/TopBar";
import Activities from "./components/Activities";
import Costs from "./components/Costs";
import Countdown from "./components/Countdown";
import FlightTimeline from "./components/FlightTimeline";
import Hostel from "./components/Hostel";
import Schedule from "./components/Schedule";
import Sponsors from "./components/Sponsors";
import TripInfo from "./components/TripInfo";

export function meta() {
  return [
    { title: "Study Trip to Tokyo" },
    {
      name: "description",
      content:
        "Join the 2026 Tokyo study trip organized by STICKY, the study association for Information & Computing Sciences at Utrecht University. Explore Japanese tech, culture, and academics.",
    },
    { property: "og:title", content: "Study Trip to Tokyo 2026" },
    {
      property: "og:description",
      content:
        "STICKY (Utrecht University) invites you to an unforgettable study trip to Tokyo with tech company visits, university tours, and cultural experiences.",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <TopBar />

      <ImageHeader />

      <TripInfo />

      <FlightTimeline />

      <Hostel />

      <Activities />

      <Schedule />

      <Costs />

      <Countdown />

      <Sponsors />
    </div>
  );
}
