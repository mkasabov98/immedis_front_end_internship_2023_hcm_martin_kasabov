export class leaveRequest {
    public dateOfCreation: string;
    public leaveRequestId: number;
    constructor(
        public startDate: string,
        public endDate: string,
        public userRequestingLeaveId: number,
        public userRequestingLeaveName: string,
        public isAccepted: boolean | null = null,
        public handlerId: number | null = null,
        public message: string = "",
        public handledOn: string | null = null,
        public handlerName: string | null = null,
    ){
        this.leaveRequestId = this.generateUniqueId();
        this.dateOfCreation = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    }

    private generateUniqueId(): number {
        const timestamp = Date.now();
        const randomNumber = Math.floor(Math.random() * 10000);
        const uniqueId = `${timestamp}${randomNumber}`;
        return Number(uniqueId);
      }
}