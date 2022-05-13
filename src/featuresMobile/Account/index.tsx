import React, { useContext, useState } from "react";
import "./account.css";
import icon from "../../constants/icon";
import Bottom from "../Bottom/index";
import OrderMb from "./Orders";
import AccountForm from "./AccountForm/index";
import ServicesUserMb from "./ServicesUser";
import DiscountUserMb from "./DiscountUser";
import { AppContext } from "../../context/AppProvider";
import mediaApi from "../../api/mediaApi";
import authentication from "../../api/authApi";
import { putUser } from '../../redux/USER/userSlice'
import { useSelector, useDispatch } from "react-redux";


function AccountMb() {
  const { t } = useContext(AppContext);
  const [openOrder, setOpenOrder] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [openSer, setOpenSer] = useState(false);
  const [openDiscount, setOpenDiscount] = useState(false)
  const dispatch = useDispatch();
  const USER = useSelector((state: any) => state.USER.USER);

  //const [avatarMb, setAvatarMb] = useState();

  const onFileChange = (e: any) => {
    const form = e.target.files[0];
    handlePostMedia(form)
  }
  const handlePostMedia = async (form: any) => {
    let formData = new FormData();
    formData.append('file', form);
    try {
      const res = await mediaApi.postMedia(formData);
      const action = putUser({ ...USER, avatar: res.data.context.original_url })
      dispatch(action)
      const model_id = await res.data.context.model_id;
      const params = {
        media_id: model_id
      }
      await authentication.putUserProfile(params)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="mb-ac">
      <div className="mb-ac__cnt">
        <div className="mb-ac__cnt-avt">
          <div className="mb-ac__cnt-avt-wrap">
            <div className="mb-ac__cnt-avt-box">
              <img
                src={USER?.avatar}
                alt=""
                className="mb-ac__cnt-avt-box-img"
              />
              <button>
                <label htmlFor="file_mb">
                  <img src={icon.Camera_purple} alt="" />
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
            <div className="flex-column mb-ac__cnt-avt-name">
              {USER?.fullname}
              <div className="mb-ac__cnt-avt-rank">
                <ul>
                  <li>
                    <div className=" flex-row-sp item">
                      <img src={icon.Ticket} alt="" />
                      <div className="item-cnt">
                        <span>Điểm</span>
                        <span>2000</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className=" flex-row-sp item">
                      <img src={icon.Wallet} alt="" />
                      <div className="item-cnt">
                        <span>Số dư</span>
                        <span>200.000đ</span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className=" flex-row-sp item">
                      <img src={icon.Crown} alt="" />
                      <div className="item-cnt">
                        <span>Hạng</span>
                        <span>Vàng</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-ac__cnt-private">
          <ul>
            <li>
              <div
                onClick={() => setOpenAcc(true)}
                className="flex-column mb-ac__cnt-private-item"
              >
                <img src={icon.User_purple} alt="" />
                <span>{t("Header.my_acc")}</span>
              </div>
            </li>
            <li>
              <div className="flex-column mb-ac__cnt-private-item">
                <img src={icon.Credit_card} alt="" />
                <span>{t("pm.payment_method")}</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => setOpenOrder(true)}
                className="flex-column mb-ac__cnt-private-item"
              >
                <img src={icon.Clock_purple} alt="" />
                <span>{t("Header.my_order")}</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => setOpenSer(true)}
                className="flex-column mb-ac__cnt-private-item"
              >
                <img src={icon.bag} alt="" />
                <span>{t("app.my_services")}</span>
              </div>
            </li>
            <li>
              <div
                onClick={() => setOpenDiscount(true)}
                className="flex-column mb-ac__cnt-private-item"
              >
                <img src={icon.Ticket} alt="" />
                <span>{t("Header.my_codes")}</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="mb-ac__cnt-private">
          <ul>
            <li>
              <div className="flex-column mb-ac__cnt-private-item">
                <img src={icon.Bell} alt="" />
                <span>{t("Header.noti")}</span>
              </div>
            </li>
            <li>
              <div className="flex-column mb-ac__cnt-private-item">
                <img src={icon.Setting} alt="" />
                <span>{t("Header.settings")}</span>
              </div>
            </li>
            <li>
              <div className="flex-column mb-ac__cnt-private-item">
                <img src={icon.Headphones_purple} alt="" />
                <span>{t("Header.support")}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Bottom />
      {/* open dialog */}
      <OrderMb openOrder={openOrder} setOpenOrder={setOpenOrder} />
      <ServicesUserMb open={openSer} setOpen={setOpenSer} />
      <AccountForm open={openAcc} setOpen={setOpenAcc} />
      <DiscountUserMb open={openDiscount} setOpen={setOpenDiscount} />
    </div>
  );
}

export default AccountMb;
