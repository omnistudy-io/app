import { Card } from "../ui/Card";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import { useState, useEffect } from 'react';
import get from "@/utils/get";
import moment from 'moment';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DailyUsage() {

    const [chartData, setChartData] = useState([0, 0, 0, 0, 0]);
    const [chartLabels, setChartLabels] = useState([]);

    useEffect(() => {
        get((data: any) => {
            var options = { weekday: "short" as const, day: "numeric" as const };
            const labels = data.map((d: any) => {
                const day = new Date(d.day);
                day.setHours(day.getHours() + 8)
                return (new Date()).getDate() == (new Date(day)).getDate() 
                    ? "Today" 
                    : moment(day).format("ddd, MMM D")
            });
            const counts = data.map((d: any) => d.count);
            setChartLabels(labels);
            setChartData(counts);
        }, "data", "/reports/chat-messages");
    }, []);

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Questions Asked',
                data: chartData,
                backgroundColor: 'rgba(0, 172, 181, 0.6)',
                borderColor: 'rgba(0, 172, 181, 1)',
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
        legend: {
            display: false,
        },
        title: {
            display: true,
            position: "bottom" as const,
            text: 'Questions',
            font: {
                size: 20,
            }
        },
        },
        scales: {
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            }
        },
        x: {
            grid: {
                display: false,
            }
        }
        },
    };

    return (
        <Card className="bg-[#f5f5f5] p-4 h-fit">
            <h3 className="text-2xl mb-2">Daily Usage</h3>
            <Bar data={data} options={options} />
        </Card>
    );
}
