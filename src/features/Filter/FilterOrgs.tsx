/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Dialog, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import {
    onSetTagsOrg,
    onSetSortOrg
} from '../../redux/filter/filterSlice';
import icon from '../../constants/icon';
import { IProvince } from '../../interface/provinces';

function FilterOrgs(props: any) {
    const dispatch = useDispatch();
    const tagList = useSelector((state: any) => state.HOME.tags);
    const provinces = useSelector((state: any) => state.HOME.provinces);
    const { tags, sort } = useSelector((state: any) => state.FILTER.FILTER_ORG);
    const [openProvince, setOpenProvince] = useState(false);

    const sortList = [
        { id: 1, title: "Độ phổ biến", sort: "-priority" },
        { id: 2, title: "Gần tôi", sort: "distance" },
    ]
    const onChangeTagsOrg = useCallback((tag: any) => {
        dispatch(onSetTagsOrg(tag.name))
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(onSetSortOrg((event.target as HTMLInputElement).value))
    };
    return (
        <div className='filter-orgs-cnt' >
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
            <div className='filter-orgs-tags'>
                <span className="filter-orgs-cnt__title">Chọn tỉnh thành, quận huyện</span>
                <div className="flex-row-sp filter-orgs-location-item">
                    <div className='flex-row'>
                        <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                        <span onClick={() => setOpenProvince(true)} className="filter-orgs-item__text">
                            Chọn tỉnh thành
                        </span>
                        <DialogProvince
                            open={openProvince}
                            setOpen={setOpenProvince}
                            provinces={provinces}
                        />
                    </div>
                    <img src={icon.arrowDownPurple} alt="" />
                </div>
                <div className="flex-row-sp filter-orgs-location-item">
                    <div className='flex-row'>
                        <img style={{ width: "18px", height: "18px" }} src={icon.mapPinRed} alt="" />
                        <span className="filter-orgs-item__text">
                            Chọn quận huyện
                        </span>
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
    );
}

export default FilterOrgs;

const DialogProvince = (props: any) => {
    const { open, setOpen, provinces } = props
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="filter-org-province-list">
                <span className="title">Chọn tỉnh, thành phố</span>
                <div className="filter-org-province-list__input">
                    <input type="text" placeholder='Tìm kiếm tỉnh, thành phố...' />
                </div>
                <ul className="list">
                    {
                        provinces.map((item: IProvince, index: number) => (
                            <li key={index} className="flex-row-sp list-item">
                                <div className="flex-row left">
                                    <div className="left-checkbox">
                                        <div className="left-checkbox-act"></div>
                                    </div>
                                    {item.name}
                                </div>
                                <button className="right">
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