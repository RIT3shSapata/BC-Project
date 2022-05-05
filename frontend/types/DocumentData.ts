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

export type { DocumentData, personalData };
