import React from 'react';
import SectionOrgs from './components/SectionOrgs';
import SectionServices from './components/SectionServices';
import './filter-home.css'

function FilterKeywordHome(props: any) {
    const { searchText, dataSearch, hiddenFilter } = props;
    return (
        <div
            style={{
                padding: '12px 0px'
            }}
        >
            {
                dataSearch.orgs.length > 0 ?
                    <SectionOrgs
                        keyword={searchText}
                        orgs={dataSearch?.orgs}
                        hiddenFilter={hiddenFilter}
                    />
                    :
                    <></>
            }
            {
                dataSearch.services.length > 0 ?
                    <SectionServices
                        keyword={searchText}
                        services={dataSearch?.services}
                        hiddenFilter={hiddenFilter}
                    />
                    :
                    <></>
            }
        </div>
    );
}

export default FilterKeywordHome;