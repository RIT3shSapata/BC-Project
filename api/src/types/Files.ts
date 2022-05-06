import { CID } from 'ipfs-http-client';

export type file = {
    name: string;
    type: string;
    size: number;
    cid: CID;
};

export type fileConv = {
    name: string;
    type: string;
    size: number;
    cid: string;
};
