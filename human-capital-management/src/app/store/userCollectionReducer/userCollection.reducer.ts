import { createReducer, on } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";
import { addUser } from "./userCollection.actions";
import { USERS } from "src/app/data/users";

const initialState: userInterface[] = USERS;

export const userCollectionReducer = createReducer(
    initialState,
    on(addUser, (state, user: userInterface) => {
        return [...state, user]
    })
)