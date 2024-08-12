import React, { useEffect, useState } from "react";
import ChartBlog from "../Charts/ChartBlog";
import { RecepBlog, getDataBlog } from "../../Pages/Blog/HelpBlog";

const AcceuilHelp:React.FC = () => {
  const [Blog, setBlog] = useState<RecepBlog[]>([]);
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getDataBlog();
        if (Array.isArray(response)) {
          setBlog(response);
        } else {
          setBlog([]);
        }
      } catch (error) {
        console.error("Erreur de fetching:", error);
        setBlog([]);
      }
    };

    fetchBlog();
  }, []);
  return (
    <div>
      <div>
        <ChartBlog posts={Blog} />
      </div>
    </div>
  );
};

export default AcceuilHelp;
