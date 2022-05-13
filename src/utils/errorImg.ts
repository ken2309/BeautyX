import img from "../constants/img"; 

export default function onErrorImg(e: any) {
    e.target.src = img.imgDefault;
    e.target.style.objectFit = "contain";
    e.target.style.transform = "scale(0.5)";
}