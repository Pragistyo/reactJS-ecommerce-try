export const getAllItem = () => {
    return {
        type: 'GET_ALLITEM'
    }
}

// export const setSelectedHero = (activeHero) => {
export const setSelectedItem = (item) => {
    return {
        // type: 'SET_ACTIVE_HERO',
        type: 'SET_ITEM',
        payload: {
            // hero: activeHero
            itemCurrent: item
        }
    }
}

export const changeLoginRegis = (params) => {
    return {
        type: 'UPDATE_FORM_LOGIN_REGIS',
        payload: params
    }
}

export const addCart = (params) => {
    return {
        type: 'ADD_TO_CART',
        payload: params
    }
}

export const addCartFront = (params) => {
    return {
        type: 'ADD_TO_CART_FRONT',
        payload: params
    }
}

export const setTitle = (params) => {
    return {
        type: 'CHANGE_TITLE',
        payload: params
    }
}

export const setTotalPrice = (params) => {
    return {
        type: 'TOTAL_PRICE',
        payload: params
    }
}

// export const destroyActiveHero = {
export const destroyItem = {
    // type: 'DESTROY_ACTIVE_HERO'
    type: 'DESTROY_ITEM'
}