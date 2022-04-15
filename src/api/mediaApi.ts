import axiosClient from "./axios";

class Media {
    postMedia = (formData: any) => {
        console.log(formData)
        const session = window.sessionStorage.getItem("_WEB_TK");
        const local = localStorage.getItem("_WEB_TK");
        const url = `media`;
        // const params = {
        //     file: ''
        // }
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${session ? session : local}`,
            },
        })
    }
}
const mediaApi = new Media();
export default mediaApi