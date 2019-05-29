import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import departments from '../ducks/departments';
import doctors from '../ducks/doctors';
import patients from '../ducks/patients';
import rooms from '../ducks/rooms';

const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
});

const rootReducer = combineReducers({
    rooms,
    patients,
    doctors,
    departments
});

const store = createStore(rootReducer, compose(applyMiddleware(loggerMiddleware, thunkMiddleware)));

export default store;
