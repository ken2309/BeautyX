import React from "react";

function DetailPolicy(props: any) {
    return (
        <div className="detailPolicy">
            {/* detail policy useguild */}
            <div className="detailPolicy-useguild">
                <div className="detailPolicy-useguild__top">
                    <p className="detailPolicy-useguild__title">
                        Hướng dẫn sử dụng
                    </p>
                    <ul className="detailPolicy-useguild__list">
                        <li className="detailPolicy-useguild__item">
                            Bước 1: Lựa chọn và thanh toán sản phẩm/ dịch vụ.
                        </li>
                        <li className="detailPolicy-useguild__item">
                            Bước 2: Đặt hẹn ngay khi thanh toán hoặc đặt hẹn sau
                            tại mục "Đặt hẹn".
                        </li>
                        <li className="detailPolicy-useguild__item">
                            Bước 3: Đến cơ sở, xuất trình đơn hàng đã thanh toán
                            thành công.
                        </li>
                    </ul>
                </div>
                <div className="detailPolicy-useGuild__bot">
                    <p>
                        {
                            "(*) Thời hạn sử dụng: Sử dụng dịch vụ đã mua trong 1 tháng kể từ ngày mua thành công"
                        }
                    </p>
                </div>
            </div>
            {/* detail policy mid */}
            <div className="detailPolicy-rules">
                <span>Điều khoản chung</span>
                <span>Xác nhận</span>
                <span>
                    Xác nhận ngay tức thời qua thông báo khi bạn mua dịch vụ/đặt
                    hẹn thành công. Sau đó, Myspa sẽ liên hệ xác nhận với bạn
                    một lần nữa để đảm bảo thời gian đặt lịch hẹn. Nếu bạn không
                    nhận được tin nhắn/ cuộc gọi nào từ Myspa, hãy liên hệ với
                    chúng tôi.
                </span>

                <span>Chính sách huỷ</span>
                <span>Không hoàn, huỷ hay thay đổi sau khi đã mua dịch vụ</span>
            </div>
        </div>
    );
}

export default DetailPolicy;
