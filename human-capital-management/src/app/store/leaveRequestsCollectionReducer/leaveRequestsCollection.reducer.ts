import { createReducer, on } from "@ngrx/store";
import { leaveRequestInterface } from "src/app/interfaces/leaveRequest.interface";
import { addLeaveRequest, updateLeaveRequest } from "./leaveRequestsCollection.actions";
import { LEAVE_REQUESTS_COLLECTION } from "src/app/data/leave-requests-collection";

const inititialState: leaveRequestInterface[] = LEAVE_REQUESTS_COLLECTION;

export const leaveRequestsCollectionReducer = createReducer(
    inititialState, 
    on(addLeaveRequest, (state, leaveRequest: leaveRequestInterface) => {
        return [...state, leaveRequest]
    }),
    on(updateLeaveRequest, (state, leaveRequest: leaveRequestInterface) =>{
        const requestToUpdateIndex = state.findIndex(request => request.leaveRequestId === leaveRequest.leaveRequestId);
        if (requestToUpdateIndex !== -1) {
            return [
                ...state.slice(0, requestToUpdateIndex),
                leaveRequest,
                ...state.slice(requestToUpdateIndex + 1)
            ]
        }
        return state;
    })
)
