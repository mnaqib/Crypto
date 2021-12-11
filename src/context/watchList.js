import React, { useState, createContext, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const initialState = () => {
    const local = localStorage.getItem("watchList").split(",");
    if (local.length > 1) {
      console.log(local.length);
      return local;
    }
    return ["bitcoin", "ethereum", "ripple", "litecoin", "tron", "dogecoin"];
  };

  const [watchList, setWatchList] = useState(initialState());

  useEffect(() => {
    localStorage.setItem("watchList", watchList);
  }, [watchList]);

  const deleteCoin = (coin) => {
    setWatchList(
      watchList.filter((el) => {
        return el !== coin;
      })
    );
  };
  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
