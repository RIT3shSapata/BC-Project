import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT = 5000;

app.get('/isworking', (req: Request, res: Response) => {
    res.send('working');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
