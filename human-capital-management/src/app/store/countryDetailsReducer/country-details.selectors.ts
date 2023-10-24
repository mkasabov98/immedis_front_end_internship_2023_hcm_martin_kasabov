import { StoreInterface } from "../../interfaces/store.interface";

export const selectCountryDetails = (store: StoreInterface) => {
    return store.countryDetails;
}

export const selectAllCountries = (store: StoreInterface) => {
    return store.countryDetails.countries;
}

export const selectAllNationalities = (store: StoreInterface) => {
    return store.countryDetails.nationalities;
}

export const selectAllCurrencies = (store: StoreInterface) => {
    return store.countryDetails.currencies;
}