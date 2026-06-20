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

interface ContactNotificationProps {
  nombre?: string
  email?: string
  empresa?: string
  tipo?: string
  fecha?: string
  mensaje?: string
}

const RED = '#c0181b'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'

export const ContactNotification = ({
  nombre = 'Sin nombre',
  email = '—',
  empresa = '—',
  tipo = '—',
  fecha = '—',
  mensaje = '—',
}: ContactNotificationProps) => (
  <Html>
    <Head />
    <Preview>Nuevo mensaje de contacto de {nombre}</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, Helvetica, sans-serif', margin: 0, padding: '24px' }}>
      <Container style={{ maxWidth: '560px', margin: '0 auto', border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
        <Section style={{ backgroundColor: RED, padding: '20px 28px' }}>
          <Text style={{ color: '#ffffff', fontSize: '13px', letterSpacing: '2px', margin: 0, textTransform: 'uppercase' }}>Caracter — Nuevo contacto</Text>
        </Section>
        <Section style={{ padding: '28px' }}>
          <Heading style={{ color: INK, fontSize: '20px', margin: '0 0 16px' }}>Nuevo mensaje del formulario</Heading>
          <Row label="Nombre" value={nombre} />
          <Row label="Email" value={email} />
          <Row label="Empresa" value={empresa} />
          <Row label="Tipo de evento" value={tipo} />
          <Row label="Fecha estimada" value={fecha} />
          <Hr style={{ borderColor: '#eee', margin: '16px 0' }} />
          <Text style={{ color: MUTED, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>Mensaje</Text>
          <Text style={{ color: INK, fontSize: '15px', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-wrap' }}>{mensaje}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={{ margin: '0 0 10px', fontSize: '15px', color: INK }}>
    <span style={{ color: MUTED, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}: </span>
    {value}
  </Text>
)

export const template = {
  component: ContactNotification,
  subject: (data: ContactNotificationProps) => `Nuevo contacto: ${data?.nombre ?? 'web'}`,
  displayName: 'Contacto — notificación',
  to: 'hello@caracterprod.com',
  previewData: {
    nombre: 'Juan Pérez',
    email: 'juan@empresa.com',
    empresa: 'Empresa SA',
    tipo: 'Corporativo',
    fecha: '15/08/2026',
    mensaje: 'Queremos organizar un evento corporativo para 300 personas.',
  },
} satisfies TemplateEntry