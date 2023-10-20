import { countryDetailsInterface } from "../interfaces/countryDetails.interface";
import { userInterface } from "../interfaces/user.interface";

export interface StoreInterface{
    loggedUser: userInterface | null;
    countryDetails: countryDetailsInterface;
    userCollection: userInterface[];
}