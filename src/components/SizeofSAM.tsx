import React from 'react';

interface SizeofSAMProps {
    value: string;
}

// const MAX_SIZE = 1e16; // Define a maximum size limit

const SizeofSAM = ({ value }: SizeofSAMProps) => {
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newValue = e.target.value;

    //     // Prevent entering values larger than MAX_SIZE
    //     if (parseFloat(newValue) <= MAX_SIZE || newValue === '') {
    //         onChange(newValue);
    //     }
    // };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            e.target.classList.add('blurred');
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('blurred');
    };

    // const handleClear = () => {
    //     onChange('');
    // };

    return (
        <div className="cell">
            <input
                readOnly={true}
                placeholder="Enter in Percentange Conversion Column "
                value={value}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // onFocus={handleFocus}
                className={'value-entered blurred'}
            />
            {/* {value && <span onClick={handleClear} className="clear-icon clear-icon-left"><img className='whitecross' src={whiteCross} alt="X" /></span>} */}
            {/* {value && <span onClick={handleClear} className="clear-icon clear-icon-left">x</span>} */}

        </div>
    );
};

export default SizeofSAM;
