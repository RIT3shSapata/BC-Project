import { Router } from 'express';
import { addData, getDoc } from '../controllers/controller.document';
import upload from '../middlewares/multer';

const router = Router();

router.post('/addDoc', upload.single('document'), addData);
router.post('/getDoc', getDoc);

export default router;
