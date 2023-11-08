export interface leaveRequestInterface {
    startDate: string,
    endDate: string,
    userRequestingLeaveId: number,
    isAccepted: boolean | null,
    handlerId: number | null,
    dateOfCreation: string,
    message: string,
    userRequestingLeaveName: string,
    leaveRequestId: number,
    handledOn: string | null,
    handlerName: string | null
}