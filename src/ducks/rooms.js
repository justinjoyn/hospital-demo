// Actions
const SET_ROOMS = 'hospital/rooms/SET_ROOMS';

// Reducer
export default function reducer(state = { data: [] }, action = {}) {
    switch (action.type) {
        case SET_ROOMS:
            return {
                ...state
            };
        default:
            return state;
    }
}

// Action Creators
export function setRooms(rooms) {
    return { type: SET_ROOMS, rooms };
}
