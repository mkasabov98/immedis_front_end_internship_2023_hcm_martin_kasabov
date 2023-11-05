import { userInterface, userToShowInTableInterface } from "src/app/interfaces/user.interface";
import { StoreInterface } from "../../interfaces/store.interface";

export const selectAllManagers = (store: StoreInterface) => {
    const managers = store.userCollection.filter(user => user.manager)
        .map(({ id, firstName, lastName }) => ({ id, firstName, lastName }));
    return managers;
}

export const selectAllUsersSpecificInfo = (store: StoreInterface) => {
    const collection: userToShowInTableInterface[] = store.userCollection.filter(user => user.permission !== 'admin')
        .map(({ id, firstName, lastName, salary, salaryCurrency, position, department, directManagerID }) => (
            { id, firstName, lastName, salary, salaryCurrency, position, department, directManagerID }
        ))
    const collectionToShow: userToShowInTableInterface[] = collection.map(user => {
        const directManagerId = user.directManagerID;
        const directManager = collection.find(user => user.id === directManagerId);
        let directManagerName: string;

        if (directManager === undefined) {
            directManagerName = 'No manager';
        } else {
            directManagerName = `${directManager.firstName} ${directManager.lastName}`;
        }
        delete user.directManagerID
        return ({ ...user, directManagerName: directManagerName })
    })
    return collectionToShow;
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

export const selectSpecificUser = (store: StoreInterface, userId: number) => {
    const userCollection = store.userCollection;
    const neededUser = userCollection.find(user => user.id === userId);
    return neededUser;
}

export const selectSpecificUserName = (store: StoreInterface, userId: number) => {
    const userCollection = store.userCollection;
    const neededUser = userCollection.find(user => user.id === userId);
    if (neededUser !== undefined) {
        return `${neededUser?.firstName} ${neededUser?.lastName}`;
    } else {
        return null;
    }
}

export const selectUserByExistingEmail = (store: StoreInterface, userEmail: string, userId: number) => {
    const user = store.userCollection.find(user => user.email === userEmail)

    if (user && user.id !== userId) {
        return true;
    } else {
        return false;
    }

    //if true is returned => there is a user with the passed email
    //if false is returned => there is no user with the passed email
}

export const selectUserByExistingNumber = (store: StoreInterface, userPhoneNumber: number, userId: number) => {
    const user = store.userCollection.find(user => user.phoneNumber === userPhoneNumber)

    if (user && user.id !== userId) {
        return true;
    } else {
        return false;
    }

    //if true is returned => there is a user with the passed number
    //if false is returned => there is no user with the passed number
}