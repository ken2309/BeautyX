
import axiosClient from "./axios";

class Comments {
    //get comments org
    getCommentsOrg = (values: any) => {
        const url = `comments`;
        const params = {
            "page": values.page,
            "limit": 8,
            "filter[commentable_type]": "ORGANIZATION",
            "filter[commentable_id]": values.org_id,
            "include": "rate|user",
            "sort": "-created_at"
        }
        return axiosClient.get(url, { params })
    }
    //post comments org
    postCommentOrg = (values: any) => {
        const session = window.sessionStorage.getItem("_WEB_TK");
        const local = localStorage.getItem("_WEB_TK")
        const url = `/comments`;
        const params = {
            "commentable_type": "ORGANIZATION",
            "commentable_id": values.org_id,
            "organization_id": values.org_id,
            "body": values.body
        }
        return axiosClient.post(url, params, {
            headers: {
                Authorization: `Bearer ${session ? session : local}`,
            },
        })
    }
    //comments products, services
    getComments = (values: any) => {
        const url = `/comments`;
        const params = {
            page: values.page,
            limit: 8,
            "filter[commentable_type]": values.type,
            "filter[commentable_id]": values.id,
            "filter[organization_id]": values.org_id,
            "include": "rate|user",
            "sort": "-created_at"
        }
        return axiosClient.get(url, { params })
    }
    postComment = (values: any) => {
        const session = window.sessionStorage.getItem("_WEB_TK");
        const local = localStorage.getItem("_WEB_TK")
        const url = `/comments`;
        const params = {
            "commentable_type": values.type,
            "commentable_id": values.id,
            "organization_id": values.org_id,
            "body": values.body
        }
        return axiosClient.post(url, params, {
            headers: {
                Authorization: `Bearer ${session ? session : local}`,
            },
        })
    }
}
const commentsApi = new Comments();
export default commentsApi;