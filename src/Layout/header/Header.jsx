// import React, { useState } from "react";
// import "../../style/header.scss";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       <header>
//         <div className="container">
//           <div className="con">
//             <nav>
//               <Link to="/" className="logo">
//                 CRYPTOFOLIO
//               </Link>
//               <div className="sort">
//                 <select name="" id="">
//                   <option value="USD">USD</option>
//                   <option value="RUB">RUB</option>
//                   <option value="UZS">UZS</option>
//                 </select>
//                 <button onClick={toggleSidebar}>WATCH LIST</button>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </header>
//       {isSidebarOpen && (
//         <div className="sidebar">
//           <button className="close" onClick={toggleSidebar}>
//             X
//           </button>
//         </div>
//       )}
//       {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import "../../style/header.scss";
import { Link } from "react-router-dom";

const Header = ({ watchList, removeFromWatchList }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav>
            <Link to="/" className="logo">
              CRYPTOFOLIO
            </Link>
            <div className="sort">
              <select name="" id="">
                <option value="USD">USD</option>
                <option value="RUB">RUB</option>
                <option value="UZS">UZS</option>
              </select>
              <button onClick={toggleSidebar}>WATCH LIST</button>
            </div>
          </nav>
        </div>
      </header>
      {isSidebarOpen && (
        <div className="sidebar">
          <button className="close" onClick={toggleSidebar}>
            X
          </button>
          <h3>Your Watch List</h3>
          <ul>
            {watchList.length > 0 ? (
              watchList.map((crypto) => (
                <li key={crypto.id}>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{crypto.name}</span>
                    <button onClick={() => removeFromWatchList(crypto.id)}>
                      Remove
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No items in the watch list.</p>
            )}
          </ul>
        </div>
      )}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Header;
