import { readFileSync } from 'fs';
import { create } from 'ipfs-http-client';
import IMulterFile from '../types/MulterFile';
import { CID } from 'ipfs-http-client';

const ipfs = create({
    url: 'http://localhost:5001/api/v0',
});

// const run = async () => {
//     const res = await ipfs.files.stat('/');
//     console.log(res);
//     return res;
// };

export const v0tov1 = (cid: string) => {
    const cid_v1 = CID.parse(cid).toV1().toString();
    return cid_v1;
};

export const listFiles = async () => {
    const result = [];
    for await (const resultPart of ipfs.files.ls('/')) {
        result.push(resultPart);
        return result;
    }
};

export const addFile = async (file: IMulterFile | undefined) => {
    if (file) {
        console.log(file);
        console.log(file.path);
        const data = Buffer.from(readFileSync(file.path));
        console.log(data);
        const added = await ipfs.files.write('/' + file.originalname, data, {
            create: true,
        });
        console.log(added);
        //console.log(res)
        // return added;
    }
    // run();
};
