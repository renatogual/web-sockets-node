import mongoose, { Document, Schema } from 'mongoose'

type Message = Document & {
    to: String,
    text: string;
    roomId: string;
    created_at: Date;
}

const MessageSchema = new Schema({
    text: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    roomId: {
        type: String,
        ref: 'ChatRoom'
    },
})

const Message = mongoose.model<Message>('Messages', MessageSchema)

export { Message }