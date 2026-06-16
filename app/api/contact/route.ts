import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Message from '@/models/Message'
import type { ApiResponse, ContactFormValues, SavedMessage } from '@/types'

// Mongoose needs the Node.js runtime (not the Edge runtime).
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Validate + sanitize the incoming payload. Returns errors or a clean value. */
function validate(body: Record<string, unknown>): {
  errors: string[]
  value: ContactFormValues
} {
  const errors: string[] = []
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (name.length < 2) errors.push('Name must be at least 2 characters.')
  else if (name.length > 120) errors.push('Name must be under 120 characters.')

  if (!EMAIL_RE.test(email)) errors.push('A valid email address is required.')
  else if (email.length > 200) errors.push('Email must be under 200 characters.')

  if (message.length < 10) errors.push('Message must be at least 10 characters.')
  else if (message.length > 5000) errors.push('Message must be under 5000 characters.')

  return { errors, value: { name, email, message } }
}

/** POST /api/contact — validate then persist a contact message. */
export async function POST(req: Request): Promise<NextResponse<ApiResponse<SavedMessage>>> {
  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 },
    )
  }

  const { errors, value } = validate(body)
  if (errors.length > 0) {
    return NextResponse.json({ success: false, message: errors.join(' ') }, { status: 400 })
  }

  try {
    const conn = await connectDB()
    if (!conn) {
      return NextResponse.json(
        {
          success: false,
          message:
            'The message store is not configured yet. Please email me directly at rajeshkanade121@gmail.com.',
        },
        { status: 503 },
      )
    }

    const saved = await Message.create(value)
    return NextResponse.json(
      {
        success: true,
        message: "Thanks for reaching out — I'll get back to you soon!",
        data: {
          _id: String(saved._id),
          name: saved.name,
          email: saved.email,
          message: saved.message,
          createdAt: saved.createdAt.toISOString(),
        },
      },
      { status: 201 },
    )
  } catch (err) {
    console.error('POST /api/contact failed:', err)
    return NextResponse.json(
      {
        success: false,
        message:
          'Something went wrong saving your message. Please try again shortly or email me directly.',
      },
      { status: 500 },
    )
  }
}
