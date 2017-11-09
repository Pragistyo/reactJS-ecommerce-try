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
    // alert(JSON.stringify(action))
    if (action.type === 'VERIFY_USER') {
        // alert(JSON.stringify(action.payload.token))
        return  {
            ...state,
            userData: {
                ...state.userData,
                userId: action.payload.result.data.id,
                username: `Welcome ${action.payload.result.data.username} !`
            },
            loginStatus: {
                ...state.loginStatus,
                status: true,
                token: action.payload.token
            }
        }
    } else if (action.type === 'LOGOUT'){
        return {
            ...state,
            userData: {
                ...state.userData,
                userId: null,
                username: null
            },
            loginStatus: {
                ...state.loginStatus,
                status: false,
                token: null
            }
        }
    } else {
        return state
    }
}



export default loginReducer