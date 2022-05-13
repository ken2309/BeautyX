import React, { useState } from 'react';
import '../user_address.css';
//import SectionTitle from '../../../SectionTitle';
import userAddressApi from '../../../../../api/userAddressApi';
import UserAddressForm from './UserAddressForm';
import { useHistory, useLocation } from 'react-router-dom'

interface IAddress {
    province: {
        code: null | number,
        name: null | string
    },
    district: {
        code: null | number,
        name: null | string
    },
    ward: {
        code: null | number,
        name: null | string,
    },
    short_address: string
}

function UserAddress(props: any) {
    const history = useHistory();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const addressDefault = location.state;
    const [address, setAddress] = useState<IAddress>({
        province: { code: null, name: null },
        district: { code: null, name: null },
        ward: { code: null, name: null },
        short_address: ''
    })

    async function handlePostUserAddress(values: any) {
        const session = await window.sessionStorage.getItem("_WEB_TK");
        const local = await localStorage.getItem("_WEB_TK")
        setLoading(true)
        try {
            await userAddressApi.postAddress(values, session, local)
            setLoading(false)
            history.goBack()
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    async function handleUpdateCancelDefault(values: any) {
        try {
            await userAddressApi.updateAddressCancelDefault(values)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitForm = () => {
        if (
            address.district.code &&
            address.province.code &&
            address.ward.code &&
            address.short_address.length > 0
        ) {
            const values = {
                address: `${address.short_address},${address.ward.name},${address.district.name},${address.province.name}`,
                is_default: true
            }
            handlePostUserAddress(values)
            if (addressDefault) {
                handleUpdateCancelDefault(addressDefault)
            }
        }
    }

    return (
        <UserAddressForm
            address={address}
            setAddress={setAddress}
            handleSubmitForm={handleSubmitForm}
            loading={loading}
        />
    );
}

export default UserAddress;