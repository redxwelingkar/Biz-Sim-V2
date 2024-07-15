import { useState, useEffect } from 'react';
import CustomerSegment from './CustomerSegmentCell';
import Size from './SizeCell';
import TimedRedirect from './TimedRedirect';
import '../css/MainTable.css';

interface Row {
  id: number;
  segment: string;
  size: string;
}

const MainTable = () => {
  const [rows, setRows] = useState<Row[]>(() => {
    const savedRows = localStorage.getItem('rows');
    return savedRows ? JSON.parse(savedRows) : [
      { id: 1, segment: '', size: '' },
      { id: 2, segment: '', size: '' },
      { id: 3, segment: '', size: '' },
    ];
  });

  const [sizeSum, setSizeSum] = useState<number | null>(() => {
    const savedSizeSum = localStorage.getItem('sizeSum');
    return savedSizeSum ? JSON.parse(savedSizeSum) : null;
  });

  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('rows', JSON.stringify(rows));
  }, [rows]);

  useEffect(() => {
    if (sizeSum !== null) {
      localStorage.setItem('sizeSum', JSON.stringify(sizeSum));
    }
  }, [sizeSum]);

  const handleAddRow = () => {
    const newRow: Row = { id: Date.now(), segment: '', size: '' };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleSegmentChange = (id: number, value: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, segment: value } : row));
  };

  const handleSizeChange = (id: number, value: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, size: value } : row));
  };

  const handleSaveDetails = () => {
    let sum = 0;
    let hasFilledRow = false;

    for (const row of rows) {
      if (row.segment && row.size) {
        hasFilledRow = true;
      }

      if (row.size) {
        sum += parseFloat(row.size);
      }
    }

    if (hasFilledRow) {
      setSizeSum(sum);
      setError(null);
      setRedirect(true); // Set redirect to true when save is successful
    } else {
      setError('Please fill in at least one row before saving.');
      setSizeSum(null);
      setRedirect(false);
    }
  };

  const handleClearSum = () => {
    setSizeSum(null);
    localStorage.removeItem('sizeSum');
  };

  return (
    <div className="table-container">
      {redirect && <TimedRedirect delay={5000} to="/towards-sam" />}
      <thead>
            <tr>
              <th></th>
              <th className='txt'>Customer Segment</th>
              <th className='txt'>Size</th>
            </tr>
          </thead>
      <div className="table-scrollable">
        <table>
          <tbody>
            {rows.map(row => (
              <tr key={row.id}>
                <td>
                  <button className='subtract' onClick={() => handleDeleteRow(row.id)}> - </button>
                </td>
                <td>
                  <CustomerSegment
                    value={row.segment}
                    onChange={(value) => handleSegmentChange(row.id, value)}
                  />
                </td>
                <td>
                  <Size
                    value={row.size}
                    onChange={(value) => handleSizeChange(row.id, value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='txt' onClick={handleAddRow}>Add Customer Segment</button>
      <button className='save-details' onClick={handleSaveDetails}>Save Details</button>
      {error && <p className='error'>{error}</p>}
      <div className='sum-container'>
        {sizeSum !== null && (
          <div className='sum-field'>
            <span className='clear-sum' onClick={handleClearSum}>✖</span>
            <input type="text" value={`Total Size: ${sizeSum}`} readOnly />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainTable;
