export class User{
    public paidLeaveDaysLeft: number;
    public id: number;

    constructor(
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public phoneNumber: number,
        public birthDate: string,
        public startingDate: string,
        public sex: string,
        public nationality: string,
        public country: string,
        public salary: number,
        public salaryCurrency: string,
        public department: string,
        public directManagerID: number | null,
        public position: string,
        public manager: boolean,
        public permission: string = "employee",
        public profilePhoto: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU",
        public changedPassword: boolean = false
    ) {
        this.paidLeaveDaysLeft = this.calculateLeaveDays();
        this.id = this.generateUniqueId();
    }

   private calculateLeaveDays(): number {
        const curentDate = new Date();
        const start = new Date(this.startingDate);
        const months = (curentDate.getFullYear() - start.getFullYear()) * 12 + curentDate.getMonth() - start.getMonth();
        const earnedLeave = months * 1.66;
        return earnedLeave;
    }

    private generateUniqueId(): number {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 10000);
        const uniqueId = `${timestamp}${randomNumber}`;
        return Number(uniqueId);
      }
}