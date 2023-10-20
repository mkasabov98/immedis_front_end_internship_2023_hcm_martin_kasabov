import { createAction, props } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";


export const addUser = createAction(
    "[Add User] AddUser",
    props<userInterface>()
)