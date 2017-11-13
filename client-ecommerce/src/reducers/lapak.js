import swal from 'sweetalert'
const initState = {
    allItem: [],
    // allItem: [
    //         { _id: '001', name: 'Iphone X', price: 16000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-x.jpg', category: 'Phone' },
    //         { _id: '002', name: 'Iphone 8', price: 12000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-8.jpg', category: 'Phone' },
    //         { _id: '003', name: 'Iphone 7', price: 10000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/apple-iphone-7r4.jpg', category: 'Phone' },
    //         { _id: '004', name: 'Google Pixel 2', price: 11000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/google-pixel-2.jpg', category: 'Phone' },
    //         { _id: '005', name: 'Google Pixel 2 XL', price: 15000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/google-pixel-xl2-.jpg', category: 'Phone' },
    //         { _id: '006', name: 'Google Pixel C', price: 9000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/google-pixel-c--.jpg', category: 'Tablet' },
    //         { _id: '007', name: 'I Watch Series 3', price: 9000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/apple-watch-edition-series3.jpg', category: 'Watch' },
    //         { _id: '008', name: 'I Watch Series 2', price: 8000000, img: 'https://cdn2.gsmarena.com/vv/bigpic/apple-watch2-edition-42mm.jpg', category: 'Watch' }
    //     ],
    formLoginRegis: false,
    title: null,
    totalPrice: 0,
    cart: [],
    cartFront: [],
    history: []
}

function compoReducer(state = initState, action) {
    switch (action.type) {
        case 'GET_ALLITEM':
        // alert(JSON.stringify(action))
            return {...state, allItem: action.payload}
        case 'GET_CATEGORY':
            return {...state, allItem: action.payload}
        case 'SET_ITEM':
            return { ...state, item: action.payload.item}
        case 'UPDATE_FORM_LOGIN_REGIS':
            return {...state, formLoginRegis:action.payload}
        case 'CHANGE_TITLE':
            return { ...state, title: action.payload}
        case 'ADD_TO_CART':
            return {
                ...state, 
                cart: [...state.cart, action.payload]
            }
        case 'ADD_TO_CART_FRONT':
            let newTotal = action.payload.price;
            if (state.cartFront.length > 0) {
                state.cartFront.forEach(item => {
                    newTotal += item.price * item.quantity
                })
            }
            // state.cartFront = [...state, action.payload]
            state.totalPrice = newTotal
            state.cartFront.push(action.payload)
            return state
            // return {
            //     ...state,
            //     totalPrice: 100000005,
            //     cartFront: [...state.cartFront, action.payload]
            // }
        case 'CLEAR_CART':
            return {
                ...state, cart: [], cartFront: [], totalPrice: 0
            }
        case 'TOTAL_PRICE':
            return {
                ...state, totalPrice: action.payload
            }
        case 'HISTORY_TRANS':
            return {
                ...state, history: action.payload
            }
        default:
            return state
    }

}

export default compoReducer