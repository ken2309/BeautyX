import React, { useContext, useState } from 'react';
import icon from '../../../constants/icon';
import PopupSuccess from '../../PopupSuccess/index';
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../../context/AppProvider';
import onErrorImg from '../../../utils/errorImg';
import PaymentBranch from './PaymentBranch';

//const phoneFormat = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
function PaymentForm(props: any) {
      const { setNote, list, chooseBr, setChooseBr } = props;
      const org = list[0]?.org;
      const [open, setOpen] = useState(false);
      const { t } = useContext(AppContext);
      const history = useHistory();
      const { address } = props;
      const [popup, setPopup] = useState(false);
      const user = JSON.parse(`${localStorage.getItem('_WEB_US')}`);
      return (
            <>
                  <PaymentBranch
                        open={open}
                        setOpen={setOpen}
                        org={org}
                        chooseBr={chooseBr}
                        setChooseBr={setChooseBr}
                  />
                  <div
                        className="flex-column payment-form"
                  >
                        <div style={{ width: '100%' }} className="flex-row-sp payment-form__box">
                              <div className="payment-form__left">
                                    <span>{t('pm.payment_info')}</span>
                                    <div className="payment-form__left-cnt">
                                          <span className="flex-row-sp sec-title">
                                                Thông tin người nhận
                                                <button
                                                      className='flex-row'
                                                      onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan')}
                                                >
                                                      <img src={icon.editWhite} alt="" />
                                                      Thay đổi
                                                </button>
                                          </span>
                                          <div className="sec-item">
                                                <div className="sec-item__label">
                                                      <span>Họ và tên:</span>
                                                      <span>{user?.fullname}</span>
                                                </div>
                                                <div className="sec-item__label">
                                                      <span>Email:</span>
                                                      <span>{user?.email}</span>
                                                </div>
                                                <div className="sec-item__label">
                                                      <span>Số điện thoại:</span>
                                                      <span>{user?.telephone}</span>
                                                </div>
                                          </div>
                                          <span
                                                style={{ marginTop: '6px' }}
                                                className="flex-row-sp sec-title"
                                          >
                                                Địa chỉ giao hàng
                                                <button
                                                      className='flex-row'
                                                      onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan')}
                                                >
                                                      <img src={icon.editWhite} alt="" />
                                                      Thay đổi
                                                </button>
                                          </span>
                                          <div className="sec-item__label">
                                                <span>Đia chỉ:</span>
                                                <span>{address?.address}</span>
                                          </div>
                                          <input
                                                onChange={(e) => setNote(e.target.value)}
                                                type="text"
                                                placeholder='Ghi chú cho doanh nghiệp...'
                                          />
                                    </div>
                              </div>
                              <div className="payment-form__right">
                                    <img
                                          src={org?.image_url}
                                          alt=""
                                          className="payment-form__right-avatar"
                                          onError={(e) => onErrorImg(e)}
                                    />
                                    <div className="payment-form__right-info">
                                          {
                                                chooseBr ?
                                                      <>
                                                            <span className="org-name">
                                                                  {chooseBr?.name}
                                                            </span>
                                                            <span className='org-address'>
                                                                  Đia chỉ:{chooseBr?.full_address}
                                                            </span>
                                                            <span className="org-address">
                                                                  Liên hệ : {chooseBr?.telephone}
                                                            </span>
                                                      </>
                                                      :
                                                      <>
                                                            <span className="org-name">
                                                                  {org?.name}
                                                            </span>
                                                            <span className='org-address'>
                                                                  Đia chỉ:{org?.full_address}
                                                            </span>
                                                            <span className="org-address">
                                                                  Liên hệ : {org?.telephone[0]}
                                                            </span>
                                                      </>
                                          }
                                          {
                                                org && org.branches?.length > 0 &&
                                                <button
                                                      onClick={() => setOpen(true)}
                                                >
                                                      Chọn chi nhánh
                                                </button>
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
                  <PopupSuccess
                        popup={popup}
                        setPopup={setPopup}
                        title={t('pm.save_success')}
                  />
            </>
      );
}

export default PaymentForm;