import React, { useState, useEffect } from 'react';
import'./PriceTracker.css';

function PriceTracker() {
  const [cryptoSymbol, setCryptoSymbol] = useState('bitcoin'); // Default cryptocurrency
  const [targetPrice, setTargetPrice] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    // Function to fetch price data
    const fetchPrice = async () => {
      try {
        const response = await fetch(
         `https:api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=usd`
        );
        const data = await response.json();
        setCurrentPrice(data[cryptoSymbol].usd);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice(); // Fetch initial price

    // Set up interval to fetch price every minute (you can adjust the interval)
    const intervalId = setInterval(fetchPrice, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [cryptoSymbol]); // Fetch price whenever cryptoSymbol changes

  useEffect(() => {
    if (currentPrice && targetPrice) {
      if (currentPrice > targetPrice) {
        setAlert(`Price of ${cryptoSymbol.toUpperCase()} has exceeded ${targetPrice}`);
      } else if (currentPrice < targetPrice) {
        setAlert(`Price of ${cryptoSymbol.toUpperCase()} has fallen below ${targetPrice}`);
      } else {
        setAlert(null); // Clear alert if price is within range
      }
    }
  }, [currentPrice, targetPrice, cryptoSymbol]);

  return (
    
    <div >
      <h1 >Cryptocurrency Price Tracker</h1>
      
      <label htmlFor="cryptoSymbol">Cryptocurrency Symbol :</label>
      <input
        type="text"
        id="cryptoSymbol"
        value={cryptoSymbol}
        onChange={(e) => setCryptoSymbol(e.target.value)}
      />
       
      <label htmlFor="targetPrice">  Target Price (USD):</label>
      <input
        type="number"
        id="targetPrice"
        value={targetPrice}
        onChange={(e) => setTargetPrice(e.target.value)}
      />
      


      {currentPrice && (
        <p>Current Price: ${currentPrice.toFixed(2)}</p>
      )}

      {alert && (
        <p className="alert">{alert}</p>
      )}
    </div>
  );
}

export default PriceTracker;





