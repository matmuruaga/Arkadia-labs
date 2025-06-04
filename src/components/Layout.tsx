// src/components/Layout.tsx - Probablemente sin cambios directos aquí
import Header from "./Header"; // Se usará la versión actualizada
import Footer from "./Footer"; // Se usará la versión actualizada

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main> {/* Es buena práctica envolver children en <main> */}
      <Footer />
    </>
  );
};

export default Layout;