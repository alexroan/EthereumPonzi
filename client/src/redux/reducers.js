import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account };
        case 'DOUBLER_LOADED':
            return { ...state, doubler: action.doubler};
        default:
            return state;
    }
}

function user(state = {}, action) {
    switch (action.type) {
        case 'ETHER_AMOUNT_CHANGED':
            return { ...state, deposit: action.amount }
        default:
            return state;
    }
}

const rootReducer = new combineReducers({
    web3, user
});

export default rootReducer;