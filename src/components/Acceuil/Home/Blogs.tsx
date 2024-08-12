import React, { useEffect, useState } from "react";
import { RecepBlog, getDataBlog } from "../../Pages/Blog/HelpBlog";
import { FaBlog } from "react-icons/fa";

const Blogs: React.FC = () => {
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
    <div className="card">
      <h1>
        <FaBlog />
      </h1>
      <strong>Nombre de blogs </strong>
      <h1>
        <strong>{Blog.length}</strong>
      </h1>
    </div>
  );
};

export default Blogs;
