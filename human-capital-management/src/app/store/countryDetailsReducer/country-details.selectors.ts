import { StoreInterface } from "../store.interface";

export const selectCountryDetails = (store: StoreInterface) => {
    return store.countryDetails;
}