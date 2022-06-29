import React, { useContext } from "react";
import ButtonCus from "../../../../components/ButtonCus";
import formatPrice from "../../../../utils/formatPrice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../../../../redux/cartSlice";
import slugify from "../../../../utils/formatUrlString";
import { AppContext } from "../../../../context/AppProvider";
import onErrorImg from "../../../../utils/errorImg";

function ServiceItem(props: any) {
  const { t } = useContext(AppContext);
  const { serviceItem, org } = props;
  const service = serviceItem.productable;
  //const [service, setService] = useState<Service>();
  console.log(service, serviceItem)
  const history = useHistory();
  const dispatch = useDispatch();
  const is_type = 2;
  const values = {
    id: service?.id,
    org_id: org.id,
    org: org,
    org_name: org.name,
    cart_id: parseInt(`${is_type}${org.id}${service?.id}`), //is_type + org_id + id
    name: service?.service_name,
    quantity: 1,
    is_type: is_type,
    isConfirm: true,
    price: service?.price,
  };
  // add cart
  const handleAddCart = () => {
    const action = addCart(values);
    history.push({
      pathname: `/cart`,
    });
    dispatch(action);
  };
  // go to service detail
  const detail = service;
  const name = service?.service_name;
  const handleDetailService = () => {
    history.push({
      pathname: `/dich-vu/${slugify(service?.service_name)}`,
      search: `id=${service.id}?org=${org?.id}`,
    });
  };

  return (
    <li>
      <div className="order-de-list__item">
        <img
          src={service?.image ? service?.image_url : org?.image_url}
          alt=""
          onError={(e) => onErrorImg(e)}
          className="order-de-pr-item__img"
        />
        <div className="order-de-pr-item__cnt">
          <div className="item-detail">
            <span className="flex-row-sp item-name">
              {service?.service_name}
              <span>x {serviceItem.quantity}</span>
            </span>
            <span className="item-org__name">{org.name}</span>
          </div>
          <div className="flex-row-sp item-bottom">
            <span className="price">{formatPrice(service?.price)} đ</span>
            <div className="flex-row item-button">
              <ButtonCus
                onClick={handleDetailService}
                text={t("order.watch_info")}
                padding="4px 8px"
                color="var(--purple)"
                backColor="var(--bgGray)"
                borderRadius="12px"
                margin="0px 16px 0px 0px"
              />
              {
                serviceItem.discount_value === 0 &&
                <ButtonCus
                  onClick={handleAddCart}
                  text="Pre-Order"
                  padding="4px 8px"
                  color="var(--bgWhite)"
                  backColor="var(--purple)"
                  borderRadius="12px"
                />
              }
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ServiceItem;
