import { useEffect } from "react";

const ImageHeader = () => {
  // Parallax scroll effect
  useEffect(() => {
    const el = document.getElementById("parallax-bg");

    const handleScroll = () => {
      const offset = window.scrollY * 0.6; // 0.3 = scrolls slower
      el.style.transform = `translateY(${offset}px) scale(1.4)`;
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-52 md:h-64 lg:h-120 w-full overflow-hidden">
      <div
        id="parallax-bg"
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(/header.jpg)` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      <div className="relative flex h-full items-center justify-center text-center px-4">
        <div>
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            Study Trip to Tokyo 2026
          </h1>
          <p className="text-white/80 mt-2 md:text-lg drop-shadow-md">
            Explore technology, culture and academia in Japan
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageHeader;
