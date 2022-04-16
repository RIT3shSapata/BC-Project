import express, { Application, Request, Response } from 'express';
import IMulterFile from './Interfaces/MulterFile';
import upload from './middlewares/multer';
import { addFile } from './utils/ipfs';

const app: Application = express();
const PORT = 5000;

app.get('/isworking', (req: Request, res: Response) => {
    res.send('working');
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
