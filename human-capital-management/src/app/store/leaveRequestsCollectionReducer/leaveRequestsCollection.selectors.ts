import { StoreInterface } from "src/app/interfaces/store.interface";

export const selectNotHandledRequests = (store: StoreInterface) => {
    const notHandledRequests = store.leaveRequestsCollection.filter(request => request.isAccepted === null);
    return notHandledRequests;
}