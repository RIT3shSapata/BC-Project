import { Router } from 'express';
import {
    // addData,
    decryptionTest,
    encryptionTest,
    findByMetaData,
    generateKeyPair,
    generateSignature,
    getData,
    verifySign,
} from '../controllers/controller';

const router = Router();

// router.post('/addData', addData);
router.post('/getData', getData);
router.post('/searchByMetaData', findByMetaData);
router.post('/encryptionTest', encryptionTest);
router.post('/decryptionTest', decryptionTest);
router.get('/getKeyPair', generateKeyPair);
router.post('/generateSignature', generateSignature);
router.post('/verifySign', verifySign);

export default router;
