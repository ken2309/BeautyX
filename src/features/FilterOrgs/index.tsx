import React, { useContext } from 'react';
import './filter-orgs.css';
import { Checkbox } from '@mui/material'
import { AppContext } from '../../context/AppProvider';
import scrollTop from '../../utils/scrollTop';
import icon from '../../constants/icon';

const tags = ['Nail', 'Phòng khám', 'Salon', 'Spa', 'Thẩm mỹ viện']

const toggleFilter = () => {
    document.querySelector('.re-sort-org')?.classList.toggle('re-sort-org__ac')
}
const removeFilter = () => {
    document.querySelector('.re-sort-org')?.classList.remove('re-sort-org__ac')
}

function FilterOrgs(props: any) {
    const { t } = useContext(AppContext)
    const {
        orgFilter,
        setOrgFilter,
        setData,
        //optional
        handleOrgsByKeyword,
        handleGetOrgsDealLocation,
        handleGetOrgsDistance,
        handleGetOrgsByTrust,

        //
        hideTags, hideProvinces
    } = props;
    const { provinces } = useContext(AppContext);
    const onChooseTags = (tag_item: any) => {
        if (setData) {
            setData({
                orgs: [],
                page: 1,
                lastPage: 1
            })
            const isChoose = orgFilter.tags.includes(tag_item)
            if (isChoose) {
                setOrgFilter({
                    ...orgFilter,
                    tags: orgFilter.tags.filter((i: any) => i !== tag_item)
                })
            } else {
                setOrgFilter({
                    ...orgFilter,
                    tags: [...orgFilter.tags, tag_item]
                })
            }
        }
    }
    const onChooseProvince = (provinceCode: any) => {
        if (setData) {
            setData({
                orgs: [],
                page: 1,
                lastPage: 1
            })
            setOrgFilter({
                ...orgFilter,
                province_code: provinceCode
            })
            scrollTop()
            removeFilter()
        }
    }
    const onChangeMinPrice = (e: any) => {
        setOrgFilter({
            ...orgFilter,
            min_price: parseInt(e.target.value)
        })
    }
    const onChangeMaxPrice = (e: any) => {
        setOrgFilter({
            ...orgFilter,
            max_price: parseInt(e.target.value)
        })
    }
    const onApplyFilter = () => {
        if (orgFilter.min_price > -1 && orgFilter.max_price >= 0 && orgFilter.min_price <= orgFilter.max_price) {
            if (handleOrgsByKeyword) {
                setData({
                    orgs: [],
                    page: 1,
                    lastPage: 1
                })
                removeFilter()
                handleOrgsByKeyword()
            } else if (handleGetOrgsDealLocation) {
                setData({
                    orgs: [],
                    page: 1,
                    lastPage: 1
                })
                removeFilter()
                handleGetOrgsDealLocation()
            } else if (handleGetOrgsDistance) {
                setData({
                    orgs: [],
                    page: 1,
                    lastPage: 1
                })
                removeFilter()
                handleGetOrgsDistance()
            } else if (handleGetOrgsByTrust) {
                setData({
                    orgs: [],
                    page: 1,
                    lastPage: 1
                })
                removeFilter()
                handleGetOrgsByTrust()
            }
        }
    }
    // console.log(orgFilter)
    return (
        <div className="se-re-cnt__left-sort">
            <span
                onClick={toggleFilter}
                className="se-re-cnt__left-sort__title"
            >
                {t("se.filters")}
                <button>
                    <img src={icon.arrowPurple} alt="" />
                </button>
            </span>
            <div className="re-sort-org">
                {
                    hideTags ?
                        <></>
                        :
                        <div className="re-sort-org__item">
                            <span className="title">
                                {t("home_2.categories")}
                            </span>
                            <div className="list">
                                <ul className="list-tags">
                                    {
                                        tags.map((item: string, index: number) => (
                                            <li
                                                key={index}
                                                onClick={() => onChooseTags(item)}
                                            >
                                                <div>
                                                    <Checkbox
                                                        checked={orgFilter.tags.includes(item) === true ? true : false}
                                                        sx={{
                                                            color: "#7161BA",
                                                            "&.Mui-checked": {
                                                                color: "#7161BA",
                                                            },
                                                            marginLeft: '-10px'
                                                        }} />
                                                </div>
                                                {item}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                }
                {
                    hideProvinces ?
                        <></>
                        :
                        <div className="re-sort-org__item">
                            <span className="title">
                                {t("Home.Filter_location")}
                            </span>
                            <div className="list list-provinces">
                                <ul className="list-tags">
                                    {
                                        provinces.map((item: any, index: number) => (
                                            <li
                                                onClick={() => onChooseProvince(item.province_code)}
                                                key={index}
                                            >
                                                <div className="province-item">
                                                    {
                                                        orgFilter.province_code === item.province_code ?
                                                            <div></div>
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                                {item.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                }
                <div className="re-sort-org__item">
                    <span className="title">
                        {t("se.price_range")}
                    </span>
                    <div className="flex-row-sp list range-price">
                        <input
                            onChange={onChangeMinPrice}
                            type="number"
                            placeholder={`đ ${t("se.from")}...`}
                        />
                        <input
                            onChange={onChangeMaxPrice}
                            type="number"
                            placeholder={`đ ${t("se.to")}...`}
                        />
                    </div>
                    {
                        orgFilter.min_price <= -1 || orgFilter.max_price < 0 || orgFilter.min_price > orgFilter.max_price ?
                            <span className='price-err'>{t("se.price_range")} {t("se.invalid")}</span>
                            :
                            <></>
                    }
                </div>
                <button
                    onClick={onApplyFilter}
                    className="apply-btn"
                >
                    {t("se.apply")}
                </button>
            </div>
        </div>
    );
}

export default FilterOrgs;