import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoinDetailPage from "./pages/CoinDetailPage";
import CoinSummaryPage from "./pages/CoinSummaryPage";
import "./App.css";
import { WatchListContextProvider } from "./context/watchList";

const App = () => {
  return (
    <WatchListContextProvider>
      <div className="container">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<CoinSummaryPage />} />
            <Route path="/coins/:id" element={<CoinDetailPage />} />
          </Routes>
        </Router>
      </div>
    </WatchListContextProvider>
  );
};

export default App;
