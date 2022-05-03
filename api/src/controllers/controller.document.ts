import { Request, Response } from 'express';
import User from '../models/models.user';
import { DocumentData, personalData } from '../types/DocumentData';
// import { addFile } from '../utils/ipfs';
import { write } from '../utils/bigChainDB';

const addData = async (req: Request, res: Response) => {
    try {
        const { _id } = req.query;
        const documentData: DocumentData = req.body;
        const user = await User.findByIdAndUpdate(_id, {
            $push: {
                documents: {
                    documentID: documentData.documentID,
                    documentType: documentData.documentType,
                },
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        const tid = await write(documentData);
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
