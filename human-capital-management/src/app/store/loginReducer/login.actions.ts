import { createAction, props } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";

export const login = createAction(
    "[Login] Login",
    props<userInterface>()
)

export const logout = createAction(
    "[Logout] Logout"
)