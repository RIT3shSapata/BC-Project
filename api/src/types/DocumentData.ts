type personalData = {
    name: string;
    DateOfBirth: string;
    address: string;
};
type DocumentData = {
    documentID: string;
    documentType: string;
    personalData: personalData;
};

type DocumentDataEnc = {
    documentID: string;
    documentType: string;
    personalData: string;
};

export { DocumentData, personalData, DocumentDataEnc };
