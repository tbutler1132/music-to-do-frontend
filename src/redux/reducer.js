import {combineReducers} from 'redux'

const defaultState = {
    currentUser: false
}

function currentUserReducer(currentState = defaultState.currentUser, action){
    console.log(action)
    switch(action.type){

        case "set_current_user":
            return action.payload
        default:
            return currentState
    }
}

const rootReducer = combineReducers({
    currentUser: currentUserReducer
})

export default rootReducer