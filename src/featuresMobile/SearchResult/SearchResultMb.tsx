import React from 'react';
import icon from '../../constants/icon';
import './searchResultMb.css'

function SearchResultMb(props: any) {
      return (
            <>
                  <div className="re-mb-search">
                        <div className="re-mb-search__cnt">
                              <div
                                    className="flex-row re-mb-search__cnt-inp"
                              >
                                    <img src={icon.searchPurple} alt="" />
                                    <span className="re-mb-search__cnt-inp__text">
                                          Nhập tên hoặc vị trí cơ sở làm đẹp
                                    </span>
                              </div>
                              <div className="re-mb-search__cnt-pin">

                              </div>
                        </div>
                  </div>
            </>
      );
}

export default SearchResultMb;