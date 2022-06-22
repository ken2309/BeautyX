import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function SectionEmpty() {
    const { ORGS } = useSelector((state: any) => state.SEARCH);
    
    return (
        <>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>Tìm kiếm gần đây</span>
                    <span>Xem tất cả</span>
                </div>
                <div className="search-empty-item__list">
                    <ul className="list">
                        {
                            ORGS.orgs.slice(0, 6).map((item: any, index: number) => (
                                <li key={index}>
                                    <Link
                                        to={{
                                            pathname: `/org/${item.subdomain}`
                                        }}
                                        className='flex-column search-empty-item__list-item'
                                    >
                                        <img src={item.image_url} alt="" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="search-empty-item">
                <div className="flex-row-sp search-empty-item__head">
                    <span>Gợi ý tìm kiếm</span>
                    <span>Xem tất cả</span>
                </div>
            </div>
        </>
    );
}

export default SectionEmpty;