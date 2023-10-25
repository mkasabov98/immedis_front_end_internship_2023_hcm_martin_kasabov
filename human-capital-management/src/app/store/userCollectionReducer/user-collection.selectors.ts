import { userInterface } from "src/app/interfaces/user.interface";
import { StoreInterface } from "../../interfaces/store.interface";

export const selectAllManagers = (store: StoreInterface) => {
    const managers = store.userCollection.filter(user => user.manager)
        .map(({ id, firstName, lastName }) => ({ id, firstName, lastName }));
    return managers;
}

export const selectNumberOfUsers = (store: StoreInterface) => {
    return store.userCollection.length;
}

export const selectUserCollection = (store: StoreInterface) => {
    return store.userCollection
}

export const selectLoggedUserTeam = (store: StoreInterface, loggedUserId: number) => {
    const userCollection = store.userCollection;
    const loggedUser = userCollection.find(user => user.id === loggedUserId);
    const loggedUserDirectManagerId = loggedUser?.directManagerID;
    let loggedUserTeam: userInterface[] = [];
    if (loggedUser?.manager) {
        userCollection.forEach(user => {
            if (user.directManagerID === loggedUserId && user.id !== loggedUserId) {
                loggedUserTeam.push(user);
            }
        })
    } else {
        userCollection.forEach(user => {
            if ((user.directManagerID === loggedUserDirectManagerId && user.id !== loggedUserId) || user.id === loggedUserDirectManagerId) {
                loggedUserTeam.push(user);
            }
        })
    }
    return loggedUserTeam;
}

export const selectLoggedUserDepartment = (store: StoreInterface, loggedUserId: number) => {
    const userCollection = store.userCollection;
    const loggedUser = userCollection.find(user => user.id === loggedUserId);
    const loggedUserDepartment = loggedUser?.department;
    let loggedUserDepartmentCollection: userInterface[] = [];

    userCollection.forEach(user => {
        if (user.department === loggedUserDepartment) {
            loggedUserDepartmentCollection.push(user);
        }
    });
    return loggedUserDepartmentCollection;
}