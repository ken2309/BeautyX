import React from "react";
import Rating from "@mui/material/Rating";

export default function TotalStartEvaluate() {
    const [value, setValue] = React.useState<number | null>(4);
    return (
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
    );
}
