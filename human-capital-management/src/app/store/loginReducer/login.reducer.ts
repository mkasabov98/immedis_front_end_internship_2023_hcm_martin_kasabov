import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./login.actions";
import { StoreInterface } from "../store.interface";
import { userInterface } from "src/app/interfaces/user.interface";
import { loggedUSerInterface } from "src/app/interfaces/loggedUser.interface";



type UserState = null | loggedUSerInterface;

const initialState: UserState = null;

export const loginReducer = createReducer<UserState>(
    initialState,
    on(login, (state, user: userInterface) => {
        return { id: user.id, manager: user.manager, permission: user.permission }
    }),
    on(logout, () => null)
)