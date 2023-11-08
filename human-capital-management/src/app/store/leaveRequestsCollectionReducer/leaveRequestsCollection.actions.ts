import { createAction, props } from "@ngrx/store";
import { leaveRequestInterface } from "src/app/interfaces/leaveRequest.interface";

export const addLeaveRequest = createAction(
    "[Add Leave Request] AddLeaveRequest",
    props<leaveRequestInterface>()
)

export const updateLeaveRequest = createAction(
    "[Update Leave Request] UpdateLeaveRequest",
    props<leaveRequestInterface>()
)