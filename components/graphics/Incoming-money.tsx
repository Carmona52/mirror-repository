'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import monthlyIncome from '@/lib/db/dataTest/graphics/montly-income.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function IncomeChart() {
    const labels = monthlyIncome.map(item => item.month);
    const revenueData = monthlyIncome.map(item => item.totalRevenue);

    const data = {
        labels,
        datasets: [
            {
                label: 'Ingresos totales (MXN)',
                data: revenueData,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
            },
        ],
    };

    return <Line data={data} />;
}