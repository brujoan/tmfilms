import { React, useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Technologies from "./components/Technologies";
import Trabajos2 from "./components/Trabajos2";
import Contacto from "./components/Contacto";
import Equipo from "./components/Equipo";


const App = () => {
  const trabajosRef = useRef(null);
  const contactoRef = useRef(null);
  const equipoRef = useRef(null);

  const [isScrollingEnabled, setIsScrollingEnabled] = useState(false);

  const bloquearScroll = () => {
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
  };

  const desbloquearScroll = () => {
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("touchmove", preventDefault, { passive: false });
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    //bloquearScroll(); // Bloquear scroll al montar el componente
    return () => desbloquearScroll(); // Desbloquear scroll al desmontar el componente
  }, []);

  return (
    <div className=" overflow-x-hidden text-black selection:bg-black selection:text-white font-impact">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.7)_120%)]"></div>
      </div>
      <div className="grid h-screen place-items-center">
        <Technologies
          scrollToRef={scrollToRef}
          trabajosRef={trabajosRef}
          equipoRef={equipoRef}
          contactoRef={contactoRef}
          isScrollingEnabled={isScrollingEnabled}
          setIsScrollingEnabled={setIsScrollingEnabled}
        />
      </div>
      <div className="container mx-auto px-8">
        <Trabajos2 ref={trabajosRef} />
        <Equipo ref={equipoRef}/>
        <Contacto ref={contactoRef} />
      </div>
    </div>
  );
};

export default App;
