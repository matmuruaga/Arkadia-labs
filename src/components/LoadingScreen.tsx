// src/components/LoadingScreen.tsx
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#0C0F3F] flex items-center justify-center">
      <div className="text-center">
        {/* Logo o spinner animado */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto border-4 border-[#5CE1E6] border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Texto de carga */}
        <p className="text-white/70 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
