import { motion } from "framer-motion";
import logo from "../assets/inicio.png";
import nosotros from "../assets/nosotros.png";
import contacto from "../assets/contacto.png";
import trabajo from "../assets/trabajo.png";
import tienda from "../assets/tienda.png";
const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-center py-6">
      {/*       <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-10" src={logo} alt="logo" />
      </div> */}
      <div className="m-8 flex items-center justify-center text-2xl">
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="div"
        >
            <a href="/home"><img className="mx-1 w-14" src={logo} alt="logo" /></a>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="div"
        >
          <img className="mx-1 w-14" src={nosotros} alt="logo" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="div"
        >
          <img className="mx-1 w-14" src={contacto} alt="logo" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="div"
        >
          <img className="mx-1 w-14" src={trabajo} alt="logo" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 1.1 }}
          className="div"
        >
          <img className="mx- w-14" src={tienda} alt="logo" />
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
