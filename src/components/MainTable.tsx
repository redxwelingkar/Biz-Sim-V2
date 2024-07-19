// import { useState } from 'react';
// import CustomerSegment from './CustomerSegmentCell';
// import Size from './SizeCell';
// import '../css/MainTable.css'; // Ensure the path is correct

// const MainTable = () => {
//   const [rows, setRows] = useState([
//     { segment: '', size: '' },
//     { segment: '', size: '' },
//     { segment: '', size: '' }
//   ]);
//   const [total, setTotal] = useState(0);

//   const handleSegmentChange = (index: number, value: string) => {
//     const newRows = [...rows];
//     newRows[index].segment = value;
//     setRows(newRows);
//   };

//   const handleSizeChange = (index: number, value: string) => {
//     const newRows = [...rows];
//     newRows[index].size = value;
//     setRows(newRows);
//   };

//   const handleAddRow = () => {
//     setRows([...rows, { segment: '', size: '' }]);
//   };

//   const handleDeleteRow = (index: number) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const calculateTotal = () => {
//     const totalSum = rows.reduce((acc, row) => acc + (parseFloat(row.size) || 0), 0);
//     setTotal(totalSum);
//   };

//   return (
//     <div className="tam-calc-table">
//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Customer Segment</th>
//               <th>Size</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => (
//               <tr key={index}>
//                 <td>
//                   <div className="cell-container">
//                     <button className="delete-button" onClick={() => handleDeleteRow(index)}>-</button>
//                     <CustomerSegment value={row.segment} onChange={(value) => handleSegmentChange(index, value)} />
//                   </div>
//                 </td>
//                 <td className="size-cell">
//                   <Size value={row.size} onChange={(value) => handleSizeChange(index, value)} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <button className='add-button' onClick={handleAddRow}>ADD CUSTOMER SEGMENT</button>
//       <button className='calculate-button' onClick={calculateTotal}>Calculate Total</button>
//       <div className="total-display">
//         <input type="text" value={total} readOnly />
//       </div>
//     </div>
//   );
// };

// export default MainTable;
