import express, { Application, Request, Response } from 'express';
import IMulterFile from './types/MulterFile';
import upload from './middlewares/multer';
import { addFile, run } from './utils/ipfs';
import router from './routers/router';
import authRouter from './routers/router.auth';
import docRouter from './routers/router.document';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();
const PORT = 5000;
const MONGO_URL: string =
    process.env.MONGO_URL || 'mongodb://localhost:27017/digilocker';

mongoose.connect(MONGO_URL, () => {
    console.log('Connected to MongoDB: ' + MONGO_URL);
});

app.use(express.json());
app.use(router);
app.use(authRouter);
app.use(docRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Get the fuck outta here');
});

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
