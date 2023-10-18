import { createReducer, on } from "@ngrx/store";
import { login, logout } from "./login.actions";
import { StoreInterface } from "../store.interface";
import { userInterface } from "src/app/interfaces/user.interface";



type UserState = null | number;

const initialState: UserState = null;

export const loginReducer = createReducer<UserState>(
    initialState,
    on(login, (state, user: userInterface) => user.id),
    on(logout, (state) => null)
)