import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { PROYECTOS_DATA } from "../constants";

const backgroundVariants = {
  visible: { backgroundColor: "rgba(0, 0, 0, 1)" },
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

const Trabajos2 = React.forwardRef((props, ref) => {
  const { scrollY } = useScroll();
  const proyectosPropios = PROYECTOS_DATA.filter(
    (trabajo) => trabajo.categoria === "PROYECTOS PROPIOS"
  );
  const publicidad = PROYECTOS_DATA.filter(
    (trabajo) => trabajo.categoria === "PUBLICIDAD"
  );

  const backgroundVariants = {
    visible: { backgroundColor: "rgba(0, 0, 0, 1)" },
    hidden: { backgroundColor: "rgba(0, 0, 0, 0)" }
  };

  const gradientStyle = {
    background: "radial-gradient(circle, ${colorStart} 60%, ${colorEnd} 120%)",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <motion.div
  style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1, gradientStyle }}
  ></motion.div>
      {/* Sección "Nuestro Trabajo" */}
      <section ref={ref} className="w-full px-4">
        <motion.h2
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="mt-28 mb-10 text-center text-4xl"
        >
          Nuestro trabajo
        </motion.h2>
        <div className="flex flex-auto justify-center gap-10 space-x-5">
          <div className="w-full sm:w-1/2">
            <h3 className="text-2xl font-medium mb-4">Proyectos Propios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 lt:grid-cols-1 lg:grid-cols-2 gap-4">
              {proyectosPropios.map((proyecto, index) => (
                <motion.div whileHover={{ scale: 1.1 }} key={index} className="flex flex-col">
                  <div className="border-8 border-black w-80">
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-auto px-2 py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xl font-medium text-center">{proyecto.titulo}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <h3 className="text-2xl font-medium mb-4">Publicidad</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
              {publicidad.map((proyecto, index) => (
                <motion.div whileHover={{ scale: 1.1 }} key={index} className="flex flex-col">
                  <div className="border-8 border-black w-80">
                    <img
                      src={proyecto.imagen}
                      alt={proyecto.titulo}
                      className="w-full h-auto px-2 py-2 object-cover"
                    />
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xl font-medium">{proyecto.titulo}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Trabajos2;