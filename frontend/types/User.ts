type IDocument = {
    documentID: string;
    documentType: string;
};

export interface IUser {
    _id: string;
    email: string;
    password: string;
    publicKey: string;
    documents: IDocument[];
}
