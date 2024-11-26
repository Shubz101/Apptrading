'use client';

import { useState, useEffect } from 'react';

export default function HomePage() {
    const [activeTab, setActiveTab] = useState('gainers');
    const [stocks, setStocks] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`/api/stocks?type=${activeTab}`);
            const data = await res.json();
            setStocks(data);
        }
        fetchData();
    }, [activeTab]);

    const handleSearch = async () => {
        const res = await fetch(`/api/stocks?type=search&query=${search}`);
        const data = await res.json();
        setStocks(data);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Stock Tracker</h1>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('gainers')}>Top Gainers</button>
                <button onClick={() => setActiveTab('losers')}>Top Losers</button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search stocks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', borderRadius: '5px' }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {stocks.length > 0 ? (
                    stocks.map((stock, index) => (
                        <div key={index} style={{ marginBottom: '10px' }}>
                            <h3>{stock.name}</h3>
                            <p>Price: {stock.price}</p>
                            <p>Change: {stock.change}</p>
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}
