import { NextResponse } from 'next/server'
import { portfolio } from '@/data/portfolio'
import type { ApiResponse, PortfolioData } from '@/types'

/**
 * GET /api/portfolio — serve the portfolio content as JSON for any headless /
 * decoupled consumer. The site itself imports the data module directly.
 */
export function GET(): NextResponse<ApiResponse<PortfolioData>> {
  return NextResponse.json({ success: true, message: 'Portfolio data', data: portfolio })
}
