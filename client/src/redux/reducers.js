import {combineReducers} from 'redux';

function web3(state = {}, action) {
    switch (action.type) {
        case 'WEB3_LOADED':
            return { ...state, connection: action.connection };
        case 'ACCOUNT_LOADING':
            return { ...state, accountLoading: true};
        case 'ACCOUNT_LOADED':
            return { ...state, account: action.account, accountLoading: false };
        case 'DOUBLER_LOADED':
            return { ...state, doubler: action.doubler};
        default:
            return state;
    }
}

function doubler(state = {}, action) {
    switch (action.type) {
        case 'TOTAL_USERS_LOADED':
            return { ...state, totalUsers: action.totalUsers}
        case 'TOTAL_WEI_LOADED':
            return { ...state, totalWei: action.totalWei}
        case 'TOTAL_PAYOUT_LOADED':
            return { ...state, totalPayout: action.totalPayout}
        case 'CURRENTLY_PAYING_LOADED':
            return { ...state, currentlyPaying: action.currentlyPaying}
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
    web3, user, doubler
});

export default rootReducer;