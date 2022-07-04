/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Dialog, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
    onSetTagsOrg,
    onSetSortOrg,
    onSetOrgsProvince,
    onSetOrgsDistrict,
    fetchAsyncDistrictsByProvince
} from '../../redux/filter/filterSlice';
import icon from '../../constants/icon';
import { IProvince, IDistrict } from '../../interface/provinces';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import ButtonLoading from '../../components/ButtonLoading';

interface IProps {
    disableTags?: boolean,
    disableProvince?: boolean,
    onApplyFilterOrgs?: () => void
}

function FilterOrgs(props: IProps) {
    const {
        disableTags,
        disableProvince,
        onApplyFilterOrgs
    } = props;
    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const tagList = useSelector((state: any) => state.HOME.tags);
    const provinces = useSelector((state: any) => state.HOME.provinces);
    const { tags, sort, province, district } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { DISTRICTS } = useSelector((state: any) => state.FILTER);
    const [openProvince, setOpenProvince] = useState(false);
    const [openDistrict, setOpenDistrict] = useState(false);

    const sortList = [
        { id: 1, title: "Độ phổ biến", sort: "priority" },
        { id: 2, title: "Gần tôi", sort: "distance" },
    ]
    const onChangeTagsOrg = (tag: any) => {
        dispatch(onSetTagsOrg(tag.name))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(onSetSortOrg((event.target as HTMLInputElement).value))
    };
    const onChangeOrgsProvince = (province: IProvince) => {
        setOpenProvince(false)
        dispatch(onSetOrgsProvince(province))
        if (DISTRICTS.province_code !== province?.province_code) {
            dispatch(onSetOrgsDistrict(null))
        }
    }
    const onChangeOrgsDistrict = (district: IDistrict) => {
        dispatch(onSetOrgsDistrict(district))
    }


    const handleGetDistrictByProvince = (province: IProvince) => {
        const code = params.province ? parseInt(params.province) : province?.province_code;
        if (code) {
            if (!params.province) {
                onChangeOrgsProvince(province)
            }
            setOpenDistrict(true);
            if (DISTRICTS.province_code !== code) {
                dispatch(fetchAsyncDistrictsByProvince(code))
            }
        }
    }

    const handleApplyByFilter = () => {
        if (onApplyFilterOrgs) {
            onApplyFilterOrgs()
        }
    }

    return (
        <div className='filter-orgs-cnt' >
            <div>
                {
                    disableTags ? <></>
                        :
                        <div className='filter-orgs-tags'>
                            <span className="filter-orgs-cnt__title">Chọn danh mục</span>
                            <ul className="tags-list">
                                {
                                    tagList.map((i: any, index: number) => (
                                        <li onClick={() => onChangeTagsOrg(i)} key={index} className="tags-list__item">
                                            <div className="flex-row item">
                                                <Checkbox
                                                    checked={tags.includes(i.name) ? true : false}
                                                />
                                                <span
                                                    className={tags.includes(i.name) ? "item-name tag-item-name-act" : "item-name"}
                                                >
                                                    {i.name}
                                                </span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                }
                <div className='filter-orgs-tags'>
                    <span className="filter-orgs-cnt__title">Chọn khu vực</span>
                    {
                        disableProvince ? <></> :
                            <div className="flex-row-sp filter-orgs-location-item">
                                <div className='flex-row'>
                                    <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                                    <span onClick={() => setOpenProvince(true)} className="filter-orgs-item__text">
                                        {province ? province?.name : "Chọn tỉnh thành"}
                                    </span>
                                    <DialogProvince
                                        open={openProvince}
                                        setOpen={setOpenProvince}
                                        onChangeOrgsProvince={onChangeOrgsProvince}
                                        handleGetDistrictByProvince={handleGetDistrictByProvince}
                                        provinces={provinces}
                                        province={province}
                                    />
                                </div>
                                <img src={icon.arrowDownPurple} alt="" />
                            </div>
                    }
                    <div className="flex-row-sp filter-orgs-location-item">
                        <div className='flex-row'>
                            <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                            <span
                                onClick={() => handleGetDistrictByProvince(province)}
                                className="filter-orgs-item__text"
                            >
                                {district ? district?.name : "Chọn quận, huyện"}
                            </span>
                            <DialogDistrict
                                open={openDistrict}
                                setOpen={setOpenDistrict}
                                onChangeOrgsDistrict={onChangeOrgsDistrict}
                            />
                        </div>
                        <img src={icon.arrowDownPurple} alt="" />
                    </div>
                </div>
                <div className='filter-orgs-tags'>
                    <FormControl>
                        <span className="filter-orgs-cnt__title">Lọc theo</span>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={sort}
                            onChange={handleChange}
                        >
                            {
                                sortList.map(item => (
                                    <FormControlLabel
                                        key={item.id}
                                        value={item.sort}
                                        control={<Radio />} label={item.title}
                                    />
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <ButtonLoading
                title='Áp dụng '
                onClick={handleApplyByFilter}
                loading={false}
            />
        </div>
    );
}

export default FilterOrgs;

const DialogProvince = (props: any) => {
    const {
        open,
        setOpen,
        provinces,
        onChangeOrgsProvince,
        province,
        handleGetDistrictByProvince
    } = props
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="filter-org-province-list">
                <div className="flex-row-sp title">
                    Chọn tỉnh, thành phố
                    <img onClick={() => setOpen(false)} src={icon.closeCircle} alt="" />
                </div>
                <div className="filter-org-province-list__input">
                    <input type="text" placeholder='Tìm kiếm tỉnh, thành phố...' />
                </div>
                <ul className="list">
                    {
                        provinces.map((item: IProvince, index: number) => (
                            <li key={index} className="flex-row-sp list-item">
                                <div className="flex-row left">
                                    <div
                                        onClick={() => onChangeOrgsProvince(item)}
                                        className="left-checkbox"
                                    >
                                        {item.province_code === province?.province_code &&
                                            <div className="left-checkbox-act"></div>
                                        }
                                    </div>
                                    {item.name}
                                </div>
                                <button
                                    onClick={() => handleGetDistrictByProvince(item)}
                                    className="right"
                                >
                                    <img src={icon.chevronRight} alt="" />
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    )
}
function DialogDistrict(props: any) {
    const { open, setOpen, onChangeOrgsDistrict } = props;
    const { district } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const { districts } = useSelector((state: any) => state.FILTER.DISTRICTS);
    const onChooseDistrict = (item: IDistrict) => {
        setOpen(false);
        onChangeOrgsDistrict(item)
    }
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="filter-org-province-list">
                <div className="flex-row-sp title">Chọn quận, huyện
                    <img onClick={() => setOpen(false)} src={icon.closeCircle} alt="" />
                </div>
                <ul className="list">
                    {
                        districts.map((item: any, index: number) => (
                            <li key={index} className="flex-row-sp list-item">
                                <div className="flex-row left">
                                    <div
                                        onClick={() => onChooseDistrict(item)}
                                        className="left-checkbox"
                                    >
                                        {item.district_code === district?.district_code &&
                                            <div className="left-checkbox-act"></div>
                                        }
                                    </div>
                                    {item.name}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </Dialog>
    )
}