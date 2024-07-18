import { useState, useEffect } from 'react';
import '../css/Footer.css'; 

interface FooterProps {
    onNext: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNext }) => {
    const texts = [
        "Here in TAM, the first thing you need to mention are the different customer segments in the field given under the column of “Customer Segments”, and mention a near accurate approximation of the number of people in that customer segment in the field next to the specified customer segment under the column of “Size”.",
        "You can add more customer segments by clicking on the “ADD CUSTOMER SEGMENT” button. You can also edit an entry by hovering over it or you can completely remove a row of customer segment by clicking on the “[ - ]” icon before the start of every row.",
        "Once you have completed filling the details for all possible customer segments and their sizes for your business, please click the “SAVE DETAILS” button to get the overall sum value for your Total Addressable Market.",
        "Great! You have successfully defined and calculated your Total Addressable Market. To mark this milestone we have added an icon on your right side bar, you can use to to come back to TAM later if you need to make any changes."
    ];
    const [textIndex, setTextIndex] = useState(0);
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBlink(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleUpArrowClick = () => {
        if (textIndex > 0) {
            setTextIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleDownArrowClick = () => {
        if (textIndex < texts.length - 1) {
            setTextIndex(prevIndex => prevIndex + 1);
            if (textIndex === 0) {
                onNext(); // Call onNext when the first down arrow click occurs
            }
        }
        setBlink(false); // Stop blinking when the button is clicked
    };

    return (
        <footer className="footer">
            <div className="footer-left">
                <img src="./src/assets/img/avatar.png" alt="Image" className="footer-image" />
            </div>
            <div className="footer-middle">
                <p className="footer-text">{texts[textIndex]}</p>
            </div>
            <div className="footer-right">
                <button
                    className={`footer-icon ${textIndex === 0 ? 'disabled' : ''}`}
                    onClick={handleUpArrowClick}
                    disabled={textIndex === 0}
                >
                    <img src="./src/assets/img/upward_arrow.png" alt="Up Arrow" className="arrow-image" />
                </button>
                <button
                    className={`footer-icon ${blink && textIndex < texts.length - 1 ? 'blink' : ''} ${textIndex === texts.length - 1 ? 'disabled' : ''}`}
                    onClick={handleDownArrowClick}
                    disabled={textIndex === texts.length - 1}
                >
                    <img src="./src/assets/img/downward_arrow.png" alt="Down Arrow" className="arrow-image" />
                </button>
            </div>
        </footer>
    );
}

export default Footer;
