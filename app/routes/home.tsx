import TopBar from "~/components/TopBar/TopBar";
import Recap from "./components/Recap";
import SaveTheDate from "./components/SaveTheDate";

export function meta() {
  return [
    { title: "Study Trip 2027 — Save the Date" },
    {
      name: "description",
      content:
        "Save the date: the 2027 study trip organized by STICKY, the study association for Information & Computing Sciences at Utrecht University, takes place from 17 to 26 April 2027.",
    },
    { property: "og:title", content: "Study Trip 2027 — Save the Date" },
    {
      property: "og:description",
      content:
        "STICKY (Utrecht University) goes on a study trip from 17 to 26 April 2027. Destination revealed soon!",
    },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <TopBar />

      <SaveTheDate />

      <Recap />
    </div>
  );
}
