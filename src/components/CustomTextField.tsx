interface CustomTextFieldProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}
const MAX_SIZE = 31; // Define a maximum size limit

const CustomTextField = ({ value, onChange, label }: CustomTextFieldProps) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Prevent entering values larger than MAX_SIZE
        if (parseFloat(newValue) <= MAX_SIZE || newValue === '') {
            onChange(newValue);
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
                type="number"
                min="0"
                placeholder="Enter Value"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={value ? 'value-entered' : ''}
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
