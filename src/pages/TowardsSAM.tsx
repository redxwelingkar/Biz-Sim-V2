// import { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
// //import './TowardsSAM.css'; // Ensure your CSS file is correctly linked

// const TowardsSAM = () => {
//     const [showText1, setShowText1] = useState(false);
//     const [showText2, setShowText2] = useState(false);
//     const [showText3, setShowText3] = useState(false);

//     useEffect(() => {
//         const timer1 = setTimeout(() => setShowText1(true), 0);
//         const timer2 = setTimeout(() => setShowText2(true), 2000);
//         const timer3 = setTimeout(() => setShowText3(true), 4000);

//         // Clean up timers on component unmount or rerender
//         return () => {
//             clearTimeout(timer1);
//             clearTimeout(timer2);
//             clearTimeout(timer3);
//         };
//     }, []);

//     return (
//         <>
//         <BackButton/>
//         <div className="fade-in-page">
//             <div className={`fade-in-container ${showText1 ? 'visible' : ''}`}>
//                 <p className="fade-in-text">Text 1</p>
//             </div>
//             <div className={`fade-in-container ${showText2 ? 'visible' : ''}`}>
//                 <p className="fade-in-text">Text 2</p>
//                 <button className="learn-more-button">Learn More</button>
//             </div>
//             <div className={`fade-in-container ${showText3 ? 'visible' : ''}`}>
//                 <p className="fade-in-text">Text 3</p>
//                 <div className="button-container">
//                     <button className="fade-in-button">Yes</button>
//                     <span className="button-description">Description for Yes</span>
//                     <button className="fade-in-button">No</button>
//                     <span className="button-description">Description for No</span>
//                 </div>
//             </div>
//         </div>
//         </>
//     );
// };

// export default TowardsSAM;
