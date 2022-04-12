import React, { useState } from "react";
import SectionTitle from "../../SectionTitle/index";
import Carousel from "react-elastic-carousel";
import ServiceItem from "../../ViewItemCommon/ServiceItem";

const buttons = [
  { id: 1, text: "Sắp hết hạn" },
  { id: 2, text: "Giảm nhiều" },
];
function RecommendList(props: any) {
  const { org, list } = props;
  const title = `Ưu đãi của "${org?.name}"`;
  const [activeBtn, setActiveBtn] = useState();
  return (
    <>
      <div className="flex-row-sp mer-sale-head">
        <SectionTitle title={title} />
        <div className="flex-row mer-sale-head__sort">
          Sắp xếp theo:
          {buttons.map((item: any, index) => (
            <button
              style={
                activeBtn === item
                  ? {
                    backgroundColor: "var(--purple)",
                    color: "var(--bg-gray)",
                  }
                  : {}
              }
              onClick={() => setActiveBtn(item)}
              key={index}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="mer-sale-list">
        <Carousel
          children={list.map((item: any, index: number) => (
            <div
              key={index}
              style={{ width: '178px' }}
            >
              <ServiceItem
                org={org}
                service={item}
              />
            </div>
          ))}
          isRTL={false}
          itemsToShow={6}
          showArrows={false}
        />
      </div>
    </>
  );
}

export default RecommendList;
