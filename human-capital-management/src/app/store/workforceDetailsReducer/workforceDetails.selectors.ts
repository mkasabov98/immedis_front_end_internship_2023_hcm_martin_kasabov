import { StoreInterface } from "../store.interface";

export const selectAllDepartments = (store: StoreInterface) => {
    return store.workforceDetails.departments;
}

export const selectAllPositions = (store: StoreInterface) => {
    return store.workforceDetails.positions;
}

export const selectAllPermissions = (store: StoreInterface) => {
    return store.workforceDetails.permissions;
}