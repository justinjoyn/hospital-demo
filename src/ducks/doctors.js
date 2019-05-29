// Actions
const SET_DOCTORS = 'hospital/doctors/SET_DOCTORS';

// Reducer
export default function reducer(state = { data: [] }, action = {}) {
    switch (action.type) {
        case SET_DOCTORS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

// Action Creators
export function setDoctors(data) {
    return { type: SET_DOCTORS, data };
}
