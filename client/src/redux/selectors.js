import {get} from 'lodash';
import {createSelector} from 'reselect';

const web3 = state => get(state, 'web3.connection', null);
export const web3Selector = createSelector(web3, w => w);

const doubler = state => get(state, 'web3.doubler', null);
export const doublerSelector = createSelector(doubler, d => d);

const account = state => get(state, 'web3.account', null);
export const accountSelector = createSelector(account, d => d);

const accountLoading = state => get(state, 'web3.accountLoading', false);
export const accountLoadingSelector = createSelector(accountLoading, a => a);

const depositAmount = state => get(state, 'user.deposit', 0);
export const depositAmountSelector = createSelector(depositAmount, d => d);

const totalPayout = state => get(state, 'doubler.totalPayout', 0);
export const totalPayoutSelector = createSelector(totalPayout, t => t);

const currentlyPaying = state => get(state, 'doubler.currentlyPaying', 0);
export const currentlyPayingSelector = createSelector(currentlyPaying, t => t);
