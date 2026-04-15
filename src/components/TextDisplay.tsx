// import React from 'react';

interface TextDisplayProps {
    value: string;
    label?: string;
}


const TextDisplay = ({ value, label }: TextDisplayProps) => {

    // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    //     if (e.target.value) {
    //         e.target.classList.add('blurred');
    //     }
    // };

    // const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    //     e.target.classList.remove('blurred');
    // };

    return (
        <div className="cell">
            <div className="TextInputLabel">{label}</div>
            <input
                readOnly={true}
                value={value}
                className={'value-entered greenBorder'}
            />
        </div>
    );
};

export default TextDisplay;
