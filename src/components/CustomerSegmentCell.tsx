interface CustomerSegmentProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomerSegment = ({ value, onChange }: CustomerSegmentProps) => {
  return (
    <input
    className="customer-cell"
      type="text"
      placeholder="Enter Name"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default CustomerSegment;
