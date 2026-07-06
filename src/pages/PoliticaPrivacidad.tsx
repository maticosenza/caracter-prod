import { Link } from "react-router-dom";

const PoliticaPrivacidad = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <header className="privacy-header">
          <h1>Política de Privacidad</h1>
          <p className="privacy-date">Última actualización: 11 de Junio 2026</p>
        </header>

        <p className="privacy-intro">
          En Caracter Producciones nos comprometemos a proteger la privacidad de
          las personas que visitan nuestro sitio web y se comunican con nosotros
          a través de nuestros formularios de contacto.
        </p>

        <section className="privacy-section">
          <h2>1. Responsable del tratamiento</h2>
          <p>
            Caracter Producciones es responsable del tratamiento de los datos
            personales recopilados a través de este sitio web.
          </p>
          <p>
            Para cualquier consulta relacionada con esta Política de Privacidad,
            puedes contactarnos a través del correo electrónico{" "}
            <a href="mailto:hello@caracterprod.com" className="privacy-link">
              hello@caracterprod.com
            </a>
            .
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Datos que recopilamos</h2>
          <p>Podemos recopilar la siguiente información:</p>
          <ul>
            <li>Nombre y apellido.</li>
            <li>Dirección de correo electrónico.</li>
            <li>Número de teléfono.</li>
            <li>Empresa u organización.</li>
            <li>
              Información incluida voluntariamente en formularios de contacto o
              solicitudes comerciales.
            </li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. Finalidad del tratamiento</h2>
          <p>Los datos recopilados podrán utilizarse para:</p>
          <ul>
            <li>Responder consultas o solicitudes recibidas.</li>
            <li>Elaborar propuestas comerciales.</li>
            <li>Gestionar potenciales relaciones comerciales.</li>
            <li>
              Enviar información sobre nuestros servicios cuando exista interés
              legítimo o consentimiento previo.
            </li>
            <li>Mejorar la experiencia de navegación en el sitio web.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>4. Conservación de los datos</h2>
          <p>
            Los datos personales serán conservados únicamente durante el tiempo
            necesario para cumplir con las finalidades para las cuales fueron
            recopilados o mientras exista una relación comercial o potencial
            relación comercial.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Cesión de datos</h2>
          <p>
            Caracter Producciones no vende, alquila ni cede datos personales a
            terceros, salvo obligación legal o cuando sea necesario para la
            prestación de servicios vinculados a la actividad profesional.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Seguridad</h2>
          <p>
            Adoptamos medidas técnicas y organizativas razonables para proteger
            la información personal frente a accesos no autorizados, pérdida,
            alteración o divulgación indebida.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Derechos de los usuarios</h2>
          <p>Los usuarios podrán solicitar en cualquier momento:</p>
          <ul>
            <li>Acceso a sus datos personales.</li>
            <li>Rectificación de información incorrecta.</li>
            <li>Eliminación de sus datos.</li>
            <li>Limitación u oposición al tratamiento.</li>
          </ul>
          <p>
            Para ejercer cualquiera de estos derechos, podrán contactarnos a
            través del correo electrónico{" "}
            <a href="mailto:hello@caracterprod.com" className="privacy-link">
              hello@caracterprod.com
            </a>
            .
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Cookies</h2>
          <p>
            Este sitio web puede utilizar cookies para mejorar la experiencia de
            navegación, analizar el tráfico y optimizar el funcionamiento del
            sitio.
          </p>
          <p>
            El usuario puede configurar su navegador para rechazar o eliminar
            cookies en cualquier momento.
          </p>
        </section>

        <section className="privacy-section">
          <h2>9. Modificaciones</h2>
          <p>
            Caracter Producciones podrá actualizar esta Política de Privacidad
            cuando resulte necesario. Cualquier modificación será publicada en
            esta misma página.
          </p>
          <p>
            El uso continuado del sitio web implica la aceptación de las
            actualizaciones realizadas.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
