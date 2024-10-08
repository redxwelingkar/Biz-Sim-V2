import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CustomerSegment from './CustomerSegmentCell';
import Size from './SizeCell';
import NumberToWords from './NumberToWords';
import TransitionWrapper from './TransitionWrapper'; // Import TransitionWrapper
import '../css/MainTable.css';

interface TableComponentProps {
  hideTotalSum?: boolean; // Add prop to conditionally hide total sum
  headingText?: string;
  hideSaveDetailsButton?: boolean;
}

const TableComponent = ({ hideTotalSum, headingText, hideSaveDetailsButton }: TableComponentProps) => {
  const [rows, setRows] = useState([
    { id: 1, customerSegment: '', size: '' },
    { id: 2, customerSegment: '', size: '' },
    { id: 3, customerSegment: '', size: '' },
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalSize, setTotalSize] = useState<number | null>(null);
  const [showNext, setShowNext] = useState(false);
  const [showText, setShowText] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedRows = localStorage.getItem('rows');
    const storedTotalSize = localStorage.getItem('TAM');

    if (storedRows) {
      setRows(JSON.parse(storedRows));
    }
    if (storedTotalSize) {
      setTotalSize(parseInt(storedTotalSize, 10));
    }
  }, []);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      customerSegment: '',
      size: ''
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    if (rows.length === 1) {
      setErrorMessage('Please enter at least one segment.');
      return;
    }
    setRows(rows.filter(row => row.id !== id));
  };

  const handleCustomerSegmentChange = (id: number, value: string) => {
    const updatedRows = rows.map(row => 
      row.id === id ? { ...row, customerSegment: value } : row
    );
    setRows(updatedRows);
  };

  const handleSizeChange = (id: number, value: string) => {
    const updatedRows = rows.map(row => {
      return row.id === id ? { ...row, size: value } : row;
    });
    setRows(updatedRows);
  };

  const handleSaveDetails = () => {
    const allFieldsFilled = rows.every(row => row.customerSegment !== '' && row.size !== '');
    if (!allFieldsFilled) {
      setErrorMessage('Please enter details in all cells.');
      return;
    }
    setErrorMessage('');
    const total = rows.reduce((total, row) => total + parseInt(row.size), 0);
    setTotalSize(total);
    localStorage.setItem('TAM', total.toString());
    localStorage.setItem('rows', JSON.stringify(rows));
    setShowNext(true); // Show Next button when details are saved
  };

  const handleClearTotal = () => {
    setTotalSize(null);
    localStorage.removeItem('TAM');
    localStorage.removeItem('rows');
    setShowNext(false); // Hide Next button when total is cleared
  };

  const handleNext = () => {
    const image = document.querySelector('.image-container');
    if (image) {
      image.classList.add('show-image');
    }
    setTimeout(() => {
      setShowText(true); // Show text after image transition
    }, 2500);
  };

  const navigateToNextPage = () => {
    navigate('/Biz-Sim-V2/towards-sam'); // Navigate to the next page after transitions
  };

  return (
    <div className="table-container">
      <h2>{headingText}</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Customer Segment</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id}>
              <td>
                <button className="delete-button" onClick={() => handleDeleteRow(row.id)}>-</button>
              </td>
              <td>
                <CustomerSegment 
                  value={row.customerSegment}
                  onChange={(value) => handleCustomerSegmentChange(row.id, value)}
                />
              </td>
              <td>
                <Size 
                  value={row.size}
                  onChange={(value) => handleSizeChange(row.id, value)}
                />
              </td>
              <td className="size-in-words">
                <NumberToWords value={row.size} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="button-container">
        <button className="add-button" onClick={handleAddRow}>ADD CUSTOMER SEGMENT</button>
        {!hideSaveDetailsButton && <button className="save-button" onClick={handleSaveDetails}>SAVE DETAILS</button>}
        {showNext && (
          <TransitionWrapper delays={[0, 2500, 5000]}>
            {(visibleStates) => (
              <>
                <button
                  className={`next-button ${visibleStates[2] ? 'visible' : ''}`}
                  onClick={() => {
                    handleNext();
                    setTimeout(navigateToNextPage, 5000); // Navigate after transition
                  }}
                >
                  NEXT
                </button>
              </>
            )}
          </TransitionWrapper>
        )}
      </div>
      {!hideTotalSum && totalSize !== null && (
        <div className="total-size-container">
          <span className="total-size-clear-icon" onClick={handleClearTotal}>x</span>
          <span className="total-size-words"><NumberToWords value={totalSize.toString()} /></span>
          <input
            type="text"
            value={totalSize}
            readOnly
            className="total-size-field"
          />
        </div>
      )}
      <div className="image-container">
        <img src="src/assets/img/tam-icon.png" alt="img" className="transition-image" />
        {showText && <span className="transition-text">Total Addressable Market</span>}
      </div>
    </div>
  );
};

export default TableComponent;
