'use client';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import topProducts from '@/lib/db/dataTest/graphics/top-products.json';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BestSellersChart() {
    const labels = topProducts.map(p => p.productName);
    const unitsData = topProducts.map(p => p.unitsSold);

    const data = {
        labels,
        datasets: [
            {
                label: 'Unidades vendidas',
                data: unitsData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
        ],
    };

    return <Bar data={data} />;
}