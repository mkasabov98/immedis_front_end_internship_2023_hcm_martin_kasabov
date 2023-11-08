export interface userInterface {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    id: number,
    phoneNumber: number,
    birthDate: string,
    startingDate: string,
    sex: string,
    nationality: string,
    country: string,
    salary: number,
    salaryCurrency: string,
    department: string,
    directManagerID: number | null,
    position: string,
    manager: boolean,
    paidLeaveDaysLeft: number,
    permission: string,
    profilePhoto: string,
    changedPassword: boolean
}

export interface userToShowInTableInterface {
    id: number,
    firstName: string,
    lastName: string,
    salary: number,
    salaryCurrency: string,
    position: string,
    department: string,
    directManagerID?: number | null;
    directManagerName?: string;
}