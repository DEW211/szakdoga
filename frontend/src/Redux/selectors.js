export const getSum = store => store.cart.sum;
export const getNumberOfItemsInCart = store => store.cart.cart.reduce((sum, current) => {
    return sum + current.amount
},0);

export const getCart = store => store.cart.cart;
export const isSignedIn = store => store.login.login;