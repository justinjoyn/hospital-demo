// Actions
const SET_PATIENTS = 'hospital/patients/SET_PATIENTS';

// Reducer
export default function reducer(state = { data: [] }, action = {}) {
    switch (action.type) {
        case SET_PATIENTS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

// Action Creators
export function setPatients(data) {
    return { type: SET_PATIENTS, data };
}
