export interface IComment {
    id: number,
    body: string,
    user_id: number,
    organization_id: null | number,
    rate_id: null | number,
    commentable_type: string,
    commentable_id: number,
    created_at: string,
    updated_at: string,
    deleted_at: null | string,
    rate: null | number,
    user: {
        id: number,
        fullname: string,
        email: string,
        telephone: string,
        platform: null | string
    }
}