const initState = {
    userData: {
        userId: null,
        username: null
    },
    loginStatus: {
        status : false,
        token: null
    }
}

function loginReducer(state = initState, action) { // payload
    if (action.type === 'GET_USER_DATA') {
        return  {
            ...state,
            userData: {
                ...state.userData,
                userId: action._id
            }
        }
    } else {
        return state
    }
}



export default loginReducer