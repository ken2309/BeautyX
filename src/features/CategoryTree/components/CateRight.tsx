import React from 'react';
import { useSelector } from 'react-redux';
import { cateChild1 } from '../../../data/category';
import { IOrganization } from '../../../interface/organization';
import onErrorImg from '../../../utils/errorImg';
import { Link } from 'react-router-dom'

function CateRight(props: any) {
   const { CATE, ORGS } = useSelector((state: any) => state.CATE);
   return (
      <div className="cate-cnt__right">
         <div className="cate-cnt__right-head">
            <ul className="flex-row cate-cnt__right-list">
               {
                  cateChild1
                     ?.filter((item: any) => item.cate_id === CATE?.id)
                     ?.map((item: any, index: number) => (
                        <li
                           key={index}
                        >
                           <div className="flex-column cate-cnt__right-list-item">
                              <img src={CATE?.image} alt="" />
                              <span>{item.title}</span>
                           </div>
                        </li>
                     ))
               }
            </ul>
         </div>
         <ul className="cate-cnt__right-org">
            {
               ORGS.orgs.slice(0, 12).map((item: IOrganization, index: number) => (
                  <li key={index}>
                     <Link
                        className="flex-column"
                        to={{
                           pathname: `/org/${item.subdomain}`
                        }}
                     >
                        <img onError={(e) => onErrorImg(e)} src={item?.image_url} alt="" />
                     </Link>
                  </li>
               ))
            }
         </ul>
      </div>
   );
}

export default CateRight;