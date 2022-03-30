const initialState = {
    walletAddress: "",
};

function addReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_WALLET':
            return { ...state, walletAddress: action.payload.walletAddress };
        case 'DISCONNECT_WALLET':
            return { ...state, walletAddress: "" };
        default:
            return state;
    }
}

export default addReducer;
