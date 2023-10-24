import { StoreInterface } from "../../interfaces/store.interface";

export const selectAllManagers = (store: StoreInterface) => {
    const managers = store.userCollection.filter(user => user.manager)
    .map(({id, firstName, lastName}) => ({id, firstName, lastName}));
    return managers;
}

export const selectNumberOfUsers = (store: StoreInterface) => {
    return store.userCollection.length;
}

export const selectUserCollection = (store: StoreInterface) => {
    return store.userCollection
}