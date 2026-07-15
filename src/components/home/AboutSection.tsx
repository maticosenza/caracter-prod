import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RedFrame } from "@/components/shared/RedFrame";
import aboutHome from "@/assets/about-home.jpg";

export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-brand-red text-brand-white section-y pb-[24px] md:pb-[60px] px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-y-12 sm:gap-x-8 md:gap-x-12 items-center">
        <div className="sm:col-span-6 md:col-span-6 md:col-start-2 space-y-12">
          <div>
            <span className="eyebrow text-brand-white">Sobre Nosotros</span>
            <h2
              className="mt-4 font-display uppercase text-brand-white"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
            >
              Quiénes somos
            </h2>
            <p className="mt-6 text-lg leading-[1.6] text-brand-white max-w-[55ch] text-left">
              Somos una productora de eventos con ADN operativo. Con más de seis
              años trabajando para empresas multinacionales y agencias
              internacionales de marketing y motorsport, sabemos lo que significa
              ejecutar en entornos de alta exigencia.
            </p>
          </div>

          <div>
            <h2
              className="font-display uppercase text-brand-white"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 1 }}
            >
              Qué hacemos
            </h2>
            <p className="mt-6 text-lg leading-[1.6] text-brand-white max-w-[55ch] text-left">
              Operamos en más de diez países. Gestionamos activaciones en Grand
              Prix de Fórmula 1, eventos corporativos, deportivos y experiencias
              MICE para clientes de todo el mundo.
            </p>
            <p className="mt-4 text-lg leading-[1.6] text-brand-white max-w-[55ch] text-left">
              Nuestro trabajo es sencillo: ejecutar con eficiencia y que el
              cliente no tenga que preocuparse por nada.
            </p>
            <Link
              to="/nosotros"
              className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full border border-brand-white px-8 py-4 text-[13px] font-medium uppercase tracking-wider"
            >
              <span aria-hidden className="absolute inset-0 bg-brand-white origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-red">
                Conocenos
              </span>
            </Link>
          </div>
        </div>

        <div className="sm:col-span-6 md:col-span-5 md:col-start-8">
          <RedFrame side="right" className="w-full max-w-[520px] ml-auto">
            <div ref={ref} className="overflow-hidden aspect-[3/4] w-full">
              <motion.img
                style={{ y }}
                src={aboutHome}
                alt="Producción detrás de escena de un evento en vivo"
                className="w-full h-[110%] object-cover -mt-[5%]"
                loading="lazy"
              />
            </div>
          </RedFrame>
        </div>
      </div>
    </section>
  );
};
