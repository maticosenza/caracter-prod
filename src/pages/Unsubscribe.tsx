import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State = "loading" | "valid" | "invalid" | "already" | "done" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Cancelar suscripción — Caracter";
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );
        const data = await res.json();
        if (data.valid) setState("valid");
        else if (data.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("error");
      }
    })();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success || data?.reason === "already_unsubscribed") setState("done");
      else setState("error");
    } catch {
      setState("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
      <div style={{ maxWidth: 420, textAlign: "center" }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Cancelar suscripción</h1>
        {state === "loading" && <p>Verificando…</p>}
        {state === "invalid" && <p>El enlace no es válido o expiró.</p>}
        {state === "error" && <p>Ocurrió un error. Probá de nuevo más tarde.</p>}
        {state === "already" && <p>Ya estabas dado de baja. No recibirás más emails.</p>}
        {state === "done" && <p>Listo. No recibirás más emails.</p>}
        {state === "valid" && (
          <>
            <p style={{ marginBottom: 20 }}>¿Querés dejar de recibir estos emails?</p>
            <button
              onClick={handleUnsubscribe}
              disabled={submitting}
              style={{ background: "#c0181b", color: "#fff", border: "none", borderRadius: 9999, padding: "12px 28px", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: 13 }}
            >
              {submitting ? "Cancelando…" : "Confirmar baja"}
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default Unsubscribe;