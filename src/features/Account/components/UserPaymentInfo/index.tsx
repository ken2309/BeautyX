/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import icon from '../../../../constants/icon';
import { AppContext } from '../../../../context/AppProvider';
import { STATUS } from '../../../../redux/status';
import { fetchAsyncUserAddress } from '../../../../redux/USER/userAddressSlice';
import { IUserAddress } from '../../../../interface/userAddress';
import './style.css'

interface IProps {
    onSetAddressDefault?: (address?: any) => void
}

function UserPaymentInfo(props: IProps) {
    const { t } = useContext(AppContext);
    const { onSetAddressDefault } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const USER = useSelector((state: any) => state.USER.USER);
    const ADDRESS = useSelector((state: any) => state.ADDRESS);
    const { address, status } = ADDRESS;
    const [useAddress, setUserAddress] = useState<IUserAddress>();
    const callUserAddress = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncUserAddress())
        } else if (status === STATUS.SUCCESS) {
            const addressDefault = address.find((item: any) => item.is_default === true);
            setUserAddress(addressDefault)
            if (onSetAddressDefault) {
                onSetAddressDefault(addressDefault)
            }
        }
    }
    useEffect(() => {
        callUserAddress()
    }, [status])
    return (
        <div className='user-address-form'>
            <span className='user-address-form__title'>{t('pm.payment_info')}</span>
            <div className="flex-row-sp user-pm-de-cnt">
                <table>
                    <tbody>
                        <tr>
                            <td
                                className='user-pm-de-cnt__tb-left'>
                                Người mua
                            </td>
                            <td
                                style={{ color: "var(--black)" }}
                                className='user-pm-de-cnt__tb-left'
                            >
                                {USER?.fullname}
                            </td>
                            <td>
                                <button
                                    onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan')}
                                >
                                    <img src={icon.edit} alt="" />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className='user-pm-de-cnt__tb-left'
                            >
                                Số điện thoại
                            </td>
                            <td
                                style={{ color: "var(--black)" }}
                                className='user-pm-de-cnt__tb-left'
                            >
                                {USER?.telephone}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='user-pm-de-cnt__tb-left'>Địa chỉ</td>
                            <td
                                style={{ color: "var(--black)" }}
                                className='user-pm-de-cnt__tb-left'>
                                {useAddress?.address}
                            </td>
                            <td>
                                <button
                                    onClick={() => history.push('/tai-khoan/thong-tin-ca-nhan')}
                                >
                                    <img src={icon.edit} alt="" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserPaymentInfo;