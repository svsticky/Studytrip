const TopBar = () => {
  return (
    <div className="w-full h-18 bg-white shadow flex items-center">
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center px-4">
        <img
          className="h-14 object-contain"
          src="/logo_compact_outline_zwart.svg"
          alt="Left Logo"
        />
        <img className="h-14 object-contain" src="/logo.png" alt="Right Logo" />
      </div>
    </div>
  );
};

export default TopBar;
