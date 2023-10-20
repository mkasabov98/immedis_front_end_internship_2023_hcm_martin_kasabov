import { createReducer } from "@ngrx/store";
import { COUNTRY_DETAILS } from "src/app/data/country-details";

const initialState = COUNTRY_DETAILS
export const countryDetailsReducer = createReducer(
    initialState
)