import logo from "../assets/logo_inicio.png";
import inicio from "../assets/inicio.png";
import nosotros from "../assets/nosotros.png";
import contacto from "../assets/contacto.png";
import trabajo from "../assets/trabajo.png";
import tienda from "../assets/tienda.png";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import ScrollLink from "./ScrollLink";

const Technologies = ({
  scrollToRef,
  trabajosRef,
  equipoRef,
  contactoRef,
  isScrollingEnabled,
  setIsScrollingEnabled,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [originalOffset, setOriginalOffset] = useState(0);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const iconosRef = useRef(null);

  useEffect(() => {
    if (iconosRef.current) {
      setOriginalOffset(iconosRef.current.offsetTop);
    }

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);

      if (window.pageYOffset >= originalOffset) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [originalOffset]);

  // Manejamos el fin de la transición
  const handleTransitionEnd = () => {
    setIsTransitionEnded(true); // Se activa cuando la transición de los iconos ha finalizado
  };

  const calcularVisibilidadLogo = () => {
    // El logo desaparece cuando el scroll alcanza el 70% del tamaño de la pantalla
    if (scrollPosition >= originalOffset + window.innerHeight * 0.3) {
      return 0; // El logo desaparece completamente
    } else {
      return 1; // El logo sigue visible
    }
  };

  const handleLogoClick = () => {
    // Verificar si el clic está siendo detectado
    console.log("Logo clickeado");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const calcularEscala = () => {
    if (!iconosRef.current) return 1;

    const puntoDeInicio = originalOffset - window.innerHeight / 4;
    const rango = window.innerHeight / 3;

    if (scrollPosition < puntoDeInicio) {
      return 1;
    } else if (
      scrollPosition >= puntoDeInicio &&
      scrollPosition < puntoDeInicio + rango
    ) {
      const progreso = (scrollPosition - puntoDeInicio) / rango;
      return 1 - progreso * 0.5;
    } else {
      return 0.5;
    }
  };

  useEffect(() => {
    if (isFixed) {
      const timer = setTimeout(() => {
        setIsLogoVisible(true); // Después de un retraso, mostramos el logo
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsLogoVisible(false); // Si no está fijo, ocultamos el logo
    }
  }, [isFixed]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Logo grande */}
      <motion.div
        className="flex items-center justify-center mb-4"
        style={{
          opacity:
            scrollPosition >= originalOffset + window.innerHeight * 0.3 ? 0 : 1, // Controlamos la opacidad del logo
        }}
        transition={{
          duration: 0.3, // Animación rápida para la desaparición del logo
        }}
      >
        <img className="mx-1 w-40" src={logo} alt="logo" />
      </motion.div>
      {/* Placeholder para mantener el espacio original */}
      <div
        style={{ height: isFixed ? iconosRef.current?.offsetHeight : "auto" }}
      />
      {/* Iconos */}
      <div
        className={`flex items-center justify-center gap-4 transition-transform duration-300 py ${
          isFixed ? "fixed top-0 left-0 right-0 z-50" : ""
        }`}
        ref={iconosRef}
        style={{
          transform: `scale(${isFixed ? 0.5 : calcularEscala()})`,
        }}
      >
        <div
          className="flex items-center justify-center gap-4 px-3 py-3"
          style={{
            backdropFilter: isFixed ? "blur(10px)" : "none",
            backgroundColor: isFixed
              ? "rgba(255, 255, 255, 0.75)"
              : "transparent",
              borderWidth: 6,
              borderColor: isFixed ? "black" : "transparent"
          }}
        >
          {/* Logo pequeño (inicio) */}
          <motion.div
            whileHover={{ scale: 1.2 }} // Animación de hover para el logo
            whileTap={{ scale: 1.1 }} // Animación de toque
            initial={{ x: -50 }} // Empieza desplazado mucho más a la izquierda
            animate={{
              x: isLogoVisible ? 0 : -50, // Desplazamiento hacia la posición final
              opacity: isLogoVisible ? 1 : 0, // Animación de opacidad
            }}
            style={{
              visibility: isLogoVisible ? "visible" : "hidden",
            }}
            onClick={handleLogoClick} // Evento de clic para scroll suave
          >
            <img className="w-20" src={inicio} alt="inicio" />
          </motion.div>

          {/* Los otros iconos */}
          <motion.div
            className="shadow-2xl"
            whileHover={{ scale: 1.2 }} // Animación de hover para otros iconos
            whileTap={{ scale: 1.1 }} // Animación de toque
            initial={{ x: -50 }} // Comienzan más desplazados a la izquierda
            animate={{
              x: isLogoVisible ? 0 : -50, // Se mueven a su posición final cuando el logo es visible
            }}
            onClick={() => scrollToRef(trabajosRef)}// Evento de clic para scroll suave
          >
            <img className="w-20" src={trabajo} alt="trabajo" />
          </motion.div>
          <motion.div
            className="shadow-2xl"
            whileHover={{ scale: 1.2 }} // Animación de hover para otros iconos
            whileTap={{ scale: 1.1 }} // Animación de toque
            initial={{ x: -50 }} // Comienzan más desplazados a la izquierda
            animate={{
              x: isLogoVisible ? 0 : -50,
            }}
            onClick={() => scrollToRef(equipoRef)}// Evento de clic para scroll suave
          >
            <img className="w-20" src={nosotros} alt="nosotros" />
          </motion.div>
          <motion.div
            className="shadow-2xl"
            whileHover={{ scale: 1.2 }} // Animación de hover para otros iconos
            whileTap={{ scale: 1.1 }} // Animación de toque
            initial={{ x: -50 }} // Comienzan más desplazados a la izquierda
            animate={{
              x: isLogoVisible ? 0 : -50,
            }}
            onClick={() => scrollToRef(contactoRef)}// Evento de clic para scroll suave
          >
            <img className="w-20" src={contacto} alt="contacto" />
          </motion.div>
          <motion.div
            className="shadow-2xl"
            whileHover={{ scale: 1.2 }} // Animación de hover para otros iconos
            whileTap={{ scale: 1.1 }} // Animación de toque
            initial={{ x: -50 }} // Comienzan más desplazados a la izquierda
            animate={{
              x: isLogoVisible ? 0 : -50,
            }}
          >
            <img className="w-20" src={tienda} alt="tienda" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;
