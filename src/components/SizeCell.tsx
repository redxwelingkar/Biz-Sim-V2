interface SizeProps {
  value: string;
  onChange: (value: string) => void;
}

const Size = ({ value, onChange }: SizeProps) => {
  return (
    <input
      type="number"
      placeholder="Enter Value"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Size;
