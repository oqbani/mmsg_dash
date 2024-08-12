import React, { useEffect, useState } from "react";
import { Bloghead, RecepBlog, getDataBlog, deleteBlog } from "./HelpBlog";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { formatDate } from "date-fns";
import { uploadUrl } from "../../../helpers/Api";

interface Props {
  searchTerm: string;
  sortOption: string;
}

const ShowBlog: React.FC<Props> = ({ searchTerm, sortOption }) => {
  const [Blog, setBlog] = useState<RecepBlog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getDataBlog();
        if (Array.isArray(response)) {
          console.log("Fetched blog data:", response); // Debug log
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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(Blog.length / itemsPerPage);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentBlog = Blog.slice(offset, offset + itemsPerPage).reverse();

  const sortedBlog = [...currentBlog].sort((a, b) => {
    const titleA = a.titreFr || "";
    const titleB = b.titreFr || "";
    if (sortOption === "az") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });

  const filteredBlog = sortedBlog.filter(
    (blog) =>
      blog.titreFr &&
      blog.titreFr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // OPEN FILE IN NEW TAB
  const openFile = (filePath: string) => {
    if (!filePath) {
      console.error("File path is undefined or empty");
      return;
    }
    window.open(filePath, "_blank");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBlog(id);
      setBlog(Blog.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Erreur de suppression:", error);
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/blogs/update-blog/${id}`);
  };

  const handleSee = (id: number) => {
    navigate(`/blogs/see-blog/${id}`);
  };

  return (
    <div className="section-blog">
      <table className="table table-striped table-hover table-bordered rounded-table">
        <thead>
          <tr>
            {Bloghead.map((header, index) => (
              <th key={index}>{header.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredBlog.length >= 0 ? (
            filteredBlog.map((blog, index) => (
              <tr key={index}>
                <td>{blog.titreFr || "N/A"}</td>
                <td>{blog.titreEn || "N/A"}</td>
                <td>{blog.categorieFr || "N/A"}</td>
                <td>{blog.categorieEn || "N/A"}</td>
                <td>
                  {blog.contenuFr ? blog.contenuFr.slice(0, 50) + "..." : "N/A"}
                </td>
                <td>
                  {blog.contenuEn ? blog.contenuEn.slice(0, 48) + "..." : "N/A"}
                </td>
                <td>
                  {blog.date ? formatDate(blog.date, "yyyy-MM-dd") : "N/A"}
                </td>
                <td
                  onClick={() =>
                    openFile(`${uploadUrl}/blog_images/${blog.image}`)
                  }
                >
                  <img
                    src={
                      blog.image
                        ? `${uploadUrl}/blog_images/${blog.image}`
                        : "default-image-url"
                    }
                    style={{ width: "100px", height: "auto" }}
                    alt={blog.titreFr || "Blog Image"}
                  />
                </td>
                <td className="d-flex justify-content-center flex-column align-items-center">
                  <div
                    style={{
                      cursor: "pointer",
                      color: "rgb(221, 66, 66)",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => handleDelete(blog.id)}
                  >
                    <BiTrash />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      color: "gray",
                      fontSize: "1.2rem",
                    }}
                    onClick={() => handleSee(blog.id)}
                  >
                    <BsEye />
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: "1rem",
                    }}
                    onClick={() => handleUpdate(blog.id)}
                  >
                    <GrUpdate />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div>Il exist aucun article!</div>
          )}
        </tbody>
      </table>

      <div>
        <ReactPaginate
          previousLabel={"< "}
          nextLabel={" >"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination-container"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active-page"}
          previousClassName={"previous-page"}
          nextClassName={"next-page"}
          previousLinkClassName={"previous-link"}
          nextLinkClassName={"next-link"}
          breakClassName={"break-item"}
          breakLinkClassName={"break-link"}
        />
        <div className="d-flex justify-content-center align-items-center" style={{fontWeight: "bolder", color: "rgb(221, 66, 66)"}}>
          {filteredBlog.length <= 0 ? <div>Il exist aucun article!</div> : ""}
        </div>
      </div>
    </div>
  );
};

export default ShowBlog;
