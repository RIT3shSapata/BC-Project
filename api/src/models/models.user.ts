import { Schema, model } from 'mongoose';
import { IUser } from '../types/Interface';
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    publicKey: {
        type: String,
        required: true,
    },
    documents: [
        {
            documentID: String,
            documentType: String,
        },
    ],
});

export default model<IUser>('User', userSchema);
