// Actions
const SET_ROOMS = 'hospital/rooms/SET_ROOMS';

// Reducer
export default function reducer(state = { data: [] }, action = {}) {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
}

// Action Creators
export function setRooms(data) {
    return { type: SET_ROOMS, data };
}
