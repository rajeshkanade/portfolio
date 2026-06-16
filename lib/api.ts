import type { ApiResponse, ContactFormValues, SavedMessage } from '@/types'

/** Narrowed result type returned to the UI from contact submission. */
export interface SubmitResult {
  ok: boolean
  message: string
}

/**
 * Submit the contact form to POST /api/contact (same-origin Next.js route).
 * Never throws — always resolves to a UI-friendly { ok, message } so the form
 * can render success/error states without try/catch at the call site.
 */
export async function submitContact(values: ContactFormValues): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const data = (await res.json()) as ApiResponse<SavedMessage>
    return { ok: data.success, message: data.message }
  } catch {
    return {
      ok: false,
      message: 'Could not reach the server. Please check your connection and try again.',
    }
  }
}
