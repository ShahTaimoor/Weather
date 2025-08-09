import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CryptoTracker() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 50,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(res.data);
    };
    fetchData();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        💰 Crypto Tracker
      </h1>

      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="🔍 Search for a coin..."
          className="w-full rounded-xl p-4 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {filteredCoins.map((coin) => (
          <div
            key={coin.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-5 shadow-lg hover:scale-105 transition-transform border border-white/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="text-xl font-bold">{coin.name}</h2>
                <p className="text-gray-300 text-sm">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>

            <p className="text-lg">
              💵 Price:{" "}
              <span className="font-bold text-yellow-400">
                ${coin.current_price.toLocaleString()}
              </span>
            </p>

            <p
              className={`text-lg mt-1 ${
                coin.price_change_percentage_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              📈 24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
            </p>

            <p className="text-lg mt-1">
              🏦 Market Cap:{" "}
              <span className="text-blue-400">
                ${coin.market_cap.toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
