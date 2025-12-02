// src/components/LoadingScreen.tsx
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-cyan-50/40 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner with gradient effect */}
        <div className="relative w-12 h-12 mx-auto">
          <div className="absolute inset-0 rounded-full border-2 border-slate-200"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-sky-500 border-r-teal-500 animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
