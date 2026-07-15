import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { RedFrame } from "@/components/shared/RedFrame";
import { RevealHeading } from "./RevealHeading";
import servicesOverview from "@/assets/nosotros-empresa-v3.jpg";

export const ServicesOverview = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="bg-brand-red text-brand-white pt-[56px] pb-[80px] md:pt-[84px] md:pb-[120px] px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-y-12 sm:gap-x-8 md:gap-x-12 items-center">
        <div className="order-1 sm:order-2 md:order-2 sm:col-start-7 sm:col-span-6 md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-4">
          <span className="eyebrow text-brand-white">Nuestros servicios</span>
          <div style={{ fontSize: "clamp(32px, 3.6vw, 56px)" }}>
            <h2 className="mt-6 font-display uppercase leading-[0.95] whitespace-nowrap">
              Gestión completa,<br />resultados concretos
            </h2>
          </div>
          <div className="mt-8 space-y-6 text-lg leading-[1.6] text-brand-white/90 text-left">
            <p>De la idea a la ejecución, nos ocupamos de cada detalle para que el resultado sea impecable.</p>
            <p>Planificamos, coordinamos y ejecutamos eventos con un enfoque estratégico, operativo y orientado a resultados. Trabajamos junto al cliente en cada etapa del proyecto, asegurando una gestión eficiente, comunicación clara y resolución rápida en tiempo real.</p>
            <p>Desde la logística y coordinación on-site hasta la atención a invitados, proveedores y producción general, nuestro objetivo es simple: que cada evento funcione a la perfección.</p>
          </div>

          <Link
            to="/servicios"
            className="group relative mt-10 inline-flex items-center justify-center overflow-hidden rounded-full border border-brand-white px-8 py-4 text-[13px] font-medium uppercase tracking-wider"
          >
            <span aria-hidden className="absolute inset-0 bg-brand-white origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100" />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-black">
              Nuestros servicios
            </span>
          </Link>
        </div>

        <div className="order-2 sm:order-1 md:order-1 sm:col-start-1 sm:col-span-6 md:col-start-1 md:col-span-6 lg:col-start-2 lg:col-span-5 relative">
          <RedFrame side="right" className="w-full max-w-[520px] ml-auto">
            <div ref={ref} className="overflow-hidden aspect-[3/4] w-full">
              <motion.img
                style={{ y }}
                src={servicesOverview}
                alt="Activación de marca y experiencia inmersiva"
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
