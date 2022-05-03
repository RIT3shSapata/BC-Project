import { Connection, Transaction, Ed25519Keypair } from 'bigchaindb-driver';
import { DocumentDataEnc } from '../types/DocumentData';

const write = async (documentData: DocumentDataEnc) => {
    const API_PATH = 'http://localhost:9984/api/v1/';
    const conn = new Connection(API_PATH);
    const alice = new Ed25519Keypair();

    const metadata = {
        id: documentData.documentID,
        date: Date.now(),
        DocumentType: documentData.documentType,
    };

    const transaction = Transaction.makeCreateTransaction(
        { personalData: documentData.personalData },
        metadata,
        [
            Transaction.makeOutput(
                Transaction.makeEd25519Condition(alice.publicKey)
            ),
        ],
        alice.publicKey
    );

    const txSigned = Transaction.signTransaction(transaction, alice.privateKey);
    const retrievedTx = await conn.postTransactionCommit(txSigned);
    console.log(retrievedTx);
    return retrievedTx.id;
};

const read = async (tid: string) => {
    const API_PATH = 'http://localhost:9984/api/v1/';
    const conn = new Connection(API_PATH);
    const transaction = await conn.getTransaction(tid);
    return transaction;
};

const searchMeta = async (id: string) => {
    const API_PATH = 'http://localhost:9984/api/v1/';
    const conn = new Connection(API_PATH);
    const transaction = await conn.searchMetadata(id);
    return transaction;
};

export { read, write, searchMeta };
