import React from 'react';
import icon from '../../../../../constants/icon';
//import { IUserAddress } from '../../../../../interface/userAddress'


function AddressItem(props: any) {
    const {
        item,
        handleRemoveAddress,
        index,
        handleUpdateAddress,
        chooseAdd
    } = props;
    const onRemoveAddress = () => {
        if (handleRemoveAddress) {
            handleRemoveAddress(item)
        }
    }
    const onUpdateAddress = () => {
        if (handleUpdateAddress) {
            handleUpdateAddress(item)
        }
    }
    return (
        <div className='us-add_item'>
            <div className="flex-row-sp us-add_item-header">
                <span className="title">
                    Địa chỉ {index + 1}
                </span>
                <div className="flex-row us-add_item-header_left">
                    {
                        chooseAdd === item ?
                            <span className="default">
                                Mặc định
                            </span>
                            :
                            <>
                                <span onClick={onUpdateAddress} className='se-default'>
                                    Đặt làm địa chỉ mặc định
                                </span>
                                <button onClick={onRemoveAddress}>
                                    <img src={icon.TrashOrange} alt="" />
                                </button>
                            </>
                    }
                </div>
            </div>
            <div className="content">
                {item?.address}
            </div>
        </div>
    );
}

export default AddressItem;