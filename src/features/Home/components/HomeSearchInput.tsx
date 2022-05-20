import React, { useCallback, useState } from 'react';
import icon from '../../../constants/icon';
import SearchFilter from '../../../featuresMobile/SearchResult/SearchFilter';

function HomeSearchInput() {
    const [open, setOpen] = useState(false);
    const onOpenFilter = useCallback(() => {
        setOpen(true)
    }, [])
    return (
        <>
            <div className="ip-search-cnt">
                <div 
                    onClick={onOpenFilter}
                    className="flex-row ip-search"
                >
                    <img src={icon.searchPurple} alt="" />
                    <span className="content">
                        Tìm kiếm dịch vụ, sản phẩm, doanh nghiệp...
                    </span>
                </div>
            </div>
            <SearchFilter
                openSearch={open}
                setOpenSearch={setOpen}
            />
        </>
    );
}

export default HomeSearchInput;