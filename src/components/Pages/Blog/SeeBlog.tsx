import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaBlog, FaHome } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RecepBlog } from "./HelpBlog";
import { apiBlog, uploadUrl } from "../../../helpers/Api";
import { format } from "date-fns";

const SeeBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<RecepBlog | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${apiBlog}/${id}`);
        const fetchedBlog = response.data;
        setBlog(fetchedBlog);
      } catch (error) {
        console.error("Erreur de fetching:", error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="Blog">
      <div className="Blog-content">
        {/* Navigation */}
        <div className="filter d-flex">
          <div>
            <Link to={"/"}>
              <FaHome />
              <span>Acceuil</span>
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <Link to={"/blogs"}>
              <FaBlog /> Blog
            </Link>
          </div>
          <div>
            <MdKeyboardArrowRight className="arrow" />
          </div>
          <div>
            <span className="subcategory">Voir article</span>
          </div>
        </div>
        <div className="blog-details">
          <table>
            <tr>
              <th>
                <strong>Titre (FR):</strong>
              </th>
              <td>{blog.titreFr}</td>
            </tr>
            <tr>
              <th>
                <strong>Titre (EN):</strong>
              </th>
              <td>{blog.titreEn}</td>
            </tr>
            <tr>
              <th>
                <strong>Catégorie (FR):</strong>
              </th>
              <td>{blog.categorieFr}</td>
            </tr>
            <tr>
              <th>
                <strong>Catégorie (EN):</strong>
              </th>
              <td>{blog.categorieEn}</td>
            </tr>
            <tr>
              <th>
                <strong>Contenu (FR):</strong>
              </th>
              <td>{blog.contenuFr}</td>
            </tr>
            <tr>
              <th>
                <strong>Contenu (EN):</strong>
              </th>
              <td>{blog.contenuEn}</td>
            </tr>
            <tr>
              <th>
                <strong>Date:</strong>
              </th>
              <td>{format(blog.date, "yyyy-MM-dd")}</td>
            </tr>
            <tr>
              <th>
                <strong>Image:</strong>
              </th>
              <td>
                <img
                  src={`${uploadUrl}/blog_images/${blog.image}`}
                  style={{ width: "40%", height: "auto" }}
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeeBlog;
