import React from "react";

export default function GuideItem(props: any) {
    const { item, slide, setSlide, setSlideIndex, goTosilide, step } = props;
    return (
        <div className="guided-section-step">
            <div className="step-content">
                <div className="step">Bước {step + 1}</div>
                <div className="step-desc">
                    <span>{item.title}</span>
                </div>
            </div>
            <div className="step-slide">
                {item.img.map((value: any, index: number) => (
                    <div key={index}>
                        <div
                            className="step-img"
                            onClick={() => {
                                setSlide(!slide);
                                setSlideIndex(step);
                                goTosilide(step);
                            }}
                        >
                            <img
                                src={value.url}
                                alt={"step" + item.step + index}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
