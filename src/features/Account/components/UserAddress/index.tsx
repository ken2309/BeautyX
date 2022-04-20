import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../../../context/AppProvider';
import { IUserAddress } from '../../../../interface/userAddress';
import userAddressApi from '../../../../api/userAddressApi';
import AddressItem from './components/AddressItem';
import icon from '../../../../constants/icon';

function Address(props: any) {
    //console.log(session, local)
    const history = useHistory();
    const { t } = useContext(AppContext)
    //const [isDefault, setIsDefault] = useState(false)
    const [chooseAdd, setChooseAdd] = useState()
    const [addressList, setAddressList] = useState<IUserAddress[]>([])
    async function getListUserAddress() {
        try {
            const res = await userAddressApi.getAddress();
            const addressList = res?.data.context
            setChooseAdd(addressList?.find((item: IUserAddress) => item.is_default === true))
            setAddressList(addressList)
        } catch (error) {
            console.log(error)
        }
    }
    async function deleteUserAddress(id: number) {
        try {
            await userAddressApi.deleteAddress(id)
        } catch (error) {
            console.log(error)
        }
    }
    async function onUpdateAddress(values: IUserAddress) {
        try {
            await userAddressApi.updateAddress(values)
        } catch (error) {
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
    useEffect(() => {
        getListUserAddress()
    }, [])
    const handleRemoveAddress = (address: IUserAddress) => {
        deleteUserAddress(address.id)
        setAddressList(addressList.filter((item: IUserAddress) => item.id !== address.id))
    }
    const handleUpdateAddress = (address: any) => {
        onUpdateAddress(address)
        setChooseAdd(address)
        if (chooseAdd) {
            handleUpdateCancelDefault(chooseAdd)
        }
    }

    const gotoAddNewAddress = () => {
        history.push({
            pathname: '/tai-khoan/dia-chi',
            state: chooseAdd
        })
    }

    return (
        <>
            <div className="title_section text-color-purple">
                <h1 className="title">{t("acc.order_address")}</h1>
                <span
                    onClick={gotoAddNewAddress}
                    className="subtitle cursor-pointer"
                >
                    {t("acc.add_other_address")}
                </span>
                <button className="acc-add__btn">
                    <img src={icon.plus} alt="" />
                </button>
            </div>
            {
                addressList.map((item: IUserAddress, index: number) => (
                    <AddressItem
                        key={index}
                        index={index}
                        item={item}
                        handleRemoveAddress={handleRemoveAddress}
                        handleUpdateAddress={handleUpdateAddress}
                        chooseAdd={chooseAdd}
                    />
                ))
            }
        </>
    );
}

export default Address;