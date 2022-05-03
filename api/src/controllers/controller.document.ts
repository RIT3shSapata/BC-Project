import { Request, Response } from 'express';
import User from '../models/models.user';
import { DocumentData, DocumentDataEnc } from '../types/DocumentData';
// import { addFile } from '../utils/ipfs';
import { write } from '../utils/bigChainDB';
import { encrypt } from '../utils/cryptography';

const addData = async (req: Request, res: Response) => {
    try {
        const { _id } = req.query;
        const documentData: DocumentData = JSON.parse(req.body.documentData);
        const user = await User.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }
        const personalData_enc = encrypt(
            JSON.stringify(documentData.personalData),
            user.publicKey
        );
        const documentID_enc = encrypt(documentData.documentID, user.publicKey);
        const documentData_enc: DocumentDataEnc = {
            documentID: documentID_enc,
            documentType: documentData.documentType,
            personalData: personalData_enc,
        };
        const tid = await write(documentData_enc);
        res.send({
            message: 'Document added successfully',
            tid,
            // personalData: documentData.personalData,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

export { addData };
