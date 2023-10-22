import { createReducer, on } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";
import { addUser, changePassword } from "./user-collection.actions";
import { USERS } from "src/app/data/users";

const initialState: userInterface[] = USERS;

export const userCollectionReducer = createReducer(
    initialState,
    on(addUser, (state, user: userInterface) => {
        return [...state, user]
    }),
    on(changePassword, (state, {userID, newPassword}) => {
        const userToUpdateIndex = state.findIndex(user => user.id === userID);
    
        if (userToUpdateIndex !== -1) {
            const userToUpdate = { ...state[userToUpdateIndex], password: newPassword };
            return [
                ...state.slice(0, userToUpdateIndex),
                userToUpdate,
                ...state.slice(userToUpdateIndex + 1),
            ];
        }
        return state;
    })
    
)