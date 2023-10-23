import { createAction, props } from "@ngrx/store";
import { userInterface } from "src/app/interfaces/user.interface";


export const addUser = createAction(
    "[Add User] AddUser",
    props<userInterface>()
)

export const changePassword = createAction(
    "[Change Password] ChangePassword",
    props<{userID:number, newPassword:string}>()
)

export const changeEmail = createAction(
    "[Change Email] ChangeEmail",
    props<{userID:number, newEmail:string}>()
)

export const chnagePhoneNumber = createAction(
    "[Change Phone Number] ChangePhoneNumber",
    props<{userID:number, newPhoneNumber:number}>()
)

export const changeProfilePhoto = createAction(
    "[Change Profile Photo] ChangeProfilePhoto",
    props<{userID:number, newProfilePhoto: string }>()
)