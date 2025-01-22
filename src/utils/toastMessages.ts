import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

type IshowToast = {
    text: string,
    duration?: number,
    position?: "center" | "left" | "right" | undefined,
    style?: {},
}

const showToast = ({ text, duration = 3000, position = 'center', style = {
    background: "linear-gradient(to right, #135846 ,#4cb974)",
} }: IshowToast) => {
    Toastify({
        text: text,
        duration,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position,
        stopOnFocus: true,
        style: style,
        onClick: function () { }
    }).showToast();
};

export default showToast;
