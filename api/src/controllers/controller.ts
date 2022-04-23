import { Request, Response } from 'express';
import { DocumentData } from '../types/DocumentData';
import { write, read, searchMeta } from '../utils/bigChainDB';

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

export { addData, getData, findByMetaData };
