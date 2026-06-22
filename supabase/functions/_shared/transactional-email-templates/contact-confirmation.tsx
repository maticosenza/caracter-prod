import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactConfirmationProps {
  nombre?: string
}

const RED = '#c0181b'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'

export const ContactConfirmation = ({
  nombre = '',
}: ContactConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Recibimos tu mensaje — Caracter Producciones</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '560px', margin: '0 auto', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
        <Section style={{ backgroundColor: RED, padding: '20px 28px' }}>
          <Text style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>Caracter Producciones</Text>
        </Section>
        <Section style={{ padding: '28px' }}>
          <Heading style={{ color: INK, fontSize: '20px', margin: '0 0 16px' }}>¡Recibimos tu mensaje!</Heading>
          <Text style={{ color: INK, fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }}>
            {nombre ? `Hola ${nombre},` : 'Hola,'}
          </Text>
          <Text style={{ color: INK, fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }}>
            Gracias por escribirnos. Tu mensaje llegó correctamente y nuestro equipo te va a responder a la brevedad.
          </Text>
          <Hr style={{ borderColor: '#eee', margin: '16px 0' }} />
          <Text style={{ color: MUTED, fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
            Caracter Producciones — Productora de eventos, Buenos Aires, AR.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: 'Recibimos tu mensaje — Caracter Producciones',
  displayName: 'Contacto — confirmación al cliente',
  previewData: {
    nombre: 'Juan Pérez',
  },
} satisfies TemplateEntry