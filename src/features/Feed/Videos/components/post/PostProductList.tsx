import {useHistory} from 'react-router-dom';
import icon from "../../../../../constants/icon";
import formatPrice from '../../../../../utils/formatPrice';
import errorImg from '../../../../../utils/errorImg';
import slugify from "../../../../../utils/formatUrlString";
// // interface
// import { IOrganization } from '../../../../../interface/organization';
// import { IComment } from '../../../../../interface/comments';
// import { Service } from '../../../../../interface/service';
// // ---- interface ----
// interface IData {
//     org?: IOrganization | null;
//     ser?: Service[]|null;
//     cmt?: Comments|undefined
// }
// interface Comments {
//     comments?:IComment[];
//     totalItem?:number
// }
 // ---- end ----
  // ==== api tracking ====
  import tracking from "../../../../../api/trackApi";
  // end
 // google tag event
import {GoogleTagPush,GoogleTagEvents} from '../../../../../utils/dataLayer';
// end 
export default function PostProductList (props:any) {
    const {data} = props;
    const history = useHistory();
    const goDetail=(item:any)=>{
        tracking.USER_ITEM_CLICK(data.org_id,item.id);
        GoogleTagPush(GoogleTagEvents.PRODUCT_CLICK);
        history.push({
            pathname: `/dich-vu/${slugify(item?.service_name)}`,
            search: `id=${item.id}&org=${data.org.id}`,
        })
    }
    return (
        <div className="video-item_product_list">
            <div >
                {
                    data?.ser?.map((item: any, index: any) => (
                        <div key={index} onClick={()=>goDetail(item)} className="video-item_product_item">
                            <div className="video-item_product_item-img">
                                <img src={(item?.image_url) ? item?.image_url : ''} onError={(e) => errorImg(e)} alt="" />
                            </div>
                            <div className="video-item_product_item-title">
                                {item?.service_name}
                            </div>
                            <div className="video-item_product_item-price">
                                {formatPrice(item?.price)} đ
                        </div>
                            <div className="video-item_product_item-special_price">
                                {formatPrice(item?.price)} đ
                        </div>
                            <div className="video-item_product_item-add_cart">
                                <img src={icon.shopingCartAddOrange} alt="" />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}