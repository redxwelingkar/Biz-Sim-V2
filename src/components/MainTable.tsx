import { useState } from 'react';
import CustomerSegment from './CustomerSegmentCell';
import Size from './SizeCell';
import '../css/MainTable.css'; // Ensure the path is correct

const MainTable = () => {
  const [rows, setRows] = useState([
    { segment: '', size: '' },
    { segment: '', size: '' },
    { segment: '', size: '' }
  ]);

  const handleSegmentChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].segment = value;
    setRows(newRows);
  };

  const handleSizeChange = (index: number, value: string) => {
    const newRows = [...rows];
    newRows[index].size = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { segment: '', size: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  return (
    <div className="tam-calc-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer Segment</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={{ position: 'relative' }}>
                  <button className="delete-button" onClick={() => handleDeleteRow(index)}>-</button>
                  <CustomerSegment value={row.segment} onChange={(value) => handleSegmentChange(index, value)} />
                </td>
                <td>
                  <Size value={row.size} onChange={(value) => handleSizeChange(index, value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='add-button' onClick={handleAddRow}>ADD CUSTOMER SEGMENT</button>
    </div>
  );
};

export default MainTable;
