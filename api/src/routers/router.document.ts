import { Router } from 'express';
import { addData } from '../controllers/controller.document';
import upload from '../middlewares/multer';

const router = Router();

router.post('/addDoc', upload.single('document'), addData);

export default router;
