import React from 'react';

interface PercentageProps {
    value: string;
    onChange: (value: string) => void;
}

const MAX_PERCENTAGE = 100; // Define a maximum percentage limit

const Percentage = ({ value, onChange }: PercentageProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Prevent entering values larger than MAX_PERCENTAGE
        if (parseFloat(newValue) <= MAX_PERCENTAGE || newValue === '') {
            onChange(newValue);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            e.target.classList.add('blurred');
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove('blurred');
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className="cell">
            <input
                type="number"
                placeholder="Enter Value"
                onChange={handleChange}
                value={value}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={value ? 'value-entered' : ''}
            />
            {value && <span onClick={handleClear} className="clear-icon clear-icon-left">x</span>}
        </div>
    );
};

export default Percentage;
