import { Request, Response } from 'express';
import { DocumentData } from '../types/DocumentData';
import { write, read, searchMeta } from '../utils/bigChainDB';
import {
    encrypt,
    generateKeys,
    decrypt,
    createSignature,
    verifySignature,
} from '../utils/cryptography';

const addData = async (req: Request, res: Response) => {
    const { personalData, id }: DocumentData = req.body;
    const tid = await write(personalData, id);
    res.send(tid);
};

const getData = async (req: Request, res: Response) => {
    const { tid } = req.body;
    const transaction = await read(tid);
    res.send(transaction);
};

const findByMetaData = async (req: Request, res: Response) => {
    const { id } = req.body;
    const transaction = await searchMeta(id);
    res.send(transaction);
};

const encryptionTest = async (req: Request, res: Response) => {
    const { plainText, publicKey } = req.body;
    const cipherText = encrypt(JSON.stringify(plainText), publicKey);
    res.send(cipherText);
};

const decryptionTest = async (req: Request, res: Response) => {
    const { cipherText, privateKey } = req.body;
    const plainText = decrypt(cipherText, privateKey);
    res.send(plainText);
};

const generateKeyPair = async (req: Request, res: Response) => {
    res.send(generateKeys());
};

const generateSignature = async (req: Request, res: Response) => {
    const { plainText, privateKey } = req.body;
    const signature = createSignature(JSON.stringify(plainText), privateKey);
    res.send(signature);
};

const verifySign = async (req: Request, res: Response) => {
    const { plainText, signature, publicKey } = req.body;
    const verified = verifySignature(
        JSON.stringify(plainText),
        signature,
        publicKey
    );
    res.send(verified);
};
export {
    addData,
    getData,
    findByMetaData,
    encryptionTest,
    generateKeyPair,
    decryptionTest,
    generateSignature,
    verifySign,
};
