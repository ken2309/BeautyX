import React from "react";
import icon from "../../../constants/icon";
import formatPrice from "../../../utils/formatPrice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
function MapCard(props: any) {
  const { list, setItemCenter } = props;

  const settings = {
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "240px",
          slidesToShow: 1,
          speed: 500,
          arrows: false,
          afterChange: function (index: number) {
            setItemCenter(list[index]);
          },
        },
      },
      {
        breakpoint: 767,
        settings: {
          className: "center",
          centerMode: true,
          infinite: true,
          centerPadding: "70px",
          slidesToShow: 1,
          speed: 500,
          arrows: false,
          afterChange: function (index: number) {
            setItemCenter(list[index]);
          },
        },
      },
    ],
    appendDots: (dots: any) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: () => <div className="dots-custom"></div>,
  };

  const openMap = (item: any) => {
    const url = `https://maps.google.com/?q=${item.latitude},${item.longitude}`;
    const newWindow = window.open(`${url}`, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    // <div className="mb-card-list">
    <div className="mb-card">
      {/* <ul className="mb-card-list__list"> */}
      <ul className="">
        <Slider {...settings}>
          {list.map((item: any) => (
            <li key={item.id}>
              <div className="mb-card-list__item">
                <img
                  className="item-thumbnail"
                  src={"https://picsum.photos/650/976?random=" + item.id}
                  alt=""
                />
                <div className="item-cnt">
                  <span className="item-cnt__name">{item.name}</span>
                  <div className="item-cnt__address">
                    <img src={icon.location} alt="" />
                    <span>{item.full_address}</span>
                  </div>
                  <div className="item-cnt__time">
                    <img src={icon.time} alt="" />
                    <span>Mở cửa: 10:00 - 11:00</span>
                  </div>
                  <div className="item-cnt__price">
                    <img src={icon.Ticket} alt="" />
                    <span>
                      {formatPrice(item.min_price)}-
                      {formatPrice(item.max_price)}đ
                    </span>
                  </div>
                  <button className="btn-map" onClick={() => openMap(item)}>
                    Chỉ đường
                  </button>
                </div>
              </div>
            </li>
          ))}
        </Slider>
      </ul>
    </div>
  );
}

export default MapCard;
