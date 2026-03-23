interface CustomTextFieldProps {
    value?: string;
    onChange: (value: string) => void;
    label?: string;
}

const CustomTextField = ({ value, onChange,label }: CustomTextFieldProps) => {
    const handleChange = (e: { target: { value: string } }) => {
        onChange(e.target.value);
    };

    const handleBlur = (e: {
        target: { value: any; classList: { add: (arg0: string) => void } };
    }) => {
        if (e.target.value) {
            e.target.classList.add("blurred");
        }
    };

    const handleFocus = (e: {
        target: { classList: { remove: (arg0: string) => void } };
    }) => {
        e.target.classList.remove("blurred");
    };

    const handleClear = () => {
        onChange("");
    };

    return (
        <div className="cell">
            <div className="TextInputLabel">{label}</div>
            <input
                type="number"
                min="0"
                placeholder="Enter Value"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={value ? "value-entered customer-cell" : ""}
            />
            {value && (
                <span onClick={handleClear} className="clear-icon clear-icon-right">
                    x
                </span>
            )}
        </div>
    );
};

export default CustomTextField;
