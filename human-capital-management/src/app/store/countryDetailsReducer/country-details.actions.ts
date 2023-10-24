import { createAction, props } from "@ngrx/store";

export const addCountry = createAction(
    "[Add Country] AddCountry",
    props<{newCountry:string}>()
);

export const addNationality = createAction(
    "[Add Nationality] Add Nationality",
    props<{newNationality:string}>()
);

export const addCurrency = createAction(
    "[Add Currency] Add Currency",
    props<{newCurrency:string}>()
)

