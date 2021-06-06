

export const setCurrentUser = (userObj) => {
    return function (dispatch){
        console.log("I'm hit")
        dispatch({type: "set_current_user", payload: userObj})
    }
}