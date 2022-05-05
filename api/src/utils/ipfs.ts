import { readFileSync } from 'fs';
import { create } from 'ipfs-http-client';
import IMulterFile from '../types/MulterFile';

const ipfs = create({
    url: 'http://localhost:5001/api/v0',
});

const run = async () => {
    const res = await ipfs.files.stat('/');
    console.log(res);
    return res;
};

const addFile = async (file: IMulterFile | undefined) => {
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
    run();
};

export { run, addFile };
