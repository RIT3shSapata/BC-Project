import { Request, Response } from 'express';
import User from '../models/models.user';
import { DocumentData, DocumentDataEnc } from '../types/DocumentData';
import IMulterFile from '../types/MulterFile';
// import { addFile } from '../utils/ipfs';
import { read, searchMeta, write } from '../utils/bigChainDB';
import { encrypt } from '../utils/cryptography';
import { addFile } from '../utils/ipfs';

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
        // const documentID_enc = encrypt(documentData.documentID, user.publicKey);
        // const documentID_sign = createSignature(
        //     documentData.documentID,
        //     user.publicKey
        // );
        const documentData_enc: DocumentDataEnc = {
            documentID: documentData.documentID,
            documentType: documentData.documentType,
            personalData: personalData_enc,
        };
        const tid = await write(documentData_enc);
        user.documents.push({
            documentID: documentData.documentID,
            documentType: documentData.documentType,
        });
        await user.save();
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

const getDoc = async (req: Request, res: Response) => {
    try {
        const file: IMulterFile | undefined = req.file;
        await addFile(file);
        const { _id } = req.query;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }
        const { documentID } = req.body;
        // const documentID_enc = encrypt(documentID, user.publicKey);
        // const documentID_sign = createSignature(documentID, user.publicKey);
        const result = await searchMeta(documentID);
        const tid = result[0].id;
        const transaction = await read(tid);
        res.send({
            data: transaction,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
export { addData, getDoc };
