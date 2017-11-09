const initState = {
    userData: {
        userId: null,
        username: 'test username'
    },
    loginStatus: {
        status : false,
        token: null
    }
}

function loginReducer(state = initState, action) { // payload
    // alert(JSON.stringify(action))
    if (action.type === 'VERIFY_USER') {
        alert(JSON.stringify(action.payload.data.username))
        return  {
            ...state,
            userData: {
                ...state.userData,
                userId: action.payload.data.id,
                username: action.payload.data.username
            }
        }
    } else {
        return state
    }
}



export default loginReducer