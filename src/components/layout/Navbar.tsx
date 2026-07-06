import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuOverlay } from "./MenuOverlay";
import OptimizedImage from "@/components/shared/OptimizedImage";
import logoCaracter from "@/assets/logo-caracter.png";
import logoCaracterRed from "@/assets/logo-caracter-red.png";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname.startsWith("/contacto");
  const isPrivacyPage = location.pathname.startsWith("/politica-de-privacidad");
  const useLightNav = (isContactPage || isPrivacyPage) && !scrolled;
  const logoSrc = useLightNav ? logoCaracterRed : logoCaracter;

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      const lenis = (window as unknown as {
        lenis?: { scrollTo: (t: number, o?: { immediate?: boolean }) => void };
      }).lenis;
      if (lenis) lenis.scrollTo(0, { immediate: false });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-brand-red" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-20">
          <Link to="/" onClick={handleLogoClick} aria-label="Caracter Producciones" className="flex items-center">
            <OptimizedImage src={logoSrc} alt="Caracter Producciones" className="navbar-logo" priority />
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px] group"
            >
              <span className={`block w-6 h-[2px] transition-all duration-300 ${useLightNav ? "bg-brand-red" : "bg-brand-white"}`} />
              <span className={`block w-6 h-[2px] transition-all duration-300 ${useLightNav ? "bg-brand-red" : "bg-brand-white"}`} />
              <span className={`block w-6 h-[2px] transition-all duration-300 ${useLightNav ? "bg-brand-red" : "bg-brand-white"}`} />
            </button>

            <Link
              to="/contacto"
              className={`relative inline-flex items-center justify-center overflow-hidden rounded-full px-6 py-3 text-[13px] font-medium uppercase tracking-wider group transition-colors duration-300 ${
                scrolled
                  ? "bg-brand-white text-brand-red border border-brand-white"
                  : useLightNav
                    ? "bg-transparent text-brand-red border-2 border-brand-red"
                    : "bg-brand-white text-brand-black"
              }`}
            >
              <span
                aria-hidden
                className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100 ${
                  scrolled ? "bg-brand-red" : "bg-brand-red"
                }`}
              />
              <span className={`relative z-10 transition-colors duration-300 ${
                scrolled ? "group-hover:text-brand-white" : useRedLogo ? "group-hover:text-brand-white" : "group-hover:text-brand-white"
              }`}>
                Contacto
              </span>
            </Link>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
};
