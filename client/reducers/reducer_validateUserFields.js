import { VALIDATE_USER_FIELDS, VALIDATE_USER_FIELDS_SUCCESS, VALIDATE_USER_FIELDS_FAILURE, RESET_VALIDATE_USER_FIELDS } from '../actions/validateUserFields';



const INITIAL_STATE = { error: null, loading: false };

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        default: return state;
    }
}