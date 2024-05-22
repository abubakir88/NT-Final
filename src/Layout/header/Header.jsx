import React, { useState } from "react";
import "../../style/header.scss";
import { Link } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

const Header = ({ watchList, removeFromWatchList }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleRemove = (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from the watch list?"
    );
    if (confirmRemove) {
      removeFromWatchList(id);
    }
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
          <button className="close p-3" onClick={toggleSidebar}>
            <IoExitOutline />
          </button>
          <h3>Your Watch List</h3>
          <ul>
            {watchList.length > 0 ? (
              watchList.map((crypto) => (
                <li key={crypto.id}>
                  <div className="d-flex align-items-center justify-content-between">
                    <img src={crypto.image} alt={crypto.name} />
                    <span>{crypto.current_price} $</span>
                    <button onClick={() => handleRemove(crypto.id)}>
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
