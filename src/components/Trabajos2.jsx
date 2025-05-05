import React, { useState, useEffect } from "react";
// Añadir useTransform
import { motion, useTransform } from "framer-motion";
import { PROYECTOS_DATA } from "../constants";

// Definiciones originales mantenidas
const backgroundVariantsOriginal = {
	visible: { backgroundColor: "rgba(0, 0, 0, 1)" },
	hidden: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

// El componente recibe 'scrollYProgress' como prop y la 'ref'
const Trabajos2 = React.forwardRef(({ scrollYProgress }, ref) => {
	// Filtrado de datos original
	const proyectosPropios = PROYECTOS_DATA.filter(
		(trabajo) => trabajo.categoria === "PROYECTOS PROPIOS"
	);
	const publicidad = PROYECTOS_DATA.filter(
		(trabajo) => trabajo.categoria === "PUBLICIDAD"
	);

	// Estado para deshabilitar hover en móvil
	const [isMobile, setIsMobile] = useState(false);
	useEffect(() => {
		const checkIsMobile = () => window.innerWidth < 768;
		setIsMobile(checkIsMobile());
	}, []);

	// Definiciones originales duplicadas mantenidas
	const backgroundVariants = {
		visible: { backgroundColor: "rgba(0, 0, 0, 1)" },
		hidden: { backgroundColor: "rgba(0, 0, 0, 0)" }
	};
	const gradientStyle = {
		background: "radial-gradient(circle, ${colorStart} 60%, ${colorEnd} 120%)",
	};

	// Efecto hover condicional
	const hoverEffect = !isMobile ? { scale: 1.1 } : {};

	// Transforma scrollYProgress en un color de borde animado (negro a blanco)
	const animatedBorderColor = useTransform(
		scrollYProgress,
		// Puntos clave
		[0, 0.25, 0.75, 1],
		// Colores (negro a blanco)
		["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"]
	);

	// Transforma scrollYProgress en un color de texto animado (negro a blanco)
	const animatedTextColor = useTransform(
		scrollYProgress,
		// Mismos puntos clave que el fondo y el borde
		[0, 0.25, 0.75, 1],
		// Colores (negro a blanco)
		["rgba(0, 0, 0, 1)", "rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(0, 0, 0, 1)"]
	);


	return (
		<div className="flex flex-col items-center justify-center w-full relative select-none">
			<section ref={ref} className="w-full px-4">
				{/* Usar motion.h2 y aplicar estilo animado */}
				<motion.h2
					whileInView={{ opacity: 1 }}
					initial={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className="mt-28 mb-10 text-center text-4xl font-bebas" // Asegúrate que la fuente está aplicada
					style={{ color: animatedTextColor }} // Aplicar color animado
				>
					Nuestro trabajo
				</motion.h2>
				<div className="flex flex-col md:flex-row flex-auto justify-center gap-10">
					{/* Columna Proyectos Propios */}
					<div className="w-full md:w-1/2">
						{/* Usar motion.h3 y aplicar estilo animado */}
						<motion.h3
							className="text-2xl font-medium mb-4 font-bebas" // Asegúrate que la fuente está aplicada
							style={{ color: animatedTextColor }} // Aplicar color animado
						>
							Proyectos Propios
						</motion.h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{proyectosPropios.map((proyecto, index) => (
								<a
									key={`link-propio-${index}`}
									href={proyecto.videoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="block"
									onDragStart={(e) => e.preventDefault()} // Prevenir drag en el enlace
								>
									<motion.div whileHover={hoverEffect} key={index} className="flex flex-col items-center">
										{/* Usar motion.div y aplicar estilo animado */}
										<motion.div
											className="mx-auto max-w-xs border-8" // Quitar border-black/border-white
											style={{ borderColor: animatedBorderColor }} // Aplicar color animado
										>
											{/* *** CAMBIO: Añadido select-none y pointer-events-none a img *** */}
											<img
												src={proyecto.imagen}
												alt={proyecto.titulo}
												className="w-full h-auto px-2 py-2 select-none pointer-events-none"
												draggable="false"
											/>
										</motion.div>
										<div className="mt-2">
											{/* Usar motion.h4 y aplicar estilo animado */}
											<motion.h4
												className="text-xl font-medium text-center font-bebas" // Asegúrate que la fuente está aplicada
												style={{ color: animatedTextColor }} // Aplicar color animado
											>
												{proyecto.titulo}
											</motion.h4>
										</div>
									</motion.div>
								</a>
							))}
						</div>
					</div>
					{/* Columna Publicidad */}
					<div className="w-full md:w-1/2">
						{/* Usar motion.h3 y aplicar estilo animado */}
						<motion.h3
							className="text-2xl font-medium mb-4 font-bebas" // Asegúrate que la fuente está aplicada
							style={{ color: animatedTextColor }} // Aplicar color animado
						>
							Publicidad
						</motion.h3>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
							{publicidad.map((proyecto, index) => (
								// *** CAMBIO: Añadido onDragStart a la etiqueta <a> ***
								<a
									key={`link-publi-${index}`}
									href={proyecto.videoUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="block"
									onDragStart={(e) => e.preventDefault()} // Prevenir drag en el enlace
								>
									<motion.div whileHover={hoverEffect} key={index} className="flex flex-col items-center">
										{/* Usar motion.div y aplicar estilo animado */}
										<motion.div
											className="mx-auto max-w-xs border-8" // Quitar border-black/border-white
											style={{ borderColor: animatedBorderColor }} // Aplicar color animado
										>
										    {/* *** CAMBIO: Añadido select-none y pointer-events-none a img *** */}
											<img
												src={proyecto.imagen}
												alt={proyecto.titulo}
												className="w-full h-auto px-2 py-2 object-cover select-none pointer-events-none"
												draggable="false"
											/>
										</motion.div>
										<div className="mt-2">
											{/* Usar motion.h4 y aplicar estilo animado */}
											<motion.h4
												className="text-xl font-medium font-bebas" // Asegúrate que la fuente está aplicada
												style={{ color: animatedTextColor }} // Aplicar color animado
											>
												{proyecto.titulo}
											</motion.h4>
										</div>
									</motion.div>
								</a>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
});

export default Trabajos2; // Exportar Trabajos2