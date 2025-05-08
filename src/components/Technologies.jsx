import logo from "../assets/logo_inicio.png";
import inicio from "../assets/inicio.png";
import nosotros from "../assets/nosotros.png";
import contacto from "../assets/contacto.png";
import trabajo from "../assets/trabajo.png";
import tienda from "../assets/tienda.png";
import inicio_blanco from "../assets/inicio_blanco.png";
import nosotros_blanco from "../assets/nosotros_blanco.png";
import contacto_blanco from "../assets/contacto_blanco.png";
import trabajo_blanco from "../assets/trabajo_blanco.png";
import tienda_blanco from "../assets/tienda_blanco.png";

import { motion, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";


const Technologies = ({
	scrollToRef,
	trabajosRef,
	equipoRef,
	contactoRef,
	isScrollingEnabled,
	setIsScrollingEnabled,
	scrollYProgress
}) => {

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isFixed, setIsFixed] = useState(false);
	const [originalOffset, setOriginalOffset] = useState(0);
	const [isLogoVisible, setIsLogoVisible] = useState(false);
	const iconosRef = useRef(null);

	useEffect(() => {
		if (iconosRef.current && originalOffset === 0) {
			setOriginalOffset(iconosRef.current.offsetTop);
		}
		const handleScroll = () => {
			const currentScrollY = window.pageYOffset;
			setScrollPosition(currentScrollY);
			if (originalOffset > 0 && currentScrollY >= originalOffset) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [originalOffset]);

	const calcularVisibilidadLogo = () => {
		if (originalOffset > 0 && scrollPosition >= originalOffset + window.innerHeight * 0.3) {
			return 0;
		} else {
			return 1;
		}
	};

	const handleLogoClick = () => {
		console.log("Logo clickeado");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const calcularEscala = () => {
		if (!iconosRef.current || originalOffset === 0) return 1;
		const puntoDeInicio = originalOffset - window.innerHeight / 4;
		const rango = window.innerHeight / 3;
		if (scrollPosition < puntoDeInicio) return 1;
		if (scrollPosition >= puntoDeInicio && scrollPosition < puntoDeInicio + rango) {
			const progreso = (scrollPosition - puntoDeInicio) / rango;
			return 1 - progreso * 0.5;
		}
		return 0.5;
	};

	useEffect(() => {
		let timer;
		if (isFixed) {
			timer = setTimeout(() => setIsLogoVisible(true), 500);
		} else {
			setIsLogoVisible(false);
		}
		return () => clearTimeout(timer);
	}, [isFixed]);


	const animatedNavbarBg = useTransform(
		scrollYProgress, [0, 0.25, 0.75, 1],
		["rgba(255, 255, 255, 0.75)", "rgba(50, 50, 50, 0.75)", "rgba(50, 50, 50, 0.75)", "rgba(255, 255, 255, 0.75)"]
	);
	const animatedNavbarBorder = useTransform(
		scrollYProgress, [0, 0.25, 0.75, 1],
		["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"]
	);


	const darkIconOpacity = useTransform(
		scrollYProgress, [0, 0.25, 0.75, 1], [1, 0, 0, 1]
	);
	const lightIconOpacity = useTransform(
		scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]
	);

	
	const animatedShadowColor = useTransform(
		scrollYProgress,
		[0, 0.25, 0.75, 1],
		["rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.3)", "rgba(0, 0, 0, 0.1)"]
	);


	return (
		<div className="flex flex-col items-center justify-center w-full select-none">

			<motion.div
				className="flex items-center justify-center mb-4"
				style={{ opacity: calcularVisibilidadLogo() }}
				transition={{ duration: 0.3 }}
			>
				<img className="mx-1 w-40 select-none pointer-events-none" src={logo} alt="logo" draggable="false" />
			</motion.div>

			<div
				ref={iconosRef}
				style={{ height: isFixed ? iconosRef.current?.offsetHeight : "auto"}}
			/>

			<div
				className={`flex items-center justify-center gap-4 transition-transform duration-300 py ${
					isFixed ? "fixed top-0 left-0 right-0 z-50" : ""
				}`}
				style={{ transform: `scale(${isFixed ? 0.5 : calcularEscala()})` }}
			>

				<motion.div
					className={`flex items-center justify-center gap-4 px-3 py-3 rounded-md ${
						isFixed ? 'sombra-fuerte' : ''
					}`}
					style={{
						backdropFilter: isFixed ? "blur(10px)" : "none",
						borderWidth: 6,
						backgroundColor: isFixed ? animatedNavbarBg : 'transparent',
						borderColor: isFixed ? animatedNavbarBorder : 'transparent',
						'--tw-shadow-color': isFixed ? animatedShadowColor : 'transparent',
                        '--tw-shadow': isFixed ? 'var(--tw-shadow)' : 'none',
					}}
				>
					<motion.div
						className="w-20 h-20 cursor-pointer"
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.1 }}
						initial={{ x: -50 }}
						animate={{
							x: isLogoVisible ? 0 : -50,
							opacity: isLogoVisible ? 1 : 0,
						}}
						style={{
							visibility: isLogoVisible ? "visible" : "hidden",
						}}
						onClick={handleLogoClick}
						onDragStart={(e) => e.preventDefault()}
					>
						<div className="relative w-full h-full">
							<motion.img
								src={inicio}
								alt="inicio dark"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: darkIconOpacity }}
								draggable="false"
							/>
							<motion.img
								src={inicio_blanco}
								alt="inicio light"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: lightIconOpacity }}
								draggable="false"
							/>
						</div>
					</motion.div>

					<motion.div
						className="w-20 h-20 cursor-pointer"
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.1 }}
						initial={{ x: -50 }}
						animate={{ x: isLogoVisible ? 0 : -50 }}
						onClick={() => scrollToRef(trabajosRef)}
						onDragStart={(e) => e.preventDefault()}
					>
						<div className="relative w-full h-full">
							<motion.img
								src={trabajo} alt="trabajo dark"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: darkIconOpacity }}
								draggable="false"
							/>
							<motion.img
								src={trabajo_blanco} alt="trabajo light"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: lightIconOpacity }}
								draggable="false"
							/>
						</div>
					</motion.div>

					<motion.div
						className="w-20 h-20 cursor-pointer"
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.1 }}
						initial={{ x: -50 }}
						animate={{ x: isLogoVisible ? 0 : -50 }}
						onClick={() => scrollToRef(equipoRef)}
						onDragStart={(e) => e.preventDefault()}
					>
						<div className="relative w-full h-full">
							<motion.img
								src={nosotros} alt="nosotros dark"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: darkIconOpacity }}
								draggable="false"
							/>
							<motion.img
								src={nosotros_blanco} alt="nosotros light"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: lightIconOpacity }}
								draggable="false"
							/>
						</div>
					</motion.div>

					<motion.div
						className="w-20 h-20 cursor-pointer"
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.1 }}
						initial={{ x: -50 }}
						animate={{ x: isLogoVisible ? 0 : -50 }}
						onClick={() => scrollToRef(contactoRef)}
						onDragStart={(e) => e.preventDefault()}
					>
						<div className="relative w-full h-full">
							<motion.img
								src={contacto} alt="contacto dark"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: darkIconOpacity }}
								draggable="false"
							/>
							<motion.img
								src={contacto_blanco} alt="contacto light"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: lightIconOpacity }}
								draggable="false"
							/>
						</div>
					</motion.div>

					<motion.div
						className="w-20 h-20 cursor-pointer"
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 1.1 }}
						initial={{ x: -50 }}
						animate={{ x: isLogoVisible ? 0 : -50 }}
						onDragStart={(e) => e.preventDefault()}
					>
						<div className="relative w-full h-full">
							<motion.img
								src={tienda} alt="tienda dark"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: darkIconOpacity }}
								draggable="false"
							/>
							<motion.img
								src={tienda_blanco} alt="tienda light"
								className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
								style={{ opacity: lightIconOpacity }}
								draggable="false"
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
};

export default Technologies;
