import {
    VALIDATE_EMAIL,
    VALIDATE_EMAIL_SUCCESS,
    VALIDATE_EMAIL_FAILURE,
    ME_FROM_TOKEN,
    ME_FROM_TOKEN_SUCCESS,
    ME_FROM_TOKEN_FAILURE,
    RESET_TOKEN,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    RESET_USER,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNIN_USER_FAILURE,
    GET_USERS,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    LOGOUT_USER,
    UPDATE_USER_EMAIL,
    SOCIAL_SIGNIN_USER,
    SIGNIN_USER_ADMIN,
    SIGNIN_USER_ADMIN_FAILURE,
    SIGNIN_USER_ADMIN_SUCCESS,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE

} from '../actions/users';



const INITIAL_STATE = { user: null, status: null, error: null, loading: false, userList: [], admin: false, userprojects: null };

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {


        default: return state;
    }
}