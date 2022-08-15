import { User } from './user'

export interface ICommentChild {
    id?: number,
    body: number,
    user_id: number,
    user: User,
    organization_id?: number,
    rate_id?: number,
    commentable_type?: string,
    commentable_id: number,
    created_at?: string,
    updated_at?: string,
    deleted_at?: null
}

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
    user: User,
    children: ICommentChild[]
}