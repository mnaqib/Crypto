import React, { useContext, useEffect, useState } from "react";
import CoinGecko from "../apis/CoinGecko";
import { WatchListContext } from "../context/watchList";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const { watchList, deleteCoin } = useContext(WatchListContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await CoinGecko.get("/coins/markets", {
        params: {
          vs_currency: "inr",
          ids: watchList.join(","),
        },
      });
      setIsLoading(false);
      setCoins(response.data);
    };
    if (watchList.length > 0) {
      fetchData();
    }else {
      setCoins([])
    }
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((coin) => {
          return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin} />;
        })}
      </ul>
    );
  };
  return <div>{renderCoins()}</div>;
};

export default CoinList;
