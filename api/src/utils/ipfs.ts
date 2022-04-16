import { create } from 'ipfs-http-client';
import IMulterFile from '../Interfaces/MulterFile';

const ipfs = create({
    url: 'http://localhost:5001/api/v0',
});

const run = async () => {
    const res = await ipfs.files.stat('/');
    console.log(res);
};

const addFile = async (file: IMulterFile | undefined) => {
    if (file) {
        await ipfs.files.write('/' + file.originalname, file.path, {
            create: true,
        });
    }
};

export { run, addFile };
