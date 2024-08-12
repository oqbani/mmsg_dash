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
} from "chart.js";
import { RecepCandida } from "../../Pages/RecepCandida/HelpCandid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartCandidatureProps {
  posts: RecepCandida[];
}

const ChartCandidature: React.FC<ChartCandidatureProps> = ({ posts }) => {
  const countpostsByMonth = (posts: RecepCandida[]) => {
    const counts: { [key: string]: number } = {};

    posts.forEach((post) => {
      const month = new Date(post.createdAt).toLocaleString("default", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
      counts[month] = (counts[month] || 0) + 1;
    });

    return counts;
  };

  const postCounts = countpostsByMonth(posts);
  const labels = Object.keys(postCounts);
  const data = Object.values(postCounts);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Le nombre de candidature",
        data,
        backgroundColor: "rgba(40, 17, 122, 0.815)",
        borderColor: "rgba(40, 17, 122, 0.815)",
        borderWidth: 1,
      },
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
        Le nombre de candidature par mois
      </h6>
      <div style={{ height: "20rem", width: "30rem" }}>
        <Bar
          data={chartData}
          options={{ responsive: true }}
          style={{ height: "20rem", width: "30rem" }}
        />
      </div>
    </div>
  );
};

export default ChartCandidature;
