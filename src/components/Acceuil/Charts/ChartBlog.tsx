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
import { RecepBlog } from "../../Pages/Blog/HelpBlog";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartBlogProps {
  posts: RecepBlog[];
}

const ChartBlog: React.FC<ChartBlogProps> = ({ posts }) => {
  const countPostsByMonth = (posts: RecepBlog[]) => {
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

  const chartData = {
    labels,
    datasets: [
      {
        label: "Le nombre d'article",
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
        Le nombre d'article par mois
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

export default ChartBlog;
