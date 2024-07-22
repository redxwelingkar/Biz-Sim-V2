interface CustomerSegmentProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSegment = ({ value, onChange }: CustomerSegmentProps) => {
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
      <input
        type="text"
        placeholder="Enter Name"
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

export default CustomerSegment;
