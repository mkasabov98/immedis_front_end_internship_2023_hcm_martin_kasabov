import { createReducer } from "@ngrx/store";
import { WORKFORCE_DETAILS } from "src/app/data/workforce-details";
import { workforceDetailsInterface } from "src/app/interfaces/workforceDetails.interface";

const initialState:workforceDetailsInterface = WORKFORCE_DETAILS;

export const workforceDetailsReducer = createReducer(
    initialState
)