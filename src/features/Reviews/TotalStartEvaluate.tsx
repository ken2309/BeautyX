import React from "react";
import Rating from "@mui/material/Rating";

export default function TotalStartEvaluate() {
    const [value, setValue] = React.useState<number | null>(4);
    return (
        <>
            {/* rating pc */}
            <div className="evaluate-rating">
                <div className="evaluate-rating__left">
                    <div className="evaluate-rating__total">
                        <span>4.8/</span>
                        <span>5</span>
                    </div>
                    <div className="evaluate-rating__start">
                        <Rating
                            readOnly
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <div className="evaluate-rating__quantity">
                        <span>999+ đánh giá</span>
                    </div>
                </div>
                <div className="evaluate-rating__right">
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                    <div className="evaluate-rating__progress">
                        <span>5</span>
                        <div className="progess-bar"></div>
                        <span>7</span>
                    </div>
                </div>
            </div>
            {/* rating mobile */}
            <div className="evaluate-rating__mobile">
                <div className="rating-left">
                    <p className="rating-left__total">4.8</p>
                    <div className="rating-left__infor">
                        <div className="rating-left__start">
                            <Rating
                                readOnly
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </div>
                        <div className="rating-left__text">100+ đánh giá</div>
                    </div>
                </div>
                <div className="rating-right">
                    <button className="rating-right__btn">
                        <p>{"Xem tất cả"}</p>
                    </button>
                </div>
            </div>
        </>
    );
}
