export const listServices = [
    { id: 1, product_name: 'Liệu trình ngăn ngừa lão hóa da, dưỡng da', is_product: false, retail_price: 880000, special_price: 780000 },
    { id: 2, product_name: 'Massage Thái Lan, giảm đau xương khớp', is_product: false, retail_price: 360000, special_price: -1 },
    { id: 3, product_name: 'Chăm sóc da mặt bằng đất sét tự nhiên', is_product: false, retail_price: 390000, special_price: -1 },
    { id: 4, product_name: 'Liệu trình ngăn ngừa lão hóa da, dưỡng da', is_product: false, retail_price: 550000, special_price: -1 },
    { id: 5, product_name: 'Massage Thái Lan', is_product: false, retail_price: 1100000, special_price: 1100000 },
    { id: 6, product_name: 'Massage Giảm đau xương khớp', is_product: false, retail_price: 880000, special_price: 780000 },
    { id: 7, product_name: 'Chăm sóc da mặt', is_product: false, retail_price: 2200000, special_price: 1900000 },
    { id: 8, product_name: 'Liệu trình ngăn ngừa lão hóa', is_product: false, retail_price: 5000000, special_price: 2500000 },
]
export const discountsOrg = [
    {
        id: 5,
        title: "Test Final Price",
        description: "Test Final Price",
        discount_value: 123000,
        discount_unit: "PRICE",
        discount_type: "FINAL_PRICE",
        valid_from: null,
        valid_util: null,
        valid_time: null,
        coupon_code: "E",
        minimum_order_value: null,
        maximum_discount_value: null,
        priority: 0,
        total: null,
        used: 0,
        limit: null,
        platform: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
        items_count: 0,
        organizations: [
            {
                id: 1,
                name: "MYSPA Dev 2021",
                subdomain: "dev",
                domain: "myspa.vn",
                latitude: 16.03963,
                longitude: 108.1891627,
                telephone: [
                    "0354328444"
                ],
                address: "241 Phan Xích Long ",
                min_price: 500000,
                max_price: 7000000,
                image: "20220311073137.jpg",
                is_momo_ecommerce_enable: true,
                is_moba_register_requested: true,
                opening_status: true,
                opening_time: [
                    {
                        from_time_opening: "08:00",
                        to_time_opening: "19:00",
                        time_opening: "on"
                    }
                ],
                created_at: "2022-01-07 16:37:38",
                updated_at: "2022-05-30 08:48:40",
                province_code: 48,
                district_code: 495,
                ward_code: 20314,
                priority: 1,
                timezone: null,
                is_demo: false,
                description: null,
                full_address: "241 Phan Xích Long , Phường Hòa Xuân, Quận Cẩm Lệ, Thành phố Đà Nẵng",
                image_url: "https://dev.myspa.vn/files/dev/avatar/20220311073137.jpg",
                is_favorite: false,
                pivot: {
                    "discount_id": 1,
                    "organization_id": 1
                }
            }
        ],
        items: []
    },
    {
        id: 1,
        title: "Test Final Price",
        description: "Test Final Price",
        discount_value: 123000,
        discount_unit: "PRICE",
        discount_type: "PRODUCT",
        valid_from: null,
        valid_util: null,
        valid_time: null,
        coupon_code: "E",
        minimum_order_value: null,
        maximum_discount_value: null,
        priority: 0,
        total: null,
        used: 0,
        limit: null,
        platform: null,
        deleted_at: null,
        created_at: null,
        updated_at: null,
        items_count: 0,
        organizations: [
            {
                id: 2,
                name: "MYSPA Dev 2021",
                subdomain: "dev",
                domain: "myspa.vn",
                latitude: 16.03963,
                longitude: 108.1891627,
                telephone: [
                    "0354328444"
                ],
                address: "241 Phan Xích Long ",
                min_price: 500000,
                max_price: 7000000,
                image: "20220311073137.jpg",
                is_momo_ecommerce_enable: true,
                is_moba_register_requested: true,
                opening_status: true,
                opening_time: [
                    {
                        from_time_opening: "08:00",
                        to_time_opening: "19:00",
                        time_opening: "on"
                    }
                ],
                created_at: "2022-01-07 16:37:38",
                updated_at: "2022-05-30 08:48:40",
                province_code: 48,
                district_code: 495,
                ward_code: 20314,
                priority: 1,
                timezone: null,
                is_demo: false,
                description: null,
                full_address: "241 Phan Xích Long , Phường Hòa Xuân, Quận Cẩm Lệ, Thành phố Đà Nẵng",
                image_url: "https://dev.myspa.vn/files/dev/avatar/20220311073137.jpg",
                is_favorite: false,
                pivot: {
                    "discount_id": 1,
                    "organization_id": 1
                }
            }
        ],
        items: []
    }
] 