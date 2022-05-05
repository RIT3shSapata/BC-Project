import {
    publicEncrypt,
    privateDecrypt,
    generateKeyPairSync,
    constants,
    createSign,
    createVerify,
} from 'crypto';

const generateKeys = () => {
    const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    return { privateKey, publicKey };
};

// The Padding has been removed to generate the same ciphertext for the same plaintext
const encrypt = (plaintext: string, publicKey: string) => {
    const ciphertext = publicEncrypt(
        {
            key: publicKey,
            padding: constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(plaintext)
    );
    return ciphertext.toString('base64');
};

const decrypt = (ciphertext: string, privateKey: string) => {
    const plaintext = privateDecrypt(
        {
            key: privateKey,
            padding: constants.RSA_PKCS1_PADDING,
        },
        Buffer.from(ciphertext, 'base64')
    );
    return plaintext.toString('utf8');
};

const createSignature = (data: string, privateKey: string) => {
    const signer = createSign('sha256');
    signer.update(data);
    signer.end();

    const signature = signer.sign(privateKey);
    const singnature_hex = signature.toString('hex');
    return singnature_hex;
};

const verifySignature = (
    data: string,
    signature: string,
    publicKey: string
) => {
    const verifier = createVerify('sha256');
    verifier.update(data);
    verifier.end();

    const verified = verifier.verify(publicKey, signature, 'hex');
    return verified;
};

export { generateKeys, encrypt, decrypt, createSignature, verifySignature };
