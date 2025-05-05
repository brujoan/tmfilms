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

	const [isScrollingEnabled, setIsScrollingEnabled] = useState(false);
	const bloquearScroll = () => { window.addEventListener("wheel", preventDefault, { passive: false }); window.addEventListener("touchmove", preventDefault, { passive: false }); };
	const desbloquearScroll = () => { window.removeEventListener("wheel", preventDefault, { passive: false }); window.removeEventListener("touchmove", preventDefault, { passive: false }); };
	const preventDefault = (e) => { e.preventDefault(); };
	const scrollToRef = (ref) => { if (ref && ref.current) { ref.current.scrollIntoView({ behavior: "smooth" }); } };
	useEffect(() => { return () => desbloquearScroll(); }, []);

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


			<div className="relative z-0">
				<div className="grid h-screen place-items-center">
					<Technologies
						scrollToRef={scrollToRef}
						trabajosRef={trabajosRef}
						equipoRef={equipoRef}
						contactoRef={contactoRef}
						isScrollingEnabled={isScrollingEnabled}
						setIsScrollingEnabled={setIsScrollingEnabled}
						scrollYProgress={scrollYProgress}
					/>
				</div>
				<div className="container mx-auto px-8">
					<Trabajos2 ref={trabajosRef} scrollYProgress={scrollYProgress} />
					<Equipo ref={equipoRef} scrollYProgress={scrollYProgress} />
					<Contacto ref={contactoRef}  />
				</div>
			</div> 
		</div>
	);
};

export default App;