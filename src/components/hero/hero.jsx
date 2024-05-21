import "../../style/hero.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";

const Hero = () => {
  const [data, setCrypto] = useState([]);
  useEffect(() => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h";
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
  }, [data]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: false,
  };
  return (
    <div className="bg-img">
      <div className="container">
        <div className="texts">
          <h1>CRYPTOFOLIO WATCH LIST</h1>
          <p>Get all the Info regarding your favorite Crypto Currency</p>
        </div>
        <div className="carousel">
          <Slider {...settings}>
            {data.map((item) => (
              <div key={item.id}>
                <img
                  src={item.image}
                  alt={item.symbol}
                  style={{ width: "100px", height: "100px" }}
                />
                <p className="legend">{item.name}</p>
                <p>{item.current_price}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
