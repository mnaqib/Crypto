import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinData from "../components/CoinData";
import HistoryData from "../components/HistoryData";
import CoinGecko from "../apis/CoinGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log(id);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        CoinGecko.get(`/coins/${id}/market_chart`, {
          params: {
            vs_currency: "inr",
            days: "1",
          },
        }),
        CoinGecko.get(`/coins/${id}/market_chart`, {
          params: {
            vs_currency: "inr",
            days: "7",
          },
        }),
        CoinGecko.get(`/coins/${id}/market_chart`, {
          params: {
            vs_currency: "inr",
            days: "365",
          },
        }),
        CoinGecko.get("/coins/markets", {
          params: {
            vs_currency: "inr",
            ids: id,
          },
        }),
      ]);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  const renderData = () => {
    if (isLoading) {
      return <div>Loading.....</div>;
    }
    return (
      <div>
        <HistoryData data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  };
  return renderData();
};

export default CoinDetailPage;
