// Box.tsx
import './Box.css'; // Import CSS for styling

interface BoxProps {
  content: string; // Example prop for content in the box
}

function Box({ content }: BoxProps) {
  return (
    <div className="box">
      {content}
    </div>
  );
}

export default Box;


// Example usage in another component
// import React from 'react';
// import Box from './Box';

// function ExampleComponent() {
//   return (
//     <div>
//       <h1>Example Component</h1>
//       <div>
//         <Box content="Cell 1" />
//         <Box content="Cell 2" />
//         <Box content="Cell 3" />
//       </div>
//     </div>
//   );
// }

// export default ExampleComponent;
