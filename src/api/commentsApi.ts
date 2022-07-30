import axiosClient from "./axios";
import { AUTH_HEADER } from "../utils/authHeader";

class Comments {
    //get comments org
    getCommentsOrg = (values: any) => {
        const url = `comments`;
        const params = {
            page: values.page,
            limit: 8,
            "filter[commentable_type]": "ORGANIZATION",
            "filter[commentable_id]": values.org_id,
            include: "rate|user|children",
            sort: "-created_at",
        };
        return axiosClient.get(url, { params });
    };
    //post comments org
    postCommentOrg = (values: any) => {
        const url = `/comments`;
        const params = {
            commentable_type: "ORGANIZATION",
            commentable_id: values.org_id,
            organization_id: values.org_id,
            body: values.body,
        };
        return axiosClient.post(url, params, AUTH_HEADER());
    };
    //comments products, services
    getComments = (values: any) => {
        const url = `/comments`;
        const params = {
            page: values.page,
            limit: 8,
            "filter[commentable_type]": values.type,
            "filter[commentable_id]": values.id,
            "filter[organization_id]": values.org_id,
            include: "rate|user|children",
            sort: "-created_at",
        };
        return axiosClient.get(url, { params });
    };
    postComment = (values: any) => {
        const url = `/comments`;
        const params = {
            commentable_type: values.type,
            commentable_id: values.id,
            organization_id: values.org_id,
            body: values.body,
        };
        return axiosClient.post(url, params, AUTH_HEADER());
    };
}
const commentsApi = new Comments();
export default commentsApi;
