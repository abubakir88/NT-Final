import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApexChart from "../../components/chart/Apexchart";
import "../../style/detail.scss";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const api = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const res = await axios.get(api);
        const data = await response.data;
        setChartData(res.data?.prices);
        console.log(res.data);
        setCrypto(data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, [id]);

  console.log(chartData);

  return (
    <div className="main">
      <div className="coin">
        <div className="name">
          <img src={crypto?.image?.large} alt={crypto.symbol} />
          <h1>{crypto.name}</h1>
        </div>
        <p>{crypto.description?.en.slice(0, 188)}</p>
        <h5>
          <strong>Rank: </strong> <span>{crypto.market_cap_rank}</span>
        </h5>
        <h5>
          <strong> Current Price: </strong>
          <span>
            ₹
            {crypto.developer_data?.stars
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </h5>
        <h5>
          <strong>Market Cap: </strong>
          <span>
            ₹
            {crypto?.market_data?.market_cap.bmd
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
          </span>
        </h5>
      </div>
      <div className="ApexChart">
        <ApexChart dates={chartData} />
      </div>
    </div>
  );
};

export default Details;
