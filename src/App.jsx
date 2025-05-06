import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Technologies from "./components/Technologies";
import Trabajos2 from "./components/Trabajos2";
import Contacto from "./components/Contacto";
import Equipo from "./components/Equipo";


const App = () => {
    const trabajosRef = useRef(null);
    const contactoRef = useRef(null);
    const equipoRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(false);


    const { scrollYProgress } = useScroll({
        target: trabajosRef,
        offset: ["start 0.8", "end 0.2"]
    });


    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]
    );

    const lightGradientOpacity = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [1, 0, 0, 1]
    );
    const darkGradientOpacity = useTransform(
        scrollYProgress,
        [0, 0.25, 0.75, 1],
        [0, 1, 1, 0]
    );

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
 
            setIsDarkMode(latest > 0.25 && latest < 0.75);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);


    const [isScrollingEnabled, setIsScrollingEnabled] = useState(true);
    const preventDefault = (e) => {
        if (!isScrollingEnabled) {
            e.preventDefault();
        }
    };
    const bloquearScroll = () => {
        setIsScrollingEnabled(false);
        window.addEventListener("wheel", preventDefault, { passive: false });
        window.addEventListener("touchmove", preventDefault, { passive: false });

    };
    const desbloquearScroll = () => {
        setIsScrollingEnabled(true);
        window.removeEventListener("wheel", preventDefault, { passive: false });
        window.removeEventListener("touchmove", preventDefault, { passive: false });

    };

    useEffect(() => {
        return () => desbloquearScroll();
    }, []);


    const scrollToRef = (ref) => {
        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (

        <div
            className="overflow-x-hidden selection:bg-black selection:text-white font-impact text-black relative"
        >

            <motion.div
                className="fixed inset-0 -z-20"
                style={{ backgroundColor }}
            />


            <div className="fixed top-0 -z-10 h-full w-full">

                <motion.div
                    className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(circle,rgba(0,0,0,0)_60%,rgba(0,0,0,0.7)_120%)]"
                    style={{ opacity: lightGradientOpacity }}
                />

                <motion.div
                    className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(circle,rgba(255,255,255,0.02)_60%,rgba(255,255,255,0.08)_120%)]"
                    style={{ opacity: darkGradientOpacity }}
                />
            </div>

            <div className="relative z-0 px-4 w-full">
                <div className="flex h-screen place-items-center px-4">
                    <Technologies
                        scrollToRef={scrollToRef}
                        trabajosRef={trabajosRef}
                        equipoRef={equipoRef}
                        contactoRef={contactoRef}
                        scrollYProgress={scrollYProgress}
                    />
                </div>

                <div className="container mx-auto overflow-hidden">
                    <div className="px-4">
                        <Trabajos2 ref={trabajosRef} scrollYProgress={scrollYProgress} />
                    </div>
					<div className="px-1">
                        <Equipo ref={equipoRef} scrollYProgress={scrollYProgress} />
                        <Contacto ref={contactoRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
