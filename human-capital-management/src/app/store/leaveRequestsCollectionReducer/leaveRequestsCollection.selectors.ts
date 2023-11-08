import { StoreInterface } from "src/app/interfaces/store.interface";

export const selectNotHandledRequests = (store: StoreInterface) => {
    const notHandledRequests = store.leaveRequestsCollection.filter(request => request.isAccepted === null);
    return notHandledRequests;
}

export const selectAllRequestsBySpecificUser = (store: StoreInterface, loggedUserId: number) => {
    return store.leaveRequestsCollection.filter(request => request.userRequestingLeaveId === loggedUserId);
}