import express, { Application, Request, Response } from 'express';
import IMulterFile from './Interfaces/MulterFile';
import upload from './middlewares/multer';
import { addFile, run } from './utils/ipfs';

const app: Application = express();
const PORT = 5000;

app.get('/isworking', (req: Request, res: Response) => {
    res.send('working');
});

app.get('/ls', async (req: Request, res: Response) => {
    const response = await run();
    console.log(response);
    res.send({ ...response, cid: response.cid.toString() });
});

app.post(
    '/single',
    upload.single('image'),
    async (req: Request, res: Response) => {
        const file: IMulterFile | undefined = req.file;
        await addFile(file);
        res.send('single file uploaded');
    }
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
