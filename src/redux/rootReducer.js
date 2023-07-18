import { combineReducers } from 'redux';


import usernameReducer from './name/names.reducer';


const rootReducer = combineReducers({


    username: usernameReducer

});

export default rootReducer;