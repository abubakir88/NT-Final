import React, { useEffect, useState } from "react";
import "../../style/marketCap.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Header from "../../Layout/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarketCap = () => {
  const notify = (message) => toast(message);

  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [search, setSearch] = useState("");
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=40&page=1&sparkline=false&price_change_percentage=24h";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const filteredCrypto = crypto.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredCrypto.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredCrypto.length / itemsPerPage);

  const addToWatchList = (crypto) => {
    if (watchList.find((item) => item.id === crypto.id)) {
      notify("This cryptocurrency is already in the watch list.");
      return;
    }
    setWatchList((prevWatchList) => [...prevWatchList, crypto]);
    notify("Added to watch list.");
  };

  const removeFromWatchList = (id) => {
    setWatchList((prevWatchList) =>
      prevWatchList.filter((crypto) => crypto.id !== id)
    );
    notify("Removed from watch list.");
  };

  return (
    <div className="info">
      <Header watchList={watchList} removeFromWatchList={removeFromWatchList} />
      <div className="container">
        <div className="search">
          <h1>Cryptocurrency Prices by Market Cap</h1>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Search For a Crypto Currency.."
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-dark text-start" scope="col">
                Coin
              </th>
              <th className="text-dark" scope="col">
                Price
              </th>
              <th className="text-dark" scope="col">
                24h Change
              </th>
              <th className="text-dark text-end" scope="col">
                Market Cap
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPageData.map((crypto) => (
              <tr key={crypto.id}>
                <td className="text-start">
                  <div className="d-flex">
                    <Link
                      className="d-flex text-white text-justify gap-2 align-items-center"
                      to={`/detail/${crypto.id}`}
                    >
                      <img src={crypto.image} alt={crypto.name} scope="row" />
                      <div className="next_to-img">
                        <p>{crypto.symbol.toUpperCase()}</p>
                        <span>{crypto.name}</span>
                      </div>
                    </Link>
                  </div>
                </td>
                <td>{crypto.current_price}</td>
                <td>
                  <p onClick={() => addToWatchList(crypto)}>
                    <IoEyeSharp
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 10,
                        color: watchList.find((item) => item.id === crypto.id)
                          ? "green"
                          : "white",
                        cursor: "pointer",
                      }}
                      alt="eyes"
                    />
                    {crypto.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </td>
                <td className="text-end">
                  <span>₹ </span>
                  {crypto.market_cap
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  <span>M</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={<span>...</span>}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
          disabledClassName={"disabled"}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default MarketCap;
