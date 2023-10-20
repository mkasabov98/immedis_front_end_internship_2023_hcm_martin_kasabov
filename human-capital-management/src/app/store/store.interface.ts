import { countryDetailsInterface } from "../interfaces/countryDetails.interface";
import { loggedUSerInterface } from "../interfaces/loggedUser.interface";
import { userInterface } from "../interfaces/user.interface";
import { workforceDetailsInterface } from "../interfaces/workforceDetails.interface";

export interface StoreInterface{
    loggedUser: loggedUSerInterface | null;
    countryDetails: countryDetailsInterface;
    userCollection: userInterface[];
    workforceDetails: workforceDetailsInterface
}