import type * as React from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'
import { template as briefNotification } from './brief-notification.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'
import { template as briefConfirmation } from './brief-confirmation.tsx'

export interface TemplateEntry {
  // deno-lint-ignore no-explicit-any
  component: React.ComponentType<any>
  // deno-lint-ignore no-explicit-any
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  'contact-notification': contactNotification,
  'brief-notification': briefNotification,
  'contact-confirmation': contactConfirmation,
  'brief-confirmation': briefConfirmation,
}