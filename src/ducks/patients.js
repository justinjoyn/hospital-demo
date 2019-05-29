import _ from 'lodash';

// Actions
const SET_PATIENTS = 'hospital/patients/SET_PATIENTS';

// Reducer
export default function reducer(state = { data: [], updated: 0 }, action = {}) {
    switch (action.type) {
        case SET_PATIENTS:
            return {
                ...state,
                data: action.data,
                updated: _.now()
            };
        default:
            return state;
    }
}

// Action Creators
export function setPatients(data) {
    return { type: SET_PATIENTS, data };
}
