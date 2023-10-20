import { StoreInterface } from "../store.interface";

export const selectAllManagers = (store: StoreInterface) => {
    const managers = store.userCollection.filter(user => user.manager)
    .map(({id, firstName, lastName}) => ({id, firstName, lastName}));
    return managers;
}