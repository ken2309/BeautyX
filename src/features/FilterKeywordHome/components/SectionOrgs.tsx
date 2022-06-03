import React from 'react';
import icon from '../../../constants/icon';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';
import scrollTop from '../../../utils/scrollTop';
import { useHistory } from 'react-router-dom'

function SectionOrgs(props: any) {
    const { orgs, setOpenSearch, hiddenFilter } = props;
    const history = useHistory();
    const gotoDetail = (org: IOrganization) => {
        if (setOpenSearch) {
            setOpenSearch(false)
        }
        if(hiddenFilter){
            hiddenFilter()
        }
        scrollTop()
        //console.log(org)
        history.push({
            pathname: `/org/${org.subdomain}`,
            state: org,
        })
    }
    return (
        <div
            className='filter-home-sec-item'
        >
            <span className="sec-title">
                Doanh nghiệp
            </span>
            <ul className="org-lits">
                {
                    orgs.slice(0, 2).map((item: IOrganization, index: number) => (
                        <li
                            key={index}
                            onClick={() => gotoDetail(item)}
                        >
                            <div className="org-item">
                                <img
                                    onError={(e) => onErrorImg(e)}
                                    src={item.image_url} alt=""
                                    className="org-item__img"
                                />
                                <div className="org-item__cnt">
                                    <span className="org-name">
                                        {item.name}
                                    </span>
                                    <div className="org-address">
                                        <img src={icon.pinMap} alt="" />
                                        <span>
                                            {item.full_address}
                                        </span>
                                    </div>
                                    <div className="org-address">
                                        <img src={icon.Menu} alt="" />
                                        <span>
                                            {(item.tags?.map((t: any) => t.name))?.join(',')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default SectionOrgs;