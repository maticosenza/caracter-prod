import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FloatingField, inputClass } from "./FloatingField";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  nombre: z.string().trim().min(1, "Ingresá tu nombre").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  empresa: z.string().trim().max(120).optional().or(z.literal("")),
  tipo: z.enum(["Deportivo", "Corporativo", "Activación de marca", "Música", "Exhibición", "Social", "Otro"], { errorMap: () => ({ message: "Elegí un tipo" }) }),
  fecha: z.date().optional(),
  mensaje: z.string().trim().min(10, "Contanos un poco más (mínimo 10 caracteres)").max(1000),
});

const TIPOS = ["Deportivo", "Corporativo", "Activación de marca", "Música", "Exhibición", "Social", "Otro"] as const;

export const ContactForm = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [tipo, setTipo] = useState<string>("");
  const [fecha, setFecha] = useState<Date | undefined>();
  const [mensaje, setMensaje] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async () => {
    const parsed = schema.safeParse({ nombre, email, empresa, tipo, fecha, mensaje });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Revisá los datos del formulario");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          templateData: {
            nombre: parsed.data.nombre,
            email: parsed.data.email,
            empresa: parsed.data.empresa || "—",
            tipo: parsed.data.tipo,
            fecha: parsed.data.fecha ? format(parsed.data.fecha, "dd/MM/yyyy") : "—",
            mensaje: parsed.data.mensaje,
          },
        },
      });
      if (error) throw error;
      // Confirmación al cliente que completó el formulario
      await supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: parsed.data.email,
          templateData: { nombre: parsed.data.nombre },
        },
      });
      setShowSuccess(true);
      setNombre(""); setEmail(""); setEmpresa(""); setTipo(""); setFecha(undefined); setMensaje("");
    } catch (err) {
      console.error("Error enviando el formulario de contacto", err);
      toast.error("No pudimos enviar tu mensaje. Probá de nuevo en un momento.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className="space-y-2 max-w-2xl mx-auto">
      <FloatingField label="Nombre" required hasValue={!!nombre}>
        {(p) => <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} maxLength={100} {...p} />}
      </FloatingField>

      <FloatingField label="Email" required hasValue={!!email}>
        {(p) => <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} maxLength={255} {...p} />}
      </FloatingField>

      <FloatingField label="Empresa" hasValue={!!empresa}>
        {(p) => <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} className={inputClass} maxLength={120} {...p} />}
      </FloatingField>

      <FloatingField label="Tipo de evento" required hasValue={true}>
        {(p) => (
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className={cn(inputClass, "uppercase tracking-wide bg-brand-red")} {...p}>
            <option value="" disabled hidden></option>
            {TIPOS.map((t) => <option key={t} value={t} className="bg-brand-red text-brand-white">{t}</option>)}
          </select>
        )}
      </FloatingField>

      <FloatingField label="Fecha estimada" hasValue={!!fecha}>
        {(p) => (
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" onFocus={p.onFocus} onBlur={p.onBlur} id={p.id}
                className={cn(inputClass, "flex items-center justify-between text-left")}>
                <span>{fecha ? format(fecha, "dd/MM/yyyy") : ""}</span>
                <CalendarIcon className="w-4 h-4 opacity-60" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={fecha} onSelect={setFecha}
                disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        )}
      </FloatingField>

      <FloatingField label="Mensaje" required hasValue={!!mensaje}>
        {(p) => <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)}
          rows={4} maxLength={1000} className={cn(inputClass, "resize-none")} {...p} />}
      </FloatingField>

      <div className="pt-10 flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitting}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-white text-brand-red px-10 py-4 text-[13px] font-display uppercase tracking-[0.2em] transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center gap-2">
            {submitting ? "Enviando..." : "Enviar mensaje"}
            <ArrowRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>

    {showSuccess && (
      <div className="success-overlay" role="dialog" aria-modal="true" onClick={() => setShowSuccess(false)}>
        <div className="success-card" onClick={(e) => e.stopPropagation()}>
          <h3 className="success-title">¡Muchas gracias!</h3>
          <p className="success-text">Tu mensaje fue enviado. Te respondemos en menos de 24 horas.</p>
        </div>
      </div>
    )}
    </>
  );
};
