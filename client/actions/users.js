import axios from 'axios';
/*eslint-disable */
//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const SOCIAL_SIGNIN_USER = 'SOCIAL_SIGNIN_USER';
export const SIGNIN_USER_ADMIN = 'SIGNIN_USER_ADMIN';
export const SIGNIN_USER_ADMIN_SUCCESS = 'SIGNIN_USER_ADMIN_SUCCESS';
export const SIGNIN_USER_ADMIN_FAILURE = 'SIGNIN_USER_ADMIN';
//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';


// update profile
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE'
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE'
//validate email, if success, then load user and login
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when email is updated in profile to update main user's email state
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

// get users LIst
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:5000' : '';

export function validateEmail(validateEmailToken) {
  //check if token from welcome email is valid, if so, update email as verified and login the user from response
  const request = axios.get(`${ROOT_URL}/validateEmail/${validateEmailToken}`);

  return {
    type: VALIDATE_EMAIL,
    payload: request
  };
}

export function validateEmailSuccess(currentUser) {
  return {
    type: VALIDATE_EMAIL_SUCCESS,
    payload: currentUser
  };
}

export function validateEmailFailure(error) {
  return {
    type: VALIDATE_EMAIL_FAILURE,
    payload: error
  };
}

export function meFromToken(tokenFromStorage) {
  //check if the token is still valid, if so, get me from the server
  const request = axios.get(`${ROOT_URL}/api/v1.1/validate/token/${tokenFromStorage}`);

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}


export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}

export function AuthSignInUser(){

    const request = axios.get(`${ROOT_URL}/oauth/google`);

  return {
    type: SOCIAL_SIGNIN_USER,
    payload: request
  };
}

export function signUpUser(formValues) {
  const request = axios.post(`${ROOT_URL}/api/v1.1/employee/signup`, formValues);

  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}


export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/api/v1.1/signin`, formValues);

  return {
    type: SIGNIN_USER,
    payload: request
  };
}
export function AdminsignInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/api/v1.1/signin`, formValues);

  return {
    type: SIGNIN_USER_ADMIN,
    payload: request
  };
}
export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}
export function AdminsignInUserSuccess(user){
   return {
    type: SIGNIN_USER_ADMIN_SUCCESS,
    payload: user
  };
}
export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function logoutUser() {

  const request = axios.get(`${ROOT_URL}/logout`);
  return {
    type: LOGOUT_USER,
    payload: request
  };
}
export function updateUserEmail(email) {
  return {
    type: UPDATE_USER_EMAIL,
    payload:email
  };
}


export function getUsers(){
 const request = axios.get(`${ROOT_URL}/api/v1.1/employees`);

  return {
    type: GET_USERS,
    payload: request
  };
}
export function getUsersSuccess(payload){
  return {
    type: GET_USERS_SUCCESS,
    payload: payload
  };
}
export function getUsersFailure(error){
  return {
    type: GET_USERS_FAILURE,
    payload: error
  };
}

 export function  updateUserProfile(id,values){
   const request = axios.put(`${ROOT_URL}/api/v1.1/employee/${id}`, values);
  return {
    type: UPDATE_USER_PROFILE,
    payload: request
  };
}
 export function updateUserProfileSuccess(payload){
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: payload
  };
}
 export function  updateUserProfileFailure(error){
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: error
  };
}



