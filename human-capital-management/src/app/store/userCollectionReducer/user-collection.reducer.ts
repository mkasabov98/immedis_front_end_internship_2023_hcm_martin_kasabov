import { createReducer, on } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";
import { addUser, changeEmail, changePassword, changeProfilePhoto, chnagePhoneNumber } from "./user-collection.actions";
import { USERS } from "src/app/data/users";

const initialState: userInterface[] = USERS;

export const userCollectionReducer = createReducer(
    initialState,
    on(addUser, (state, user: userInterface) => {
        return [...state, user]
    }),
    on(changePassword, (state, { userID, newPassword }) => {
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
    }),
    on(changeEmail, (state, { userID, newEmail }) => {
        const userToUpdateIndex = state.findIndex(user => user.id === userID);

        if (userToUpdateIndex !== -1) {
            const userToUpdate = { ...state[userToUpdateIndex], email: newEmail };
            return [
                ...state.slice(0, userToUpdateIndex),
                userToUpdate,
                ...state.slice(userToUpdateIndex + 1),
            ];
        }
        return state;
    }),
    on(chnagePhoneNumber, (state, {userID, newPhoneNumber}) => {
        const userToUpdateIndex = state.findIndex(user => user.id === userID);

        if (userToUpdateIndex !== -1) {
            const userToUpdate = { ...state[userToUpdateIndex], phoneNumber: newPhoneNumber };
            return [
                ...state.slice(0, userToUpdateIndex),
                userToUpdate,
                ...state.slice(userToUpdateIndex + 1),
            ];
        }
        return state;
    }),
    on(changeProfilePhoto, (state, {userID, newProfilePhoto}) => {
        const userToUpdateIndex = state.findIndex(user => user.id === userID);

        if (userToUpdateIndex !== -1) {
            const userToUpdate = { ...state[userToUpdateIndex], profilePhoto: newProfilePhoto };
            return [
                ...state.slice(0, userToUpdateIndex),
                userToUpdate,
                ...state.slice(userToUpdateIndex + 1),
            ];
        }
        return state;
    })
)