type FlightInfo = {
  flight: string;
  route: string;
  time: string;
};

const outboundFlights: FlightInfo[] = [
  {
    flight: "CZ308",
    route: "Amsterdam → Guangzhou",
    time: "11 Apr 13:20 → 12 Apr 06:40 (local)",
  },
  {
    flight: "CZ385",
    route: "Guangzhou → Tokyo Haneda",
    time: "12 Apr 08:50 → 12 Apr 14:20 (local)",
  },
];

const returnFlights: FlightInfo[] = [
  {
    flight: "CZ386",
    route: "Tokyo Haneda → Guangzhou",
    time: "21 Apr 15:40 → 21 Apr 19:15 (local)",
  },
  {
    flight: "CZ307",
    route: "Guangzhou → Amsterdam",
    time: "22 Apr 00:20 → 22 Apr 06:35 (local)",
  },
];

export default function FlightTimeline() {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">
          Flight information
        </h2>

        <p className="text-lg text-center text-gray-600 mb-10">
          Checked luggage (23kg) included!
        </p>

        <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            {outboundFlights.map((f, i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-blue-600 mr-4" />
                <div>
                  <p className="font-semibold">{f.flight}</p>
                  <p>{f.route}</p>
                  <p>{f.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Connector */}
          <div className="hidden md:block w-16 border-t-2 border-gray-300 rotate-90 mx-4"></div>

          <div className="flex-1">
            {returnFlights.map((f, i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="w-6 h-6 rounded-full bg-red-600 mr-4" />
                <div>
                  <p className="font-semibold">{f.flight}</p>
                  <p>{f.route}</p>
                  <p>{f.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* <img
          src="sleeping_cat.png"
          alt="kawaii cat"
          className="absolute left-1/2 -translate-x-1/2 w-24
                       transition-all duration-500 
                       translate-y-4 group-hover:-translate-y-2"
        /> */}
    </section>
  );
}
