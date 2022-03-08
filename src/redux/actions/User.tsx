import { CREATE_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "./type"
export const createUser = ({ username, email, password }: { username: string; email: string; password: string; }) => (
    {
        type: CREATE_USER,

        payload: { "username": username, "email": email, "password": password }
    }
);
export const loginUser = ({ username, password }: { username: string; password: string }) =>
(
    {
        type: LOGIN_USER,
        payload: { "username": username, "password": password }
    }
);
export const logOutUser = () =>
(
    {
        type: LOGOUT_USER,
        payload: {}
    }
);
export const updateUser = ({ username, email, password, olduser }: { username: string; email: string; password: string, olduser: any }) =>
(
    {
        type: UPDATE_USER,
        payload: { "username": username, "email": email, "password": password, Olduser: olduser }
    }
);
