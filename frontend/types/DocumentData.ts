type personalData = {
    name: string;
    DateOfBirth: string;
    address: string;
};
type DocumentData = {
    id: string;
    personalData: personalData;
};

export type { DocumentData, personalData };
