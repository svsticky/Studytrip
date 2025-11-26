import { motion } from "framer-motion";

type Hostel = {
  name: string;
  description: string;
  images: string[];
  mapsEmbed: string;
};

const data: Hostel = {
  name: "Tokyo Ueno Youth Hostel",
  description:
    "Our accommodation for the trip is the Tokyo Ueno Youth Hostel. It is clean, safe and conveniently located stay in the heart of Tokyo. Perfect for enjoying the city without traveling too much.",
  images: ["/hostel_exterior.jpg", "/hostel_interior.jpg"],
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.8045616874906!2d139.76770277585524!3d35.70642672858944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c21d330456b%3A0xc1634983bdef93ac!2sTokyo%20Ueno%20Youth%20Hostel!5e0!3m2!1snl!2snl!4v1763893575168!5m2!1snl!2snl",
};

export default function Hostel() {
  return (
    <section className="w-full bg-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Hostel</h2>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">{data.name}</h3>
            <p className="text-gray-600">{data.description}</p>

            <div className="w-full h-64 rounded-xl overflow-hidden shadow">
              <iframe
                title="Hostel location"
                src={data.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {data.images.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                className="w-full h-64 object-cover rounded-xl shadow"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true, amount: 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
