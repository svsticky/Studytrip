import { Card } from "~/components/ui/card";

type Sponsor = {
  image: string;
  text: string;
};

const sponsors: Sponsor[] = [
  // {
  //   image: "/asml.svg",
  //   text: "ASML gives the world's leading chipmakers the power to mass produce patterns on silicon, helping to make computer chips smaller, faster and greener.",
  // },
  {
    image: "/keronic.jpg",
    text: "Keronic offers IT consultancy services for development, architectural advise and review of network asset management solutions.",
  },
];

export default function Sponsors() {
  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Sponsors</h2>

        <div className="grid md:grid-cols-2 gap-10">
          {sponsors.map((s, i) => (
            <Card key={i} className="p-6 rounded-2xl shadow">
              <img
                aria-label={s.text}
                src={s.image}
                className="h-40 mx-auto mb-4"
              />
              <p className="text-gray-600 text-center">{s.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
