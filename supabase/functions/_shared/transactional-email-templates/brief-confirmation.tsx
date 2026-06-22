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

interface BriefConfirmationProps {
  fileName?: string
}

const RED = '#c0181b'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'

export const BriefConfirmation = ({
  fileName = '',
}: BriefConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Recibimos tu brief — Caracter Producciones</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '560px', margin: '0 auto', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
        <Section style={{ backgroundColor: RED, padding: '20px 28px' }}>
          <Text style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>Caracter Producciones</Text>
        </Section>
        <Section style={{ padding: '28px' }}>
          <Heading style={{ color: INK, fontSize: '20px', margin: '0 0 16px' }}>¡Recibimos tu brief!</Heading>
          <Text style={{ color: INK, fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }}>
            Hola,
          </Text>
          <Text style={{ color: INK, fontSize: '15px', lineHeight: '1.6', margin: '0 0 12px' }}>
            Recibimos tu brief{fileName ? ` (${fileName})` : ''} correctamente. Nuestro equipo lo va a revisar y te vamos a contactar a la brevedad.
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
  component: BriefConfirmation,
  subject: 'Recibimos tu brief — Caracter Producciones',
  displayName: 'Brief — confirmación al cliente',
  previewData: {
    fileName: 'brief-evento-2026.pdf',
  },
} satisfies TemplateEntry