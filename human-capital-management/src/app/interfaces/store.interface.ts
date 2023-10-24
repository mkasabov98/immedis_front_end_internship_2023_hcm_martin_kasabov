import { countryDetailsInterface } from "./countryDetails.interface";
import { loggedUSerInterface } from "./loggedUser.interface";
import { userInterface } from "./user.interface";
import { workforceDetailsInterface } from "./workforceDetails.interface";

export interface StoreInterface{
    loggedUser: loggedUSerInterface | null;
    countryDetails: countryDetailsInterface;
    userCollection: userInterface[];
    workforceDetails: workforceDetailsInterface
}