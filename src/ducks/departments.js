// Actions
const SET_DEPARTMENTS = 'hospital/doctors/SET_DEPARTMENTS';

// Reducer
export default function reducer(state = { data: [] }, action = {}) {
    switch (action.type) {
        case SET_DEPARTMENTS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

// Action Creators
export function setDepartments(data) {
    return { type: SET_DEPARTMENTS, data };
}
