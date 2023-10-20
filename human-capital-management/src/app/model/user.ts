export class User{
    constructor(
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public id: number, //On creating will take the array with all users and set the id=id of last user +1
        public phoneNumber: number,
        public birthDate: string,
        public stratingDate: string,
        public sex: string,
        public nationality: string,
        public city: string,
        public country: string,
        public bankDetails: string,
        public salary: number,
        public salaryCurrency: string,
        public department: string,
        public managerID: number,
        public position: string,
        public manager: boolean,
        public paidLeaveDaysLeft: number,
        public permission: string = "employee"
    ) {}
}