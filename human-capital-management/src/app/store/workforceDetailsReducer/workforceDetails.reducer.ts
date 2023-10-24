import { createReducer, on } from "@ngrx/store";
import { WORKFORCE_DETAILS } from "src/app/data/workforce-details";
import { workforceDetailsInterface } from "src/app/interfaces/workforceDetails.interface";
import { addDepartment, addPosition } from "./workforceDetails.actions";

const initialState: workforceDetailsInterface = WORKFORCE_DETAILS;

export const workforceDetailsReducer = createReducer(
    initialState,
    on(addDepartment, (state, { newDepartment }) => {
       return {
        ...state,
        departments: [...state.departments, newDepartment]
       }
    }),
    on(addPosition, (state, {newPosition}) => {
        return {
            ...state, 
            positions: [...state.positions, newPosition]
        }
    })
)