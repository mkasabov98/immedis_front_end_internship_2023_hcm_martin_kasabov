import { createAction, props } from "@ngrx/store";

export const addDepartment = createAction(
    '[Add Department] AddDepartment',
    props<{newDepartment:string}>()
);

export const addPosition = createAction(
    '[Add Position] AddPosition',
    props<{newPosition:string}>()
);