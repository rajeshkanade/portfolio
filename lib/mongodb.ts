import mongoose from 'mongoose'

/**
 * Cached MongoDB connection for serverless (Vercel) environments.
 *
 * Each serverless invocation may reuse a warm Lambda, so we stash the live
 * connection (and any in-flight connect promise) on `globalThis` to avoid
 * opening a new socket on every request — the standard Next.js + Mongoose
 * pattern. If `MONGODB_URI` is not configured, `connectDB()` returns null and
 * callers respond with a friendly 503.
 */

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null }
global._mongooseCache = cache

export async function connectDB(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI
  if (!uri) return null

  if (cache.conn) return cache.conn

  if (!cache.promise) {
    mongoose.set('strictQuery', true)
    cache.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
      bufferCommands: false,
    })
  }

  try {
    cache.conn = await cache.promise
    return cache.conn
  } catch (err) {
    cache.promise = null
    throw err
  }
}
