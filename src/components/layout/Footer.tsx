import { Link, useLocation } from "react-router-dom";
import { Linkedin, Instagram } from "lucide-react";
import logoCaracter from "@/assets/logo-caracter.png";

const FOOTER_NAV = [
  { label: "Home", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Sobre nosotros", href: "/nosotros" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
];

const TikTokIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52V6.73a4.83 4.83 0 0 1-1.84-.04Z"/>
  </svg>
);

export const Footer = () => {
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      const lenis = (window as unknown as {
        lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void };
      }).lenis;
      if (lenis) lenis.scrollTo(0, { immediate: false });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <footer className="text-brand-white red-background bg-brand-red">
      {/* Divider — arriba del CTA */}
      <div className="footer-divider" />

      {/* 1) CTA */}
      <section className="footer-cta cta-footer">
        <h2>LET'S MAKE <span className="cta-impact-fill">IMPACT!</span></h2>
        {location.pathname === "/contacto" ? (
          <button
            type="button"
            className="footer-cta-btn"
            onClick={() => {
              const el = document.querySelector(".contact-form-section");
              const lenis = (window as unknown as {
                lenis?: { scrollTo: (t: Element | number, o?: { offset?: number }) => void };
              }).lenis;
              if (el && lenis) lenis.scrollTo(el as Element, { offset: -80 });
              else if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Hablemos
          </button>
        ) : (
          <Link to="/contacto" className="footer-cta-btn">Hablemos</Link>
        )}
      </section>

      {/* 2) Main content — 3 cols */}
      <div className="px-[4vw] md:px-[6vw] py-10 md:py-[50px]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1.1fr] gap-10 md:gap-10">
          {/* Col 1 — Description */}
          <div>
            <p className="font-body text-[14px] leading-[1.6] text-brand-white/85 max-w-none md:w-max">
              <span className="md:hidden">
                Contáctanos y descubrí cómo la experiencia
                <br /> y el carácter de CARACTER Producciones
                <br /> pueden transformar tu próximo evento en algo
                <br /> que genere impacto real.
              </span>
              <span className="hidden md:inline">
                Contáctanos y descubrí cómo la experiencia y el carácter
                <br /> de CARACTER Producciones pueden transformar tu
                <br /> próximo evento en algo que genere impacto real.
              </span>
            </p>
          </div>

        {/* Col 2 — Nav */}
        <div className="md:pl-10">
          <h4 className="font-body uppercase text-[12px] text-brand-white/50 mb-4 tracking-[0.15em]">Home</h4>
          <ul className="text-[16px] text-brand-white font-body" style={{ lineHeight: 1.8 }}>
            {FOOTER_NAV.map((n) => (
              <li key={n.href}>
                <Link to={n.href} className="underline-link">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact + Socials */}
        <div>
          <h4 className="font-body uppercase text-[12px] text-brand-white/50 mb-4 tracking-[0.15em]">Contacto</h4>
          <address className="not-italic font-body text-[16px] leading-[1.6] text-brand-white space-y-2">
            <p className="md:max-w-none">
              <span className="md:hidden">HQ en Puerto Madero, Bs As,<br />Argentina con presencia<br />en todo el mundo</span>
              <span className="hidden md:inline">HQ en Puerto Madero, Bs As, Argentina<br /> con presencia en todo el mundo</span>
            </p>
            <p><a href="mailto:hello@caracterprod.com" className="underline-link">hello@caracterprod.com</a></p>
            <p>WhatsApp: +1 645 239 7512</p>
          </address>
          <div className="mt-5 flex items-center gap-3">
            <a href="https://www.linkedin.com/company/car%C3%A1cter-producciones/?viewAsMember=true" target="_blank" rel="noreferrer" aria-label="LinkedIn"
               className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-white text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red">
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a href="https://www.instagram.com/caracter.prod/" target="_blank" rel="noreferrer" aria-label="Instagram"
               className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-white text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="https://www.tiktok.com/@caracter.prod?lang=es-419" target="_blank" rel="noreferrer" aria-label="TikTok"
               className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-brand-white text-brand-white transition-colors hover:bg-brand-white hover:text-brand-red">
              <TikTokIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

        {/* Logo row */}
        <div className="max-w-[1200px] mx-auto mt-10 md:-mt-[88px] flex justify-center md:justify-start">
          <Link to="/" onClick={handleLogoClick} aria-label="Caracter Producciones" className="inline-flex opacity-90">
            <img src={logoCaracter} alt="Caracter Producciones" loading="lazy" decoding="async" className="h-12 md:h-[64px] w-auto" />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="footer-divider" />

      {/* 3) Bottom line */}
      <div className="px-[4vw] md:px-[6vw] py-5 md:py-3 flex flex-col md:flex-row justify-between gap-2 font-body text-[12px] text-brand-white/60 uppercase tracking-[0.15em]">
        <span>© 2024 Marca registrada</span>
        <span>
          Diseñado por{" "}
          <a href="https://www.velocentum.com" target="_blank" rel="noreferrer" className="underline-link">
            Velocentum
          </a>
        </span>
      </div>
    </footer>
  );
};
