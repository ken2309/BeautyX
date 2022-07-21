export interface IOrganization {
    id: number;
    name: string;
    subdomain: string;
    latitude: number;
    longitude: number;
    address: string;
    min_price: number;
    max_price: number;
    image: string;
    is_momo_ecommerce_enable: boolean;
    created_at: string;
    updated_at: string;
    province_code: number;
    district_code: number;
    ward_code: number;
    full_address: string;
    image_url: string;
    branches: [] | any;
    opening_time: any;
    favorites_count: number;
    is_favorite?: boolean | null;
    favorites: [];
    distance: number | undefined;
    tags: [];
    telephone: [];
}
