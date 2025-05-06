import React, { useState, forwardRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import victor from "../assets/victor.png";
import eloi from "../assets/eloi.png";
import david from "../assets/david.png";
import joan from "../assets/joan.png";


const NOSOTROS_TEXT = "Somos un equipo apasionado por la creación audiovisual, combinando talento técnico y visión artística para llevar tus ideas al siguiente nivel.";

const miembrosEquipo = [
    {
        id: 0,
        name: "Victor Torreño",
        role: "Editor",
        image: victor,
        description: "Montador principal, filmógrafo y VFX. De día graba y de noche edita, vamos, que duerme cada 29 de Febrero.",
        socials: [
            { type: 'youtube', href: 'https://www.youtube.com/@victortcv', title: 'YouTube' },
            { type: 'instagram', href: 'https://www.instagram.com/victortklk/', title: 'Instagram' },
            { type: 'linkedin', href: 'https://www.linkedin.com/in/v%C3%ADctor-torre%C3%B1o-34836a254/', title: 'LinkedIn' },
        ]
    },
    {
        id: 1,
        name: "Eloi Moreiro",
        role: "Productor",
        image: eloi,
        description: "Productor, relaciones públicas y piloto de dron. El Iron-Man humilde se podría decir.",
        socials: [
            { type: 'instagram', href: 'https://www.instagram.com/hexloi7/', title: 'Instagram' },
            { type: 'linkedin', href: 'https://www.linkedin.com/in/eloi-moreiro-80032a255/', title: 'LinkedIn' },
        ]
    },
    {
        id: 2,
        name: "David Sieso",
        role: "Técnico de sonido",
        image: david,
        description: "Operador de cámara y técnico de sonido. Si la pereza, la informalidad y el poco esfuerzo se llamasen Goliat, David se llamaría… pues eso, David.",
        socials: [
            { type: 'instagram', href: 'https://www.instagram.com/daavidsiieso/', title: 'Instagram' },
            { type: 'linkedin', href: 'https://www.linkedin.com/in/david-sieso-929329255/', title: 'LinkedIn' },
        ]
    },
    {
        id: 3,
        name: "Joan Bru",
        role: "Cámara",
        image: joan,
        description: "Director de Fotografía, montador y guionista. El perfil más artístico, revolucionario y talentoso. ¿Os he dicho que soy muy ingenioso? ¡Mira mamá, rompo la cuarta pared!",
        socials: [
            { type: 'youtube', href: 'https://www.youtube.com/@mixunets', title: 'YouTube' },
            { type: 'instagram', href: 'https://www.instagram.com/joan_brru/', title: 'Instagram' },
            { type: 'linkedin', href: 'https://www.linkedin.com/in/joan-br%C3%BA-297803295/', title: 'LinkedIn' },
        ]
    },
];

const SocialIcon = ({ type, className = "w-4 h-4" }) => {
    switch (type) {
        case 'youtube':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 45 512 512" className={`w-5 h-5 ${className}`}>
                    <path d="M501.303,132.765c-5.887,-22.03 -23.235,-39.377 -45.265,-45.265c-39.932,-10.7 -200.038,-10.7 -200.038,-10.7c0,0 -160.107,0 -200.039,10.7c-22.026,5.888 -39.377,23.235 -45.264,45.265c-10.697,39.928 -10.697,123.238 -10.697,123.238c0,0 0,83.308 10.697,123.232c5.887,22.03 23.238,39.382 45.264,45.269c39.932,10.696 200.039,10.696 200.039,10.696c0,0 160.106,0 200.038,-10.696c22.03,-5.887 39.378,-23.239 45.265,-45.269c10.696,-39.924 10.696,-123.232 10.696,-123.232c0,0 0,-83.31 -10.696,-123.238Zm-296.506,200.039l0,-153.603l133.019,76.802l-133.019,76.801Z" />
                </svg>
            );
        case 'instagram':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 521 512" className={className}>
                    <path d="M251.921,0.159C183.503,0.159 174.924,0.449 148.054,1.675C121.24,2.899 102.927,7.157 86.902,13.385C70.336,19.823 56.287,28.437 42.282,42.442C28.277,56.447 19.663,70.496 13.225,87.062C6.997,103.086 2.739,121.399 1.515,148.213C0.289,175.083 0,183.662 0,252.08C0,320.497 0.289,329.076 1.515,355.946C2.739,382.76 6.997,401.073 13.225,417.097C19.663,433.663 28.277,447.712 42.282,461.718C56.287,475.723 70.336,484.337 86.902,490.775C102.927,497.002 121.24,501.261 148.054,502.484C174.924,503.71 183.503,504 251.921,504C320.338,504 328.917,503.71 355.787,502.484C382.601,501.261 400.914,497.002 416.938,490.775C433.504,484.337 447.553,475.723 461.559,461.718C475.564,447.712 484.178,433.663 490.616,417.097C496.843,401.073 501.102,382.76 502.325,355.946C503.551,329.076 503.841,320.497 503.841,252.08C503.841,183.662 503.551,175.083 502.325,148.213C501.102,121.399 496.843,103.086 490.616,87.062C484.178,70.496 475.564,56.447 461.559,42.442C447.553,28.437 433.504,19.823 416.938,13.385C400.914,7.157 382.601,2.899 355.787,1.675C328.917,0.449 320.338,0.159 251.921,0.159ZM251.921,45.551C319.186,45.551 327.154,45.807 353.718,47.019C378.28,48.14 391.619,52.244 400.496,55.693C412.255,60.263 420.647,65.723 429.462,74.538C438.278,83.353 443.737,91.746 448.307,103.504C451.757,112.381 455.861,125.72 456.981,150.282C458.193,176.846 458.45,184.814 458.45,252.08C458.45,319.345 458.193,327.313 456.981,353.877C455.861,378.439 451.757,391.778 448.307,400.655C443.737,412.414 438.278,420.806 429.462,429.621C420.647,438.437 412.255,443.896 400.496,448.466C391.619,451.916 378.28,456.02 353.718,457.14C327.158,458.352 319.191,458.609 251.921,458.609C184.65,458.609 176.684,458.352 150.123,457.14C125.561,456.02 112.222,451.916 103.345,448.466C91.586,443.896 83.194,438.437 74.378,429.621C65.563,420.806 60.103,412.414 55.534,400.655C52.084,391.778 47.98,378.439 46.859,353.877C45.647,327.313 45.391,319.345 45.391,252.08C45.391,184.814 45.647,176.846 46.859,150.282C47.98,125.72 52.084,112.381 55.534,103.504C60.103,91.746 65.563,83.353 74.378,74.538C83.194,65.723 91.586,60.263 103.345,55.693C112.222,52.244 125.561,48.14 150.123,47.019C176.687,45.807 184.655,45.551 251.921,45.551Z" /><path d="M251.921,336.053C205.543,336.053 167.947,298.457 167.947,252.08C167.947,205.702 205.543,168.106 251.921,168.106C298.298,168.106 335.894,205.702 335.894,252.08C335.894,298.457 298.298,336.053 251.921,336.053ZM251.921,122.715C180.474,122.715 122.556,180.633 122.556,252.08C122.556,323.526 180.474,381.444 251.921,381.444C323.367,381.444 381.285,323.526 381.285,252.08C381.285,180.633 323.367,122.715 251.921,122.715Z" /><path d="M416.627,117.604C416.627,134.3 403.092,147.834 386.396,147.834C369.701,147.834 356.166,134.3 356.166,117.604C356.166,100.908 369.701,87.374 386.396,87.374C403.092,87.374 416.627,100.908 416.627,117.604Z" />
                </svg>
            );
        case 'linkedin':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 521 512" className={className}>
                    <path d="M473.305,-1.353c20.88,0 37.885,16.533 37.885,36.926l0,438.251c0,20.393 -17.005,36.954 -37.885,36.954l-436.459,0c-20.839,0 -37.773,-16.561 -37.773,-36.954l0,-438.251c0,-20.393 16.934,-36.926 37.773,-36.926l436.459,0Zm-37.829,436.389l0,-134.034c0,-65.822 -14.212,-116.427 -91.12,-116.427c-36.955,0 -61.739,20.263 -71.867,39.476l-1.04,0l0,-33.411l-72.811,0l0,244.396l75.866,0l0,-120.878c0,-31.883 6.031,-62.773 45.554,-62.773c38.981,0 39.468,36.461 39.468,64.802l0,118.849l75.95,0Zm-284.489,-244.396l-76.034,0l0,244.396l76.034,0l0,-244.396Zm-37.997,-121.489c-24.395,0 -44.066,19.735 -44.066,44.047c0,24.318 19.671,44.052 44.066,44.052c24.299,0 44.026,-19.734 44.026,-44.052c0,-24.312 -19.727,-44.047 -44.026,-44.047Z" />
                </svg>
            );
        default:
            return null;
    }
};


const TeamMemberCard = memo(({ member, isExpanded, onClick }) => {

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    const cardVariants = {
		expanded: {
			width: "300px"
		  },
		  collapsed: {
			width: '200px'
		  }
    };

    const cardTransition = { duration: 0.5, type: "spring", stiffness: 100, damping: 15 };

    const contentVariants = {
        expanded: {
            height: "130px",
            opacity: 1,
            transition: { duration: 0.4, ease: "easeInOut", delay: 0.1 }
        },
        collapsed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <motion.div
            key={member.id}
            className={`card cursor-pointer h-[450px] border-8 border-black shadow-2xl bg-cover bg-center overflow-hidden`}
            variants={cardVariants}
            initial="collapsed"
            animate={isExpanded ? 'expanded' : 'collapsed'}
            transition={cardTransition}
            onClick={() => onClick(member.id)}
            style={{
                backgroundImage: `url(${member.image})`,
            }}
        >

            <div className='card-content h-full flex flex-col justify-end'>

                <div className='card-footer bg-black bg-opacity-75 flex flex-col items-center justify-start pt-3 w-full min-h-[100px]'>

                    <h2 className='text-lg md:text-xl font-humaroid font-bold text-white text-center'>{member.name}</h2>

                    <p className="text-lg text-gray-300 dark:text-gray-400 font-humaroid font-semibold mb-1">{member.role}</p>

                    <motion.div

                        className="w-full"
                        variants={contentVariants}
                        initial="collapsed"
                        animate={isExpanded ? 'expanded' : 'collapsed'}
                    >

                        <div className="">

                            <p className='text-gray-200 text-center font-humaroid font-semibold text-md px-1'>{member.description}</p>
                            <div className="flex justify-center mt-1 space-x-3">
                                {member.socials.map((social) => (
                                    <a
                                        key={social.type}
                                        rel="noopener noreferrer"
                                        href={social.href}
                                        title={social.title}
                                        className="text-gray-300 hover:text-white transition-colors duration-200"
                                        onClick={handleLinkClick}
                                        onDragStart={(e) => e.preventDefault()}
                                        target="_blank"
                                    >
                                        <SocialIcon type={social.type} className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
});



const Equipo = forwardRef((props, ref) => {

    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCardClick = useCallback((index) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    }, []);

    return (
        <section className="py-6">

            <div ref={ref} className="container p-4 mx-auto space-y-16 sm:p-10 select-none">

                <div className="space-y-4 text-center">
                    <motion.h2
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8 }}
                        className="mt-24 mb-10 font-bebas text-4xl md:text-5xl"
                    >
                        Técnicos y co-fundadores
                    </motion.h2>
                    <motion.p
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto antialiased font-humaroid font-semibold text-xl md:text-2xl"
                    >
                        {NOSOTROS_TEXT}
                    </motion.p>
                </div>


                <div className='mt-12 flex flex-col md:flex-row justify-center items-center flex-wrap gap-5'>

                    {miembrosEquipo.map((member) => (
                        <TeamMemberCard
                            key={member.id} 
                            member={member}
                            isExpanded={expandedIndex === member.id}
                            onClick={handleCardClick} 
                        />
                    ))}
                </div> 
            </div>
        </section>
    );
});

export default Equipo;
