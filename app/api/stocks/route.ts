import { NextRequest, NextResponse } from 'next/server';

const TRADING_API_KEY = 'P1T1GUY3XTY7G1TF';
const BASE_URL = 'https://your-trading-api.com'; // Replace with the actual base URL of your trading API.

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'gainers'; // "gainers", "losers", or "search"
    const query = searchParams.get('query') || ''; // For searching specific stocks

    try {
        let endpoint = `${BASE_URL}/${type}?apikey=${TRADING_API_KEY}`;
        if (type === 'search' && query) {
            endpoint += `&query=${query}`;
        }

        const response = await fetch(endpoint);
        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}
