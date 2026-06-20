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

interface BriefNotificationProps {
  email?: string
  fileName?: string
}

const RED = '#c0181b'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'

export const BriefNotification = ({
  email = '—',
  fileName = '—',
}: BriefNotificationProps) => (
  <Html>
    <Head />
    <Preview>Nuevo brief recibido de {email}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '560px', margin: '0 auto', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
        <Section style={{ backgroundColor: RED, padding: '20px 28px' }}>
          <Text style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>Caracter — Nuevo brief</Text>
        </Section>
        <Section style={{ padding: '28px' }}>
          <Heading style={{ color: INK, fontSize: '20px', margin: '0 0 16px' }}>Importación de brief</Heading>
          <Text style={{ margin: '0 0 10px', fontSize: '15px', color: INK }}>
            <span style={{ color: MUTED, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Email del contacto: </span>
            {email}
          </Text>
          <Text style={{ margin: '0 0 10px', fontSize: '15px', color: INK }}>
            <span style={{ color: MUTED, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Archivo: </span>
            {fileName}
          </Text>
          <Hr style={{ borderColor: '#eee', margin: '16px 0' }} />
          <Text style={{ color: MUTED, fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
            El contacto cargó un brief desde la página de contacto. Escribile a {email} para pedirle el archivo si no llegó adjunto.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: BriefNotification,
  subject: (data: BriefNotificationProps) => `Nuevo brief de ${data?.email ?? 'web'}`,
  displayName: 'Brief — notificación',
  to: 'hello@caracterprod.com',
  previewData: {
    email: 'cliente@empresa.com',
    fileName: 'brief-evento-2026.pdf',
  },
} satisfies TemplateEntry