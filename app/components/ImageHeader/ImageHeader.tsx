const ImageHeader = () => {
  return (
    <div
      className="relative h-52 md:h-64 lg:h-120 w-full flex items-center justify-center overflow-hidden"
      style={{
        background: `url(/header.jpg) center center / cover no-repeat`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* Text overlay */}
      <div className="relative text-center px-4">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
          Study Trip to Tokyo 2026
        </h1>
        <p className="text-white/80 mt-2 md:text-lg drop-shadow-md">
          Explore technology, culture and academia in Japan
        </p>
      </div>
    </div>
  );
};

export default ImageHeader;
