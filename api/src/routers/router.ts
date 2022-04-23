import { Router } from 'express';
import { addData, findByMetaData, getData } from '../controllers/controller';

const router = Router();

router.post('/addData', addData);
router.post('/getData', getData);
router.post('/searchByMetaData', findByMetaData);

export default router;
