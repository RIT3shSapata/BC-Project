import { Document } from 'mongoose';

type IDocument = {
    documentID: string;
    documentType: string;
};

export interface IUser extends Document {
    email: string;
    password: string;
    publicKey: string;
    documents: IDocument[];
}
