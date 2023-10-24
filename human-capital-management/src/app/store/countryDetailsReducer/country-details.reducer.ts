import { createReducer, on } from "@ngrx/store";
import { COUNTRY_DETAILS } from "src/app/data/country-details";
import { addCountry, addCurrency, addNationality } from "./country-details.actions";

const initialState = COUNTRY_DETAILS
export const countryDetailsReducer = createReducer(
    initialState,
    on(addCountry, (state, {newCountry}) => {
        return {
            ...state,
            countries: [...state.countries, newCountry]
        }
    }),
    on(addNationality, (state, {newNationality}) => {
        return {
            ...state,
            nationalities: [...state.nationalities, newNationality]
        }
    }),
    on(addCurrency, (state, {newCurrency}) => {
        return {
            ...state,
            currencies: [...state.currencies, newCurrency]
        }
    })
)