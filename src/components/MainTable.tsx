import { useState } from 'react';
import CustomerSegment from './CustomerSegmentCell'; // Make sure the path is correct
import Size from './SizeCell'; // Make sure the path is correct
import '../css/MainTable.css';
import numberToWords from 'number-to-words';

const TableComponent = () => {
  const [rows, setRows] = useState([
    { id: 1, customerSegment: '', size: '', sizeInWords: '' },
    { id: 2, customerSegment: '', size: '', sizeInWords: '' },
    { id: 3, customerSegment: '', size: '', sizeInWords: '' },
  ]);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      customerSegment: '',
      size: '',
      sizeInWords: ''
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id: number) => {
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
      const sizeInWords = value ? numberToWords.toWords(parseInt(value)) : '';
      return row.id === id ? { ...row, size: value, sizeInWords } : row;
    });
    setRows(updatedRows);
  };

  return (
    <div className="table-container">
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
              <td>
                <span>{row.sizeInWords}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Customer Segment</button>
    </div>
  );
};

export default TableComponent;
