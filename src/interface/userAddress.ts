export interface IUserAddress {
    id: number,
    latitude: null | number,
    longitude: null | number,
    address: string | null,
    is_default: boolean,
    user_id: number,
    created_at: string,
    updated_at: string
}