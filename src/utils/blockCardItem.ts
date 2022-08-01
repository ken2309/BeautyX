export const blockService = (price: number, special_price: number) => {
    let BLOCK_SERVICE = false;
    if (price < 1000 || (special_price > 0 && special_price < 1000)) {
        BLOCK_SERVICE = true
    }
    return BLOCK_SERVICE
}