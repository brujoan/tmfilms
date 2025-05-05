import React from "react";
import { CONTACTO } from "../constants";
import { motion } from "framer-motion";

const Contacto = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="border-b border-neutral-900 pb-20">
      <motion.h2
                whileInView={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="mt-28 text-center text-4xl font-bebas" 
              >
        Contacta con nosotros
      </motion.h2>
      <div className="text-center tracking-tighter">
        <motion.p
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="my-4 font-humaroid font-bold text-2xl"
        >
          {CONTACTO.address}
        </motion.p>
        <motion.a
        href={`tel:${CONTACTO.phoneNo}`}
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="my-4 font-humaroid font-bold text-2xl">{CONTACTO.phoneNo}</motion.a>
        <p/>
        <motion.a
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0}}
          transition={{ duration: 0.7, delay: 0.45}}
          href={`mailto:${CONTACTO.email}`}
          className="my-4 font-humaroid font-bold text-2xl block"
        >
          {CONTACTO.email}
        </motion.a>
      </div>
    </div>
  );
});

export default Contacto;
