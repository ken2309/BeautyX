import React, { useContext, useState } from "react";
import SectionTitle from "../../SectionTitle/index";
import icon from "../../../constants/icon";
import ButtonCus from "../../../components/ButtonCus";
import { useHistory } from "react-router-dom";
import scrollTop from "../../../utils/scrollTop";
import { AppContext } from "../../../context/AppProvider";
import { Dialog } from "@mui/material";
import onErrorImg from "../../../utils/errorImg";
import { useFormik } from "formik";
import * as Yup from "yup";

function DetailMer(props: any) {
    const { org } = props;
    const { t } = useContext(AppContext);
    const history = useHistory();
    const gotoMerDetail = (item: any) => {
        history.push({
            pathname: `/org/${org?.subdomain}`,
            state: org,
        });
        scrollTop();
    };
    const [openContact, setOpenContact] = useState(false);
    function handleOpenContact() {
        setOpenContact(true);
    }
    function handleCloseContact() {
        setOpenContact(false);
    }
    const formikContact = useFormik({
        initialValues: {
            name: "",
            gmail: "",
            phone: "",
            address: "",
            business: "",
        },
        validationSchema: Yup.object({
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
            business: Yup.string().required("Vui lòng nhập loại kinh doanh"),
            name: Yup.string()
                .min(2, "Tên lớn hơn 2 ký tự")
                .max(32, "Tên nhỏ hơn 32 ký tự")
                .required("Vui lòng nhập họ và tên")
                .matches(
                    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/,
                    "Tên không đúng định dạng"
                ),
            gmail: Yup.string()
                .required("Vui lòng nhập Email")
                .matches(
                    // eslint-disable-next-line no-useless-escape
                    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i,
                    "Email không đúng định dạng Example@gmail.com"
                ),
            phone: Yup.string()
                .min(10, "Số điện thoại phải lớn hơn 10 chữ số")
                .max(11, "Số điện thoại phải nhỏ hơn 11 chữ số")
                .required("Vui lòng nhập số điện thoại")
                .matches(
                    /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    "Số điện thoại không đúng định dạng"
                ),
        }),
        onSubmit: (values: any) => {
            console.log("values :>> ", values);
        },
    });
    return (
        <div className="pr-de-mer">
            <div className="flex-row-sp pr-de-mer__content">
                <img
                    src={org?.image_url}
                    alt=""
                    className="pr-de-mer__content-avt"
                    onError={(e) => onErrorImg(e)}
                />
                <div className="flex-column detail-mer">
                    <div className="flex-row-sp pr-de-mer__content-info">
                        <span className="info-name">{org.name}</span>
                        <div className="flex-row info-rate">
                            <span>4.5</span>
                            <img src={icon.star} alt="" />
                            <span>101</span>
                            <img src={icon.chatAll} alt="" />
                        </div>
                    </div>
                    <div className="content-left__info">
                        <div className="content-left__info-detail">
                            <img src={icon.location} alt="" />
                            <span className="info-address">
                                {org?.full_address}
                            </span>
                        </div>
                    </div>
                    <div className="flex-row detail-time">
                        <img src={icon.Clock_purple} alt="" />
                        {/* {t("pr.open_time")} */}
                        <span>09.00 - 21.00</span>
                    </div>
                    <div className="flex-row detail-btn">
                        <ButtonCus
                            onClick={handleOpenContact}
                            text={t("pr.advise")}
                            fontSize="14px"
                            lineHeight="20px"
                            color="var(--bg-gray)"
                            backColor="var(--purple)"
                            border="solid 1px var(--purple)"
                            borderRadius="18px"
                        />
                        <ButtonCus
                            margin="0px 0px 0px 16px"
                            text={t("pr.looking_for_more_information")}
                            fontSize="14px"
                            lineHeight="20px"
                            color="var(--purple)"
                            backColor="var(--bg-gray)"
                            border="solid 1px var(--purple)"
                            borderRadius="18px"
                            onClick={gotoMerDetail}
                        />
                    </div>
                </div>
            </div>
            <div className="mer__content-info__util">
                <SectionTitle title={t("Mer_de.utilities")} />
            </div>
            <Dialog open={openContact} onClose={handleCloseContact}>
                <div className="form-contact">
                    <h2 className="form-contact__title">
                        Liên hệ với chúng tôi
                    </h2>
                    <span className="form-contact__desc">
                        Vui lòng cho chúng tôi biết thông tin của bạn
                    </span>

                    <div className="wrap-btn">
                        <div className="sign-form__box">
                            <img
                                className="sign-form__box-icon "
                                src={icon.User}
                                alt=""
                            />
                            <input
                                autoComplete="off"
                                value={formikContact.values.name}
                                onChange={formikContact.handleChange}
                                name="name"
                                id="name"
                                placeholder="Họ và tên"
                            />
                        </div>
                        {formikContact.errors.name &&
                            formikContact.touched.name && (
                                <p className="err-text">
                                    {formikContact.errors.name}
                                </p>
                            )}

                        <div className="sign-form__box">
                            <img
                                className="sign-form__box-icon "
                                src={icon.Message}
                                alt=""
                            />
                            <input
                                autoComplete="off"
                                value={formikContact.values.gmail}
                                onChange={formikContact.handleChange}
                                name="gmail"
                                id="gmail"
                                placeholder="Email"
                            />
                        </div>
                        {formikContact.errors.gmail &&
                            formikContact.touched.gmail && (
                                <p className="err-text">
                                    {formikContact.errors.gmail}
                                </p>
                            )}

                        <div className="sign-form__box">
                            <img
                                className="sign-form__box-icon "
                                src={icon.Phone}
                                alt=""
                            />
                            <input
                                autoComplete="off"
                                value={formikContact.values.phone}
                                onChange={formikContact.handleChange}
                                name="phone"
                                id="phone"
                                placeholder="Số điện thọai"
                            />
                        </div>
                        {formikContact.errors.phone &&
                            formikContact.touched.phone && (
                                <p className="err-text">
                                    {formikContact.errors.phone}
                                </p>
                            )}

                        <div className="sign-form__box">
                            <img
                                className="sign-form__box-icon "
                                src={icon.DeskAlt}
                                alt=""
                            />
                            <input
                                autoComplete="off"
                                value={formikContact.values.business}
                                onChange={formikContact.handleChange}
                                name="business"
                                id="business"
                                placeholder="Loại kinh doanh"
                            />
                        </div>
                        {formikContact.errors.business &&
                            formikContact.touched.business && (
                                <p className="err-text">
                                    {formikContact.errors.business}
                                </p>
                            )}

                        <div className="sign-form__box">
                            <img
                                className="sign-form__box-icon "
                                src={icon.Location}
                                alt=""
                            />
                            <input
                                autoComplete="off"
                                value={formikContact.values.address}
                                onChange={formikContact.handleChange}
                                name="address"
                                id="address"
                                placeholder="Địa chỉ"
                            />
                        </div>
                        {formikContact.errors.address &&
                            formikContact.touched.address && (
                                <p className="err-text">
                                    {formikContact.errors.address}
                                </p>
                            )}
                    </div>

                    <div className="dialog-forgot__password-btn">
                        <ButtonCus
                            onClick={handleCloseContact}
                            text="Hủy"
                            backColor="var(--bg-color)"
                            color="var(--purple)"
                            fontSize="20px"
                            lineHeight="24px"
                            borderRadius="20px"
                        />
                        <ButtonCus
                            onClick={formikContact.handleSubmit}
                            text="Xác nhận"
                            backColor="var(--purple)"
                            color="var(--bg-color)"
                            fontSize="20px"
                            lineHeight="24px"
                            borderRadius="20px"
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default DetailMer;
