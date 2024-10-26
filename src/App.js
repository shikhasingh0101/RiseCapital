import React, { useEffect, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import ChatBot from './ChatBot'; // Importing the ChatBot component

function Home() {
  return (
      <section className="home-section">
          <h2>Welcome to the AI Financial Advisor App</h2>
          <p>
              Our AI Financial Advisor App is designed to help you make informed investment decisions
              by providing real-time market data, personalized recommendations, and insights into
              your financial portfolio. Here’s a quick overview of the features available:
          </p>

          <div className="home-features">
              {/* Recommendations Section */}
              <div className="feature">
                  <h3>Investment Recommendations</h3>
                  <p>
                      Get personalized investment recommendations based on current market trends,
                      expert analysis, and AI-driven insights. These suggestions are curated to
                      help you diversify your portfolio and capitalize on potential growth
                      opportunities.
                  </p>
              </div>

              {/* Market Data Section */}
              <div className="feature">
                  <h3>Real-Time Market Data</h3>
                  <p>
                      Stay updated with the latest prices and performance data of major stocks in the
                      market. Track key stocks like AAPL, MSFT, TSLA, and more to monitor trends and
                      make informed investment decisions.
                  </p>
              </div>

              {/* Portfolio Section */}
              <div className="feature">
                  <h3>Your Portfolio</h3>
                  <p>
                      Access a detailed view of your portfolio with information on stock value,
                      growth percentage, and other financial metrics. This section allows you to
                      track your investments and analyze your portfolio’s performance over time.
                  </p>
              </div>

              {/* Daily Tip Section */}
              <div className="feature">
                  <h3>Daily Financial Tip</h3>
                  <p>
                      Receive a new financial tip every day to enhance your investment strategies,
                      improve savings, and stay informed on financial best practices. These tips
                      aim to help you make smarter financial decisions and grow your wealth.
                  </p>
              </div>
          </div>
          
          <p className="closing-remark">
              Explore each section to take full advantage of the tools and insights we provide.
              Happy investing!
          </p>
      </section>
  );
}

function Recommendations({ recommendations }) {
    return (
        <section>
            <h2>Recommendations</h2>
            <ul className="recommendations-list">
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                ))}
            </ul>
        </section>
    );
}

function MarketData({ marketData }) {
    return (
        <section>
            <h2>Real-Time Market Data</h2>
            <ul className="market-data">
                {marketData.map((stock, index) => (
                    <li key={index}>{stock.name}: ${stock.price.toFixed(2)}</li>
                ))}
            </ul>
        </section>
    );
}

function Portfolio({ portfolio }) {
    return (
        <section>
            <h2>Your Portfolio</h2>
            <ul className="portfolio">
                {portfolio.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.value.toFixed(2)} - Growth: {item.growth}%
                    </li>
                ))}
            </ul>
        </section>
    );
}

function DailyTip({ dailyTip }) {
    return (
        <section>
            <h2>Daily Financial Tip</h2>
            <p>{dailyTip}</p>
        </section>
    );
}

function App() {
    const [recommendations, setRecommendations] = useState([]);
    const [marketData, setMarketData] = useState([]);
    const [portfolio, setPortfolio] = useState([]);
    const [dailyTip, setDailyTip] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // Fetch recommendations (simulated data)
            const recommendationsData = [
                "Invest in blue-chip stocks.",
                "Consider diversifying your portfolio.",
                "Watch out for market trends."
            ];
            setRecommendations(recommendationsData);

            // Mock market data (simulated data)
            const mockMarketData = [
                { name: 'MSFT', price: 300.00 },
                { name: 'AAPL', price: 150.25 },
                { name: 'GOOGL', price: 2753.23 },
                { name: 'TSLA', price: 745.85 },
                { name: 'AMZN', price: 3450.00 }
            ];
            setMarketData(mockMarketData);

            // Mock portfolio data
            const portfolioData = [
                { name: 'AAPL', value: 150.25, growth: 2.3 },
                { name: 'GOOGL', value: 2753.23, growth: 1.5 },
                { name: 'TSLA', value: 745.85, growth: 3.0 }
            ];
            setPortfolio(portfolioData);

            // Fetch a daily tip
            const tipResponse = await fetch('https://api.adviceslip.com/advice');
            if (!tipResponse.ok) throw new Error('Failed to fetch daily tip');
            const dailyTipData = await tipResponse.json();
            setDailyTip(dailyTipData.slip.advice);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div className="loading">Loading data...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <Router>
            <div className="app">
                <h1>AI Financial Advisor RiseCapital</h1>

                {/* Navigation Links */}
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/recommendations">Recommendations</Link></li>
                        <li><Link to="/marketdata">Market Data</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/dailytip">Daily Tip</Link></li>
                    </ul>
                </nav>

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/recommendations" element={<Recommendations recommendations={recommendations} />} />
                    <Route path="/marketdata" element={<MarketData marketData={marketData} />} />
                    <Route path="/portfolio" element={<Portfolio portfolio={portfolio} />} />
                    <Route path="/dailytip" element={<DailyTip dailyTip={dailyTip} />} />
                </Routes>

                {/* ChatBot Component */}
                <ChatBot />  {/* Place ChatBot at the end for easy access */}
            </div>
        </Router>
    );
}

export default App;
