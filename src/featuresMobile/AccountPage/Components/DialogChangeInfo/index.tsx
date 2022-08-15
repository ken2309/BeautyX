import { Dialog } from "@mui/material";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import authentication from "../../../../api/authApi";
import mediaApi from "../../../../api/mediaApi";
import icon from "../../../../constants/icon";
import { putUser, updateAsyncUser } from "../../../../redux/USER/userSlice";
import * as Yup from "yup";
import "./dialogChangeInfo.css";
import { AppContext } from "../../../../context/AppProvider";

export default function DialogChangeInfo(props: any) {
    const { open, setOpen } = props;
    const {t} = useContext(AppContext);
    const { USER } = useSelector((state: any) => state.USER);
    const dispatch = useDispatch();
    // chose file
    const onFileChange = (e: any) => {
        const form = e.target.files[0];
        handlePostMedia(form);
    };
    // upload image
    const handlePostMedia = async (form: any) => {
        let formData = new FormData();
        formData.append("file", form);
        try {
            const res = await mediaApi.postMedia(formData);
            const action = putUser({
                ...USER,
                avatar: res.data.context.original_url,
            });
            dispatch(action);
            const model_id = await res.data.context.model_id;
            const params = {
                media_id: model_id,
            };
            await authentication.putUserProfile(params);
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };
    // form
    const formik = useFormik({
        initialValues: {
            fullname: USER?.fullname,
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required(t("form.please_enter_full_name")),
        }),
        onSubmit: async (values) => {
            const params = {
                fullname: values.fullname,
            };
            if (values.fullname !== USER?.fullname) {
                await dispatch(updateAsyncUser(params));
            }
            setOpen(false);
        },
    });
    
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <form
                autoComplete="off"
                onSubmit={formik.handleSubmit}
                className="edit-user"
            >
                <div className="edit-user__img">
                    <img src={USER?.avatar} alt="" />
                    <button
                        type="button"
                    >
                        <label htmlFor="file_mb" className="img-overlay">
                            <img src={icon.cameraAcc} alt="" />
                        </label>
                    </button>
                    <input
                        hidden
                        id="file_mb"
                        type="file"
                        name="file_mb"
                        accept="image/jpeg"
                        onChange={onFileChange}
                    />
                </div>
                <div className="edit-user__info">
                    <div>
                        <input
                            autoFocus
                            value={formik.values?.fullname}
                            onChange={formik.handleChange}
                            type="text"
                            placeholder={t("form.please_enter_full_name")}
                            name="fullname"
                        />
                        {formik.errors.fullname && formik.touched.fullname && (
                            <p
                                style={{ fontSize: "10px" }}
                                className="err-text"
                            >
                                {formik.errors.fullname}
                            </p>
                        )}
                    </div>
                    <div className="edit-user__phone">
                        <img src={icon.phonePurple} alt="" />
                        <span>{USER?.telephone}</span>
                    </div>
                    <div className="edit-user__email">
                        <img src={icon.emailPurple} alt="" />
                        <span>{USER?.email}</span>
                    </div>
                </div>
                <div className="edit-user__option">
                    <button type="submit">{t("acc.save")} &#10003;</button>
                    <button type="button" onClick={() => setOpen(false)}>
                        {t("Home.cancel")} &#x2715;
                    </button>
                </div>
            </form>
        </Dialog>
    );
}
