interface CustomTextFieldProps {
    value: string;
    type: string;
    placeholder: string;
    onChange: (value: string) => void;
    label?: string;
    max?: number;
    min?: number;
}
const MAX_SIZE = 999999999999999; // Define a maximum size limit

const CustomTextField = ({ value, onChange, max, min, label, type, placeholder }: CustomTextFieldProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (type == "number") {
            const newValue = e.target.value;

            // Prevent entering values larger than MAX_SIZE
            if (max) {
                if (parseFloat(newValue) <= max || MAX_SIZE || newValue === '') {
                    onChange(newValue);
                }
            } else if (parseFloat(newValue) <= MAX_SIZE || newValue === '') {
                onChange(newValue);
            }
        } else {
            onChange(e.target.value)
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value) {
            e.target.classList.add("blurred");
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.classList.remove("blurred");
    };

    const handleClear = () => {
        onChange("");
    };

    return (
        <div className="cell">
            <div className="TextInputLabel">{label}</div>
            <input
                type={type}
                min={min}
                max={max}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={value ? 'value-entered' : ''}
            />
            {value && (
                <span onClick={handleClear} className="clear-icon clear-icon-left">
                    x
                </span>
            )}
        </div>
    );
};

export default CustomTextField;
