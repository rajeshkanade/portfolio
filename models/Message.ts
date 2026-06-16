import mongoose, { Schema, type Model } from 'mongoose'

/** Shape of a persisted contact message. */
export interface IMessage {
  name: string
  email: string
  message: string
  createdAt: Date
}

const messageSchema = new Schema<IMessage>({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 200,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
  },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
  createdAt: { type: Date, default: Date.now, index: true },
})

/** Reuse the compiled model across hot-reloads / warm Lambdas. */
export const Message: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) ??
  mongoose.model<IMessage>('Message', messageSchema)

export default Message
