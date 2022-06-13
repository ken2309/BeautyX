export const cartReducer = (carts: any[]) => {
    const products = carts.filter((item: any) => item.is_type === 1);
    const services = carts.filter((item: any) => item.is_type === 2);
    const combos = carts.filter((item: any) => item.is_type === 3);
    return { products, services, combos }
}