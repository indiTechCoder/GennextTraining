import * as Auth from '../actions/auth';

const initialState = {
    user: null,
    errorMessage: ''
}

export default function auth(state = initialState, action) {

    switch (action.type) {
        case Auth.SIGNUP_REQUEST:
            console.log('signing up ...');
            console.log('username', action.payload.username);
            console.log('password', action.payload.password);
            return Object.assign({}, state);

        case Auth.SIGNUP_SUCCESS:
            console.log('sign up success', action.payload.user);
            return Object.assign({}, state, {
                user: action.payload.user,
                errorMessage: ''
            });

        case Auth.SIGNUP_ERROR:
            console.log('sign up error', action.payload.error);
            return Object.assign({}, state, {
                errorMessage: action.payload.error.message || 'Sign up error'
            });

        case Auth.LOGIN_REQUEST:
            console.log('logging ...');
            console.log('username', action.payload.username);
            console.log('password', action.payload.password);
            return Object.assign({}, state);

        case Auth.LOGIN_SUCCESS:
            console.log('login success', action.payload.user);
            return Object.assign({}, state, {
                user: action.payload.user,
                errorMessage: ''
            });

        case Auth.LOGIN_ERROR:
            console.log('login error', action.payload.error);
            return Object.assign({}, state, {
                errorMessage: action.payload.error.message || 'Log in error'
            });

        case Auth.LOGOUT:
            console.log('logout');

            if (Parse.User.current())
                Parse.User.logOut();

            return Object.assign({}, state, {
                user: null
            });

        default:
            return Object.assign({}, state);
    }
}