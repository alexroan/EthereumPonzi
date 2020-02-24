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

export function totalUsersLoaded(totalUsers){
    return {
        type: 'TOTAL_USERS_LOADED',
        totalUsers
    }
}

export function totalWeiLoaded(totalWei){
    return {
        type: 'TOTAL_WEI_LOADED',
        totalWei
    }
}

export function totalPayoutLoaded(totalPayout){
    return {
        type: 'TOTAL_PAYOUT_LOADED',
        totalPayout
    }
}

export function currentlyPayingLoaded(currentlyPaying){
    return {
        type: 'CURRENTLY_PAYING_LOADED',
        currentlyPaying
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