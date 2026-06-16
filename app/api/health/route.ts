import { NextResponse } from 'next/server'
import type { ApiResponse } from '@/types'

/** GET /api/health — simple liveness probe. */
export function GET(): NextResponse<ApiResponse> {
  return NextResponse.json({ success: true, message: 'API is healthy' })
}
