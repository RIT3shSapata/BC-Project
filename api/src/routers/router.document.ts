import { Router } from 'express';
import {
    addData,
    getDoc,
    writeDoc,
    findDoc,
} from '../controllers/controller.document';
import upload from '../middlewares/multer';

const router = Router();

router.post('/addDoc', addData);
router.post('/writeDoc', upload.single('document'), writeDoc);
router.post('/getDoc', getDoc);
router.post('/findDoc', findDoc);

export default router;
