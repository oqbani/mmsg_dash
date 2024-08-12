import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartDataset,
} from "chart.js";
import { RecepRdv } from "../../Pages/RecepRdv/HelpRdv";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartRdvProps {
  posts: RecepRdv[];
}

const ChartRdv: React.FC<ChartRdvProps> = ({ posts }) => {
  const countPostsByMonth = (posts: RecepRdv[]) => {
    const counts: { [key: string]: number } = {};

    posts.forEach((post) => {
      const month = new Date(post.date).toLocaleString("default", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
      counts[month] = (counts[month] || 0) + 1;
    });

    return counts;
  };

  const postCounts = countPostsByMonth(posts);
  const labels = Object.keys(postCounts);
  const data = Object.values(postCounts);

  const chartData: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        type: "bar", // Explicitly specifying the type
        label: "Le nombre de rendez-vous",
        data,
        backgroundColor: "rgba(40, 17, 122, 0.815)",
        borderColor: "rgba(40, 17, 122, 0.815)",
        borderWidth: 1,
      } as ChartDataset<"bar", number[]>,
    ],
  };

  return (
    <div>
      <h6
        style={{
          background: "rgb(221, 66, 66)",
          padding: ".5rem",
          borderRadius: ".4rem",
          color: "white",
          width: "18rem"
        }}
      >
        Le nombre de rendez-vous reçus
      </h6>
      <div style={{ height: "20rem", width: "30rem" }}>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ChartRdv;
