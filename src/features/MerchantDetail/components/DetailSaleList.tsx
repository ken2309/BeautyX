import React from "react";
import SectionTitle from "../../SectionTitle";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { AppContext } from "../../../context/AppProvider";
import ServiceItem from "../../ViewItemCommon/ServiceItem";
import ProductItem from "../../ViewItemCommon/ProductItem";
import { useSelector } from "react-redux";
import { Service } from '../../../interface/service';
import { Product } from '../../../interface/product'

// interface ActiveBtn {
//   id: number;
//   text: string;
// }


function DetailSaleList(props: any) {
  //const { t } = useContext(AppContext)
  const { org } = props;
  // const buttons = [
  //   { id: 1, text: "Dịch vụ" },
  //   { id: 2, text: "Sản phẩm" },
  // ];
  const title = `Ưu đãi của "${org?.name}"`;
  //const [activeBtn, setActiveBtn] = useState<ActiveBtn>({ id: 1, text: "Dịch vụ" });
  const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = useSelector((state: any) => state.ORG_SPECIALS);
  const { services_special } = SERVICES_SPECIAL;
  const { products_special } = PRODUCTS_SPECIAL;
  // const sortClick = (item: any) => {
  //   setActiveBtn(item);
  // };
  return (
    <div className="detail-sale">
      <div className="flex-row-sp mer-sale-head">
        <SectionTitle title={title} />
        {/* <div className="flex-row mer-sale-head__sort">
          {t("Mer_de.sort_by")}:
          {buttons.map((item, index) => (
            <button
              style={
                activeBtn.id === item.id
                  ? {
                    backgroundColor: "var(--purple)",
                    color: "var(--bg-gray)",
                  }
                  : {}
              }
              onClick={() => sortClick(item)}
              key={index}
            >
              {item.text}
            </button>
          ))}
        </div> */}
      </div>
      <span className="mer-sale-list__title">
        Dịch vụ
      </span>
      <ul className="mer-sale-list">
        {
          services_special.map((item: Service, index: number) => (
            <li key={index} className="mer-sale-list__item">
              <ServiceItem
                org={org}
                service={item}
              />
            </li>
          ))
        }
      </ul>
      <span className="mer-sale-list__title">
        Sản phẩm
      </span>
      <ul className="mer-sale-list">
        {
          products_special.map((item: Product, index: number) => (
            <li key={index} className="mer-sale-list__item">
              <ProductItem
                org={org}
                product={item}
              />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default DetailSaleList;
