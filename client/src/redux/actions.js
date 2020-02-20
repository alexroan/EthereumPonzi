export function web3Loaded(connection){
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function accountLoading(account){
    return {
        type: 'ACCOUNT_LOADING',
        account
    }
}

export function accountLoaded(account){
    return {
        type: 'ACCOUNT_LOADED',
        account
    }
}

export function doublerLoaded(doubler){
    return {
        type: 'DOUBLER_LOADED',
        doubler
    }
}

export function etherAmountChanged(amount){
    return {
        type: 'ETHER_AMOUNT_CHANGED',
        amount
    }
}