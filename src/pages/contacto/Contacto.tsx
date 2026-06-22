import { useEffect, useRef, useState } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import GlobeWhiteTranslucent from "@/components/GlobeWhiteTranslucent";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contacto = () => {
  useEffect(() => { window.scrollTo(0, 0); document.title = "Contacto — Productora"; }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [briefEmail, setBriefEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [briefSent, setBriefSent] = useState(false);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setSelectedFile(file);
      setBriefSent(false);
      setShowBriefModal(true);
    }
  };
  const handleSendBrief = async () => {
    const parsed = z.string().trim().email().max(255).safeParse(briefEmail);
    if (!parsed.success) {
      toast.error("Ingresá un email válido");
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "brief-notification",
          templateData: {
            email: parsed.data,
            fileName: fileName ?? "—",
          },
        },
      });
      if (error) throw error;
      // Confirmación al cliente que cargó el brief
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "brief-confirmation",
          recipientEmail: parsed.data,
          templateData: { fileName: fileName ?? "—" },
        },
      });
      setBriefSent(true);
    } catch (err) {
      console.error("Error enviando el brief", err);
      toast.error("No pudimos enviar tu brief. Probá de nuevo en un momento.");
    } finally {
      setSending(false);
    }
  };
  const closeBriefModal = () => {
    setShowBriefModal(false);
    setBriefEmail("");
    if (briefSent) {
      setFileName(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  return (
    <>
      <section className="contact-banner-white">
        <h1 className="hablemos-title-red">¿Estás listo? </h1>
        <div className="hablemos-subtitle-row">
          <h2 className="hablemos-subtitle-black">Hablemos</h2>
          <div className="hablemos-chevron" aria-hidden>
            <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4 L24 24 L44 4" stroke="#c0181b" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" fill="none" />
            </svg>
          </div>
        </div>
      </section>

      <section className="contact-form-section">
        <ContactForm />
      </section>

      <section className="brief-cta-section">
        <div className="brief-card">
          <div className="brief-content">
            {/* IZQUIERDA: Título + párrafo */}
            <div className="brief-text">
              <h3>¿TENÉS UN BRIEF?</h3>
              <p>Envianos tu brief directamente<br />con la información de tu proyecto.</p>
            </div>
            {/* DERECHA: botón importar */}
            <div className="brief-buttons">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                className="sr-only"
                onChange={handleFileChange}
              />
              <button className="brief-btn-primary" onClick={() => fileInputRef.current?.click()}>IMPORTAR BRIEF →</button>
              {fileName && <span className="brief-filename">{fileName}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="world-section-red">
        <div className="world-container">
          <div className="world-globe">
            <GlobeWhiteTranslucent />
          </div>
          <div className="world-text">
            <h2>Desde Argentina<br/>al mundo</h2>
            <p className="text-left">Radicados en Argentina pero con alcance y experiencia global. Somos tu partner estratégico en todo el mundo ya que hemos producido eventos en Estados Unidos, Latino America, Europa, África, Oceanía y Asia.</p>
          </div>
        </div>
      </section>

      {showBriefModal && (
        <div className="success-overlay" role="dialog" aria-modal="true" onClick={closeBriefModal}>
          <div className="success-card" onClick={(e) => e.stopPropagation()}>
            {briefSent ? (
              <>
                <h3 className="success-title">¡Brief enviado!</h3>
                <p className="success-text">Recibimos tu archivo. Te respondemos en menos de 24 horas.</p>
              </>
            ) : (
              <>
                <h3 className="success-title">Enviá tu brief</h3>
                <p className="success-text">Dejanos tu email para enviarte la confirmación junto a tu archivo adjunto.</p>
                {fileName && <p className="brief-modal-filename">{fileName}</p>}
                <input
                  type="email"
                  value={briefEmail}
                  onChange={(e) => setBriefEmail(e.target.value)}
                  placeholder="tu@email.com"
                  maxLength={255}
                  className="brief-modal-input"
                />
                <button className="brief-btn-primary brief-modal-btn" onClick={handleSendBrief} disabled={sending}>
                  {sending ? "ENVIANDO..." : "ENVIAR ARCHIVO →"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Contacto;
