import { CREATE_USER, LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actions/type"

const intialState = {
    Users: [],
    CurrentUser: false,
}

const UserReducer = (state = intialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                Users: state.Users.concat([action.payload])
            };
        case LOGIN_USER:
            return { ...state, CurrentUser: true };
        case LOGOUT_USER:
            return { ...state, CurrentUser: false };
        case UPDATE_USER:
            var Olduser = state.Users.filter(e => e.username != action.payload.Olduser.username)
            var newUserarr = Olduser.concat({ username: action.payload.username, email: action.payload.email, password: action.payload.password })
            return { ...state, Users: newUserarr };

        default:
            return state;
    }
}

export default UserReducer;