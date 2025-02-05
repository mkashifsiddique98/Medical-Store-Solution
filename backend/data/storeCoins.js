import { STORE_COIN_CONFIG } from '../config/coin.js';

export const storeCoins = [
    {
        name: 'One Store Coins value',
        key: STORE_COIN_CONFIG.ONE_STORE_COINT_VALUE,
        value : 0.02,
    },
    {
        name: 'Register',
        key: STORE_COIN_CONFIG.REGISTER,
        value : 5 * 50
    },
    {
        name: 'Complete Profile',
        key: STORE_COIN_CONFIG.COMPLETE_PROFILE,
        value : 10 * 50,
    },
    {
        name: 'Order coins for one hundred',
        key: STORE_COIN_CONFIG.ORDER_COMPLETED_PER_HUNDRED,
        value : 1/0.02,
    },
]
